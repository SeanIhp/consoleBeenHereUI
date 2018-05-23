
/** 
 * 审核相关模型与操作
*/
export default {
    data() {
        return {
            // 已经选中表格项数据集合
            selectTableDateList: [],
            // 订单审核modal框显示控制
            orderReviewModal: false,
            // 订单审核操作相关数据
            orderReviewData: {
                orderNoList: [], //批量审核订单编号集合
                reviewStatusCode: "1", //审核通过标记:1通过,2不通过
                info: "" //审核不通过原因
            },
        };
    },
    methods: {
        // 订单审核modal框操作
        orderReviewModalOk(pageType = "list") {

            // 退货申请单审核请求参数
            let queryParam = {
                id: [], //退货申请单ID集合
                passed: this.orderReviewData.reviewStatusCode == 1 ? "1" : "0", //审核是否通过 1：通过， 0：不通过
                audit_remark: this.orderReviewData.info //审核不通过原因
            };
            this.selectTableDateList.map((item, index) => {
                queryParam.id.push(item.oid);
            });
            console.log("queryParam:", queryParam);

            this.$http({
                url: "http://172.17.13.51:82/app/mock/data/261", //请求地址
                method: "get", //请求类型
                data: queryParam //请求参数对象
            }).then(res => {
                if (res) {
                    // 刷新当前列表
                    console.log("pageType:", pageType);
                    // 初始化
                    this.orderReviewData = {
                        orderNoList: [], //批量审核订单编号集合
                        reviewStatusCode: "1", //审核通过标记:1通过,2不通过
                        info: "" //审核不通过原因
                    };
                    this.selectTableDateList = [];

                    if (pageType == "list") {
                        this.getOrderDataList();
                    } else if (pageType == "info") {
                        this.init();
                    }

                }
            });

            this.orderReviewModal = false;

        },
        orderReviewModalCancel() {
            this.orderReviewModal = false;
        },
        // 订单审核操作
        handleOrderReview() {
            console.log("this.selectTableDateList:", this.selectTableDateList);
            // 判断是否选中数据
            if (this.selectTableDateList.length > 0) {
                this.orderReviewModal = true;
            } else {
                this.$Message.error({
                    content: "请先选择要审核的订单数据后再执行此操作！"
                });
            }
        }
    }
};
