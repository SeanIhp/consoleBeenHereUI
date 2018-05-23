
/** 
 * 订单审核状态tabs切换
*/
export default {
    methods: {

        /*
        ** 查询类型 
        ** params 0： 待审核  1: 已审核  2: 审核未通过
        */
        reviewStatusTabClick(auditingStatus) {
            this.searchQueryParams = {
                auditingStatusCode: auditingStatus,
                createStartDate: "",
                createEndDate: "",
                tradeStore: "", 
                compensateOrderNo: "",
                returnApplyNo: "", 
                memberNo: "" 
            };
            this.pageData.current = 1;
            this.getOrderDataList()
        }

    }
};
