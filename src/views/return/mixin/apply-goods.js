
/** 
 * 退货申请单商品相关模型事件
*/
import Util from "@/libs/util";
export default {
    data() {
        return {
            // 退货申请商品列表
            returnOrderGoodsList: [],
            // 已经选择商品数量
            totalSelGoodsNum: 0,
            // 总退款金额
            totalSelReturnAmount: 0,
            // 主数据商品搜索输入模型
            goodsSearchInputValue: '',
        };
    },
    methods: {

        /**
         * 获取订单审核列数据信息
         * 
         */
        getReturnOrderGoodsTableColumns() {
            let _columns = [
                {
                    value: "goodsNo",
                    label: "商品编码"
                },
                {
                    value: "barcode",
                    label: "商品条码"
                },
                {
                    value: "goodsName",
                    label: "商品名称"
                },
                {
                    value: "brand",
                    label: "商品品牌"
                },
                {
                    value: "num",
                    label: "可退数量"
                },
                {
                    value: "price",
                    label: "售价"
                },
                {
                    value: "memberDiscount",
                    label: '会员折扣'
                },
                {
                    value: "promotionalDiscounts",
                    label: '促销折扣'
                },
                {
                    value: "temporaryDiscount",
                    label: "临时折扣"
                },
                {
                    value: "totalAmount",
                    label: "交易金额"
                },
                {
                    value: "returnTotalAmount",
                    label: "退货金额"
                },
                {
                    value: "giftType",
                    label: "是否赠品"
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
            let tableColumns = [];

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

            tableColumns.push(_columnsSelection);
            tableColumns.push(_columnsIndex);

            // 可编辑输入框
            const CellInput = (vm, h, param) => {
                return h("Input", {
                    props: {
                        type: "text",
                        value: vm.returnOrderGoodsList[param.index][param.column.key]
                    },
                    on: {
                        "on-blur"(event) {
                            vm.$set(
                                vm.returnOrderGoodsList[param.index],
                                param.column.key,
                                event.target.value
                            );
                            console.log("vm.returnOrderGoodsList:", vm.returnOrderGoodsList);
                            vm.handleSelGoodsCount();
                        }
                    }
                });
            };

            // 字段列处理
            let _ls = this.getReturnOrderGoodsTableColumns();
            _ls.map((item, index) => {
                switch (item.value) {
                    case 'num':
                        tableColumns.push({
                            title: item.label,
                            key: item.value,
                            align: "center",
                            render: (h, params) => {
                                return CellInput(this, h, params);
                            }
                        });
                        break;
                    case 'price':
                        if (this.orderInfo.returnOrderType == 1) {
                            tableColumns.push({
                                title: item.label,
                                key: item.value,
                                align: "center",
                                render: (h, params) => {
                                    return CellInput(this, h, params);
                                }
                            });
                        } else {
                            tableColumns.push({
                                title: item.label,
                                key: item.value,
                                align: "center"
                            });
                        }
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
         * 获取原单商品列表 [带接通API]
         * 
         */
        getOrderGoodsList(orderNo, callback) {
            console.log("订单号：", orderNo);
            let _dataList = [
                {
                    _checked: false,
                    goodsNo: "T201803120000001",
                    barcode: "6666666666666",
                    goodsName: "商品名称商品名称",
                    brand: "品牌名称",
                    num: "13",
                    price: "100.00",
                    memberDiscount: "1200.00",
                    promotionalDiscounts: "1300.00",
                    temporaryDiscount: "1400.00",
                    totalAmount: "1500.00",
                    returnTotalAmount: "1600.00",
                    giftType: "否",
                },
                {
                    _checked: false,
                    goodsNo: "T2018031200000012",
                    barcode: "6666666666666",
                    goodsName: "商品名称商品名称",
                    brand: "品牌名称",
                    num: "13",
                    price: "100.00",
                    memberDiscount: "1200.00",
                    promotionalDiscounts: "1300.00",
                    temporaryDiscount: "1400.00",
                    totalAmount: "1500.00",
                    returnTotalAmount: "1600.00",
                    giftType: "否",
                }
            ];

            // callback(new Error('订单信息不存在')); //不成功提示,如果查询订单无结果，则提示错误
            this.returnOrderGoodsList = _dataList;
        },

        /**
         * 表格选择状态改变事件
         * 
         * @param {any} selection 已选项数据
         */
        returnOrderGoodstableSelectionChange(selection) {
            // this.selectTableDateList = selection;

            console.log("表格改变了选择内容：", selection);
            this.returnOrderGoodsList.map((item, index) => {
                this.returnOrderGoodsList[index]._checked = false;
                selection.map((titem, tindex) => {
                    if (item.goodsNo == titem.goodsNo) {
                        this.returnOrderGoodsList[index]._checked = true;
                    }
                });
            });
            this.handleSelGoodsCount();
        },

        /**
         * 主数据商品搜索框回车事件
         * 
         * @param {any} event 
         */
        goodsSearchInputChange(event) {
            console.log("event", this.goodsSearchInputValue);
            // 临时
            let _dataList = [
                {
                    _checked: false,
                    goodsNo: "T201803120000001",
                    barcode: "6666666666666",
                    goodsName: "商品名称商品名称",
                    brand: "品牌名称",
                    num: "13",
                    price: "100.00",
                    memberDiscount: "1200.00",
                    promotionalDiscounts: "1300.00",
                    temporaryDiscount: "1400.00",
                    totalAmount: "1500.00",
                    returnTotalAmount: "1600.00",
                    giftType: "否",
                }
            ];
            // callback(new Error('订单信息不存在')); //不成功提示,如果查询订单无结果，则提示错误
            this.returnOrderGoodsList = _dataList;
        },

        /**
         * 已勾选退款商品数量，金额计算
         * 
         */
        handleSelGoodsCount() {
            this.totalSelGoodsNum = 0;
            this.totalSelReturnAmount = 0;
            this.returnOrderGoodsList.map((item, index) => {
                if (item._checked) {
                    this.totalSelGoodsNum = this.totalSelGoodsNum + parseInt(item.num);
                    this.totalSelReturnAmount = this.totalSelReturnAmount + item.num * item.price;
                }
            });
        },

        /**
         * 前往扣回优惠项目步骤
         * 
         */
        toStepsCostDeductions() {
            if (this.totalSelGoodsNum == 0) {
                this.$Message.error('请选择要退货的商品');  
            } else {
                this.stepsCurrent = 2;
                // 【待完善】查询原单可扣回信息
                this.getCostDeductionsList();
            }
        },

        /**
         * 无单创建退货申请单提交
         * 
         */
        stepsSelGoodsCreateReturnOrder() {
            // 商品信息步骤内提交退货申请单逻辑

            if (this.totalSelGoodsNum == 0) {
                this.$Message.error('请选择要退货的商品');
            } else {
                this.stepsCurrent = 3;
                // 【待完善】创建退货申请单
            }

        }

    },
    filters: {

        // 订单明细数据格式化过滤器
        formatReturnOrderGoodsItemFields: function (value) {

            // 等待接入API后考虑是否使用【待定】

            console.log("表格字段过滤器:", value);
            value.map((item, index) => {
                value[index].returnTotalAmount = Util.toDecimal2(item.num * item.price);
                value[index].totalAmount = value[index].returnTotalAmount;
            });
            return value;
        },

        // 格式化选中商品退货总金额
        formatTotalReturnAmount: function (value) {
            let _ls = Util.toDecimal2(value);
            return _ls;
        }

    }
};
