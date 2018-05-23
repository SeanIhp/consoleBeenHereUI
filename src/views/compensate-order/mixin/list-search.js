
/** 
 * 订单审核查询
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
         * 查询
         * 
         */
        handleSearch(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    // 初始化分页页码
                    this.pageData.current = 1;
                    console.log("搜索查询时间触发:", this.searchQueryParams);
                    this.getOrderDataList()
                }
            })
        },

        /**
         * 订单提交开始时间赋值
         * 
         */
        createStartDateChange(date) {
            console.log(date)
            this.searchQueryParams.createStartDate = date;
        },

        /**
         * 订单提交结束时间赋值
         * 
         */
        createEndDateChange(date) {
            this.searchQueryParams.createEndDate = date;
        }

    }
};
