
/** 
 * 订单列表数据处理
*/
export default {

    data() {
        return {
            // 退货申请单列表数据 
            dataTableDataList: [],
            // 表格加载状态标记
            returnApplyOrder: false,
        };
    },

    methods: {

        /**
         * 获取订单审核列数据信息
         * 
         */
        getOrderReviewColumns() {
            let _columns = [
                {
                    value: "returnRequestNo",
                    label: "退货申请单号"
                },
                {
                    value: "createDate",
                    label: "退货申请时间"
                },
                {
                    value: "source",
                    label: "申请来源"
                },
                {
                    value: "handleStatus",
                    label: "状态"
                },
                {
                    value: "cause",
                    label: "退货原因"
                },
                {
                    value: "totalAmount",
                    label: '退货金额'
                },
                {
                    value: "memberId",
                    label: '会员账户ID'
                },
                {
                    value: "applicantName",
                    label: '申请人名称'
                },
                {
                    value: "contactWay",
                    label: "联系方式"
                }
            ];
            return _columns;
        },

        /**
         * 表格列处理
         * 
         */
        handleTableColumns() {
            // 表格特有操作列

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
                            this.linkToInfo(param.row.id);
                        }
                    }
                }, param.row.returnRequestNo);
            };

            // 条件列整理
            let tableColumns = [];
            if (this.searchQueryParams.handleStatusCode == 0) {
                tableColumns.push(_columnsSelection);
            } else if (this.searchQueryParams.handleStatusCode == 1) {
                tableColumns.push(_columnsIndex);
            }

            // 字段列处理
            let _ls = this.getOrderReviewColumns();
            _ls.map((item, index) => {
                switch (item.value) {
                    case 'returnRequestNo':
                        tableColumns.push({
                            title: item.label,
                            key: item.value,
                            align: "center",
                            render: (h, params) => {
                                return CellButton(this, h, params);
                            }
                        });
                        break;
                    default:
                        tableColumns.push({
                            title: item.label,
                            key: item.value,
                            align: "center"
                        });
                        break;
                }
            });
            return tableColumns;
        },

        /**
         * 订单数据获取查询 [带接通API]
         * 
         */
        getOrderDataList() {

            this.returnApplyOrder = true;

            // 查询条件整理
            let queryParam = {
                start_date: this.searchQueryParams.createStartDate, //退货申请提交时间-开始日期
                end_date: this.searchQueryParams.createEndDate, //退货申请提交时间-截止日期
                return_state: this.searchQueryParams.statusCode, //退货申请状态
                applysheetno: this.searchQueryParams.returnRequestNo, //退货申请单号
                return_reason: this.searchQueryParams.causeCode, //退货原因
                page_no: this.searchQueryParams.pageNo, // 页数
                page_size: this.pageSize, //每页行数
            };
            console.log("queryParam:", queryParam);

            this.$http({
                url: "https://rap-api.sjhgo.com/app/mock/data/251", //请求地址
                method: "get", //请求类型
                data: queryParam //请求参数对象
            }).then(res => {
                if (res) {
                    // 数据清洗过滤
                    let _dataList = [];
                    res.data.saleorderreturnapply.map((item, index) => {
                        item.returnRequestNo = item.applysheetno; //退货申请单号
                        item.createDate = item.apply_date; //退货申请时间
                        item.source = item.apply_source;//申请来源
                        item.handleStatus = item.return_state; //状态
                        item.cause = item.return_reason; //退货原因
                        item.totalAmount = item.return_amount; //退货金额
                        item.memberId = item.custom_account; //会员账户ID
                        item.applicantName = item.apply_man; //申请人名称
                        item.contactWay = item.mobile; //联系方式
                        _dataList.push(item);
                    });
                    this.totalNum = res.data.total_results;
                    this.dataTableDataList = _dataList;
                    this.returnApplyOrder = false;
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
            this.getOrderDataList();
        }

    },
    filters: {
        // 订单明细数据格式化过滤器
        // formatOrderItemFields: function (value) {
        //     console.log("表格字段过滤器:", value);
        //     return value;
        //     // if (!value) return ''
        //     // value = value.toString()
        //     // return value.charAt(0).toUpperCase() + value.slice(1)
        // }

    }
};
