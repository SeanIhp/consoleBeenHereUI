
/** 
 * 订单相关录入模型与操作
*/
export default {
    data() {
        return {
            // 退货申请单基础数据录入模型
            orderInfo: {
                returnOrderType: '0', //退货申请方式：0原单退货，1无单退货
                orderNo: '', // 销售订单号
                returnWay: '', // 退货方式code
                returnReason: '', // 退货原因code
                refundWay: '0', // 退款方式：0自动退款，1人工转账
                note: '', // 备注
                payeeName: '', // 收款人姓名
                accountType: '', //账户类型code
                tradingAccount: '', // 收款人账号
            },
            //退货申请单基础数据录入form验证规则
            orderFormRules: {
                orderNo: [
                    { required: true, message: '请输入订单号', trigger: 'blur' },
                    { validator: this.validateOrderNo, trigger: 'blur' }
                ],
                returnWay: [
                    { required: true, message: '请选择退货方式', trigger: 'change' }
                ],
                returnReason: [
                    { required: true, message: '请选择退货原因', trigger: 'change' }
                ],
                payeeName: [
                    { required: true, message: '请输入收款人名称', trigger: 'blur' }
                ],
                accountType: [
                    { required: true, message: '请选择账户类型', trigger: 'change' }
                ],
                tradingAccount: [
                    { required: true, message: '请输入收款人账号', trigger: 'blur' }
                ],
            },
        };
    },
    methods: {
        /**
         * 销售单号自定义验证操作
         * 
         * @param {any} rule 
         * @param {any} value 
         * @param {any} callback 
         */
        validateOrderNo(rule, value, callback) {
            // console.log("rule:", rule);
            // console.log("value:", value);
            // console.log("this.returnReasonList:", this.returnReasonList);

            // 根据输入订单号查询订单详情信息：1.验证订单合法性，2.获取订单商品明细
            // callback(new Error('订单信息不存在')); //不成功提示
            this.getOrderGoodsList(value, callback);
            callback(); //成功提示
        },

        /**
         * 前往退货申请单商品选择
         * 
         */
        toStepsSelGoods() {
            this.$refs.orderFormValidate.validate((valid) => {
                if (valid) {
                    // 前往商品录入步骤
                    this.stepsCurrent = 1;
                    // 主数据查询input获取焦点
                    this.goodsSearchInputFocus();
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },

        /**
         * 无单退货主数据商品查询input获取焦点
         * 
         */
        goodsSearchInputFocus() {
            // 延迟获取焦点
            setTimeout(() => {
                if (this.orderInfo.returnOrderType == 1) {
                    this.$refs.goodsSearchInput.focus();
                }
            }, 300);
        },

        /**
         * 退货申请方式选择事件
         * 
         * @param {any} param 选择标记的值
         */
        returnOrderTypeChange(param) {
            // 如果退货申请方式为无单退货，则清空退货申请商品列表
            if (param == 1) {
                this.returnOrderGoodsList = [];
            }
            console.log("returnOrderTypeChange:", param);
        }
    }
};
