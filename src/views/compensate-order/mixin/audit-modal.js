
/** 
 * 订单审核查询
*/
export default {
    methods: {
        /**
         * 提交审核
         * 
         */
        submitAudit(params, pageName) {
            console.log(params)
            this.loading = true;
                this.$http({
                  url: "https://rap-api.sjhgo.com/app/mock/data/194",
                  method: "get",
                  data: params
                }).then(res => {
                    this.loading = false;
                    if (res) {
                        if (res.returncode === 0) {
                            console.log(res) 
                            if (pageName === 'list') {
                                this.getOrderList()
                                this.orderReviewModalCancel()
                            } else {
                                
                            }  
                            
                        }
                    }
                })
        },
    }
};
