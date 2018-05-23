
/** 
 * 订单列表数据处理
*/
export default {
    methods: {

        /**
         * 获取订单审核列数据信息
         * 
         */
        getOrderAuditColumns() {
            let _columns = [
                {
                  title: "补偿单号",
                  key: "cid",
                  align: "center"
                },
                {
                  title: "退货申请单号",
                  key: "applysheetno",
                  align: "center"
                },
                {
                  title: "创建时间",
                  key: "create_date",
                  align: "center"
                },
                {
                  title: "交易渠道",
                  key: "channel",
                  align: "center"
                },
                {
                  title: "交易门店",
                  key: "sale_market",
                  align: "center"
                },
                {
                  title: "补偿类型",
                  key: "compensate_type",
                  align: "center"
                },
                {
                  title: "补偿金额",
                  key: "compensate_amount",
                  align: "center"
                },
                {
                  title: "会员帐号",
                  key: "custom_count",
                  align: "center"
                },
                {
                  title: "联系方式",
                  key: "contact_way",
                  align: "center"
                },
                {
                  title: "备注",
                  key: "remark",
                  width: 60,
                  ellipsis: true,
                  align: "center"
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
            let _columns = [];
            let _columnsAction = {
                    title: "操作",
                    key: "action",
                    align: "center",
                    width: 80,
                    render: (h, params) => {
                                // 详情
                                let infoAction = h(
                                    "Button",
                                    {
                                        props: { type: "text", size: "small" },
                                        style: { marginRight: "5px", color: "#359AFC" },
                                        on: {
                                            click: () => {
                                                this.linkToDetail(params.row);
                                            }
                                        }
                                    },
                                    "详情"
                                );
                                
                                let actionArr = [infoAction];
                                // 包裹容器
                                let content = h("div", actionArr);
                                return content;
                            }
                };
            if (this.searchQueryParams.auditingStatusCode === '1') {
                _columns.push({
                        title: "行号",
                        key: "id",
                        width: 60,
                        align: 'center'
                    })
       
            } else {
                _columns.push({
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    })
            }
            _columns.push(_columnsAction)

            let _ls = this.getOrderAuditColumns();
            _ls.map((item, index) => {
                if (item.title != '') {
                    _columns.push({
                        title: item.title,
                        key: item.key,
                        align: "center"
                    });
                }
            });
            return _columns;
        },

        /**
         * 订单数据获取查询 [带接通API]
         * 
         */
        getOrderDataList() {
            let _dataList = [];
            let params = {
                create_date: '',
                sale_market: [],
                //fields: '',
                cid: this.searchQueryParams.compensateOrderNo,
                applysheetno: this.searchQueryParams.returnApplyNo,
                custom_id: this.searchQueryParams.memberNo,
                status: this.searchQueryParams.auditingStatusCode,
                page_no: this.pageData.current,
                page_size: this.pageData.pageSize,
                order_field: "create_date",
                order_direction: "desc"
            };
      
            params.sale_market.push(this.searchQueryParams.tradeStore)
            if (this.searchQueryParams.createStartDate && this.searchQueryParams.createEndDate) {
              console.log(this.searchQueryParams.createStartDate)
                params.create_date = {
                    ">=": this.formatDate(this.searchQueryParams.createStartDate),
                    "<=": this.formatDate(this.searchQueryParams.createEndDate)
                };

            }

            this.Loading = true;
            this.$http({
                url: "https://rap-api.sjhgo.com/app/mock/data/192",
                method: "get",
                data: params
            }).then(res => {
                this.Loading = false;
                if (res) {
                  if (res.returncode === 0) {
                    let data = res.data.saleordercompensation;
                    data.map((item, index) => {
                        if (item.remark.length > 8) {
                            item.remark = item.remark.substring(0, 5) + '...'
                        }
                    })
                    _dataList = data;
                    this.compensationList = data
                    this.pageData.totalNum = res.data.total_results
                  }  
                } 
            });
            
            //return _dataList; 
        },

        //时间由标准时间转换为yyyy-MM-dd hh:mm:ss  
        formatDate: function(date){
            var y = new Date(date).getFullYear();
            var m = new Date(date).getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = new Date(date).getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = new Date(date).getHours();
            h = h < 10 ? ('0'+h) : h ;
            var minute = new Date(date).getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            var secend = new Date(date).getSeconds();
            secend = secend < 10 ? ('0' + secend) : secend;

            return y + '-' + m + '-' + d+' '+h+':'+minute+ ':'+secend;
        },

        /**
         * 表格选择状态改变事件
         * 
         * @param {any} selection 已选项数据
         */
        tableSelectionChange(selection) {
            console.log("表格改变了选择内容：", selection);
            this.selectedOrderList = selection;
        },

        /**
         * 订单数据分页查询
         * 
         * @param {any} page 切换目标页码
         */
        tablePageChange(page) {
            console.log("切换页码：", page);
            this.pageData.current = page;
            this.this.getOrderDataList()            
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
