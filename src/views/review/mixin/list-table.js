
/** 
 * 订单列表数据处理
*/
export default {
    data() {
        return {
            // 订单审核列表数据
            orderReviewDataList: [],
            // 查询结果总条数
            totalNum: 0,
            // 分页当前页码
            current: 1,
            // 每页显示条数
            pageSize: 100,
            // 已经选中表格项数据集合
            selectTableDateList: [],
            // 表格加载状态标记
            reviewOrderLoading: false,
        }
    },
    methods: {

        /**
         * 获取订单审核列数据信息
         * 
         */
        getOrderReviewColumns() {
            let _columns = [
                {
                    value: "orderNo",
                    label: "订单号"
                },
                {
                    value: "createDate",
                    label: "订单创建时间"
                },
                {
                    value: "channel",
                    label: "订单来源渠道"
                },
                {
                    value: "totalAmount",
                    label: "订单总金额"
                },
                {
                    value: "customer",
                    label: "客户帐号"
                },
                {
                    value: "tel",
                    label: "联系方式"
                },
                {
                    value: "customerRemarks",
                    label: this.searchQueryParams.reviewStatusCode == 1 ? "客户备注" : ''
                },
                {
                    value: "contact",
                    label: this.searchQueryParams.reviewStatusCode == 0 ? "自动审核不通过原因" : this.searchQueryParams.reviewStatusCode == 2 ? "审核不通过原因" : ''
                }
            ];
            return _columns;
        },

        /**
         * 表格列处理
         * 
         */
        handleTableColumns() {

            // 多选列
            let _columnsSelection = {
                type: "selection",
                width: 60,
                align: "center",
            };

            // 序号列
            let _columnsIndex = {
                type: "index",
                width: 60,
                align: "center",
                title: "序号"
            };

            // 可编辑输入框
            const CellButton = (vm, h, param) => {
                return h("Button", {
                    props: { type: "text", size: "small" },
                    style: { marginRight: "5px", color: "#359AFC" },
                    on: {
                        click: () => {
                            this.linkToInfo(param.row.oid);
                        }
                    }
                }, param.row.orderNo);
            };

            // 条件列整理
            let tableColumns = [];
            switch (this.searchQueryParams.reviewStatusCode) {
                case "0":
                    // 待审核订单 
                    tableColumns.push(_columnsSelection);
                    break;

                case "1":
                case "2":
                    // 已审核订单
                    // 审核不通过订单
                    tableColumns.push(_columnsIndex);
                    break;
            }

            let _ls = this.getOrderReviewColumns();
            _ls.map((item, index) => {
                if (item.label != '') {
                    if (item.value == 'orderNo') {
                        tableColumns.push({
                            title: item.label,
                            key: item.value,
                            align: "center",
                            render: (h, params) => {
                                return CellButton(this, h, params);
                            }
                        });
                    } else {
                        tableColumns.push({
                            title: item.label,
                            key: item.value,
                            align: "center"
                        });
                    }
                }
            });

            return tableColumns;
        },

        /**
         * 订单数据获取查询 [带接通API]
         * 
         */
        getOrderDataList() {
            this.reviewOrderLoading = true;

            // 订单状态数据整理
            let _order_state = "";
            switch (this.searchQueryParams.reviewStatusCode) {
                case "0":
                    // 待审核订单 
                    _order_state = 1;
                    break;

                case "1":
                    // 已审核订单
                    _order_state = 2;
                    break;

                case "2":
                    // 审核不通过订单
                    _order_state = { "in": "3,4" };
                    break;
            }

            // 查询条件整理
            let queryParam = {
                create_date: {
                    ">=": this.searchQueryParams.createStartDate,
                    "<=": this.searchQueryParams.createEndDate,
                },// 订单提交时间
                order_state: _order_state, // 订单状态
                channel: this.searchQueryParams.channelCode, // 订单渠道
                idsheetno: this.searchQueryParams.motherOrderNo, // 母订单编号
                auto_audit_deny_id: this.searchQueryParams.automaticReviewNotThroughCode, // 自动审核不通过原因ID
                page_no: this.searchQueryParams.pageNo, // 分页参数
                page_size: this.pageSize, // 每页显示多少条记录
                order_field: "create_date", // 排序字段
                order_direction: "desc", // 升序还是降序 （降序：desc；升序：asc）
            };
            console.log("queryParam:", queryParam);

            this.$http({
                url: "https://rap-api.sjhgo.com/app/mock/data/170", //请求地址
                method: "get", //请求类型
                data: queryParam //请求参数对象
            }).then(res => {
                if (res) {
                    // 数据清洗过滤
                    let _dataList = [];
                    res.data.saleorders.map((item, index) => {
                        item.orderNo = item.subsheetno; // 订单号
                        item.createDate = item.create_date; // 订单创建时间
                        item.channel = item.channel; // 订单来源渠道
                        item.totalAmount = item.ought_pay; // 订单总金额
                        item.customer = item.user_id; // 客户帐号
                        item.tel = item.customer_mobile; // 联系方式
                        item.customerRemarks = item.auto_audit_deny_reason; // 客户备注
                        item.contact = item.auto_audit_deny_reason; // 自动审核不通过原因,审核不通过原因
                        _dataList.push(item);
                        this.reviewOrderLoading = false;
                    });
                    this.totalNum = res.data.total_results;
                    this.orderReviewDataList = _dataList;
                }
            });

        },

        /**
         * 表格选择状态改变事件
         * 
         * @param {any} selection 已选项数据
         */
        tableSelectionChange(selection) {
            this.selectTableDateList = selection;
            console.log("表格改变了选择内容：", selection);
        },

        /**
         * 订单数据分页查询
         * 
         * @param {any} page 切换目标页码
         */
        tablePageChange(page) {
            this.searchQueryParams.pageNo = page;
            console.log("切换页码：", page);
        }

    },
    filters: {

        // 订单明细数据格式化过滤器
        formatOrderItemFields: function (value) {
            console.log("表格字段过滤器:", value);
            return value;
            // if (!value) return ''
            // value = value.toString()
            // return value.charAt(0).toUpperCase() + value.slice(1)
        }

    }
};
