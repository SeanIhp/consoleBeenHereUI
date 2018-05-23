
/** 
 * 订单审核状态tabs切换
*/
export default {
    methods: {

        /**
         * 点击事件
         * 
         */
        reviewStatusTabClick(reviewStatus) {
            console.log("订单审核状态tabs点击事件触发：", reviewStatus);
            // 初始化分页页码
            this.searchQueryParams.pageNo = 1;
            this.handleReset();
            this.orderReviewDataList = [];
        }

    }
};
