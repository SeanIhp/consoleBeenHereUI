
/** 
 * 退货申请单查询
*/
export default {
    methods: {

        /**
         * 重置
         * 
         */
        handleReset() {
            this.$refs.searchQueryForm.resetFields();
        },

        /**
         * 基础查询
         * 
         */
        basicsSearch() {
            this.searchType = 0;
        },

        /**
        * 高级查询切换
        * 
        */
        highSearch() {
            this.searchType = 1;
        },

        /**
        * 高级查询重置
        * 
        */
        onHighSearchReset() {
            console.log("高级搜索重置");
        },

        /**
        * 高级查询事件
        * 
        */
        onHighSearchSubmit(params) {
            console.log("高级搜索查询事件：", params);
        },

        /**
         * 查询
         * 
         */
        handleSubmit() {
            // 初始化分页页码
            this.searchQueryParams.pageNo = 1;
            this.getOrderDataList();
            console.log("搜索查询时间触发:", this.searchQueryParams);
        },

        /**
         * 退货申请单提交开始时间赋值
         * 
         */
        createStartDateChange(date) {
            this.searchQueryParams.createStartDate = date;
        },

        /**
         * 退货申请单提交结束时间赋值
         * 
         */
        createEndDateChange(date) {
            this.searchQueryParams.createEndDate = date;
        }

    }
};
