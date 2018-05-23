
/** 
 * 扣回项目相关模型事件
*/
import Util from "@/libs/util";
export default {
    data() {
        return {
            // 扣回项数据列表
            costDeductionsList: [],
            // 扣回项总数量
            totalCostDeductionsNum: 0,
        };
    },
    methods: {

        /**
         * 获取扣回项目列数据信息
         * 
         */
        getCostDeductionsTableColumns() {
            let _columns = [
                {
                    value: "costDeductionsTitle",
                    label: "扣回项目"
                },
                {
                    value: "amount",
                    label: "应扣回金额"
                },
                {
                    value: "practicalAmount",
                    label: "实际扣回金额"
                },
                {
                    value: "info",
                    label: "活动说明"
                }
            ];
            return _columns;
        },

        /**
         * 表格列处理
         * 
         */
        handleCostDeductionsTableColumns() {
            // 表格特有操作列
            let tableColumns = [];

            // 序号列
            let _columnsIndex = {
                type: "index",
                width: 60,
                align: "center",
                title: "序号"
            };

            tableColumns.push(_columnsIndex);

            // 可编辑输入框
            const CellInput = (vm, h, param) => {
                return h("Input", {
                    props: {
                        type: "text",
                        value: vm.costDeductionsList[param.index][param.column.key]
                    },
                    on: {
                        "on-blur"(event) {
                            vm.$set(
                                vm.costDeductionsList[param.index],
                                param.column.key,
                                event.target.value
                            );
                            console.log("vm.costDeductionsList:", vm.costDeductionsList);
                            // vm.handleCount();
                        }
                    }
                });
            };

            // 字段列处理
            let _ls = this.getCostDeductionsTableColumns();
            _ls.map((item, index) => {
                switch (item.value) {
                    case 'practicalAmount':
                        tableColumns.push({
                            title: item.label,
                            key: item.value,
                            align: "center",
                            render: (h, params) => {
                                return CellInput(this, h, params);
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
        getCostDeductionsList() {
            let _dataList = [
                {
                    costDeductionsTitle: "YFKH 运费扣回",
                    amount: "33.33",
                    practicalAmount: "0.00",
                    info: "参加500抵100活动，单号20180000111。",
                }
            ];

            this.costDeductionsList = _dataList;
        },

        /**
         * 前往扣回优惠项目步骤
         * 
         */
        CostStepsCreateReturnOrder() {
            // 缺少验证【待完善】
            this.stepsCurrent = 3;
        }

    },
    filters: {

        // 订单明细数据格式化过滤器
        formatcostDeductionsItemFields: function (value) {
            console.log("表格字段过滤器:", value);
            // value.map((item, index) => {
            //     value[index].returnTotalAmount = Util.toDecimal2(item.num * item.price);
            //     value[index].totalAmount = value[index].returnTotalAmount;
            // });
            return value;
        },

    }
};
