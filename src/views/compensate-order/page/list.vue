<style scoped>
.margin-top-10 {
  margin-top: 10px;
}
.margin-bottom-10 {
  margin-bottom: 10px;
}
.padding-left-10 {
  padding-left: 10px;
}
.publish-button {
  float: right;
  margin-left: 10px;
}
.handle-btn {
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;
}
.action-p {
  /* padding-bottom: 16px;
  border-bottom: 1px solid #dddee1; */
  text-align: left;
}
.order-on {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.bgc-F0F0F0 {
  background-color: #f0f0f0;
}
</style>

<template>
    <div class="bgc-F0F0F0">
        <Row>

            <Col span="24">
            <Card>
                 <Button v-if="searchQueryParams.auditingStatusCode === '0'" class="handle-btn" type="primary" @click="addCompensationOrder">新增</Button>
                 <Button v-if="searchQueryParams.auditingStatusCode === '0'" class="handle-btn" type="primary" @click="batchAudit">批量审核</Button>
                 <Button class="handle-btn" type="primary" @click="templatePrint">打印</Button>
                 <Button class="handle-btn" type="primary" @click="exportExcel">导出</Button>
            </Card>

            <Card class="margin-top-10">
                <Tabs type="line" v-model="searchQueryParams.reviewStatusCode" @on-click="reviewStatusTabClick">
                    <TabPane name="0" label="待审核补偿单"></TabPane>
                    <TabPane name="1" label="已审核补偿单"></TabPane>
                </Tabs>
                <!--查询-->
                <div>
                  <!--查询条件-->
                  <Form :label-width="100" ref="searchQueryForm" :model="searchQueryParams" :rules="searchQueryValidate">
                    <Row :gutter="9">
						<Col span="12">
							<FormItem label="创建时间" >
							<Row>
								<Col span="11">
    								<FormItem prop="createStartDate">
    								<DatePicker v-model="searchQueryParams.createStartDate" style="width:100%;" type="date" placeholder=""></DatePicker>
    								</FormItem>  
								</Col>
								<Col span="2" style="text-align: center">-</Col>
								<Col span="11">
    								<FormItem prop="createEndDate">
    								<DatePicker v-model="searchQueryParams.createEndDate"  style="width:100%;" type="date" placeholder=""></DatePicker>  
    								</FormItem>  
								</Col>
							</Row> 
							</FormItem>  
						</Col> 
						<Col span="6">
							<FormItem label="交易门店" prop="tradeStore">
								<Select v-model="searchQueryParams.tradeStore">
									<Option v-for="(item, index) in tradeStoreList" :value="item" :key="item">{{item}}</Option>
								</Select>
							</FormItem>
						</Col>   
                    </Row> 
                    <Row  :gutter="14">
						<Col span='6'>
							<FormItem label="补偿单号" prop="compensateOrderNo">
							<Input type="text" v-model="searchQueryParams.compensateOrderNo" placeholder="" style="width: 100%;"></Input>
							</FormItem>
						</Col>
						<Col span='6'>
							<FormItem label="退货申请单号" prop="returnApplyNo" >
							<Input type="text" v-model="searchQueryParams.returnApplyNo"  placeholder="" style="width: 100%;"></Input>
							</FormItem>
						</Col>
						<Col span='6'>
							<FormItem label="会员账号" prop="memberNo" >
							<Input type="text" v-model="searchQueryParams.memberNo" placeholder="" style="width: 100%;"></Input>
							</FormItem>
						</Col>
                        <Col span="4">
                            
                            <Button type="primary" icon="search" @click="handleSearch('searchQueryForm')">查询</Button>
                            <Button type="ghost" icon="search" @click="handleReset">重置</Button>
            
                        </Col>
                    </Row> 
                    <Row>
						<Col span="16">&nbsp;
						</Col>
						
                    </Row> 
                    <p style="border-bottom: 1px solid #dddee1;" class="margin-top-10"></p>   
                  </Form>
                </div>

                <!-- 提示 -->
                <Alert class="margin-top-10" show-icon>应用总计&nbsp;
                    <span style="font-weight:600;">{{pageData.totalNum}} 条</span>
                </Alert>

                <!--查询列表-->
                <Table ref="dataTable" class="margin-top-10" highlight-row size="small"  :loading="loading" :columns="compensationColumns" :data="compensationList" @on-selection-change="tableSelectionChange"></Table>

                <!-- 分页 -->
                <div class="margin-top-10" style="overflow: hidden">
                    <div style="float: right;">
                        <Page :total="pageData.totalNum" :current="pageData.current" :page-size="pageData.pageSize" @on-change="tablePageChange"></Page>
                    </div>
                </div>

                <Switch v-model="loading"></Switch>
            </Card>

            </Col>

        </Row>

        <!--审核操作-->  
        <Modal title="审核操作" :value="orderReviewModal" @on-cancel="orderReviewModalCancel" @on-ok="orderReviewModalOk('audit')">
            <Form ref="audit" :model="orderReviewData" :rules="modalValidate" :label-width="90">
				<FormItem label="审核结果：">
					<RadioGroup v-model="orderReviewData.reviewStatusCode">
					<Radio label="1">通过</Radio>
					<Radio label="2">不通过</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem v-if="orderReviewData.reviewStatusCode == 2" label="否决原因：">
					<Input type="textarea" v-model="orderReviewData.vetoReason" placeholder=""></Input>
				</FormItem>
            </Form>
        </Modal>

    </div>
</template>

<script>
import Util from "@/libs/util";

import ListTabs from "../mixin/list-tabs";
import ListSearch from "../mixin/list-search";
import ListTable from "../mixin/list-table";
import AuditModal from '../mixin/audit-modal'

export default {
    mixins: [ListTabs, ListSearch, ListTable, AuditModal],
    data() {
        const compareTime = (rule, value, callback) => {
          //开始时间不能大于结束时间
          let startTime = new Date(this.searchQueryParams.createStartDate).getTime();
          let endTime = new Date(this.searchQueryParams.createEndDate).getTime();

          if(startTime > endTime) {
            callback(new Error('开始时间不能大于结束时间'))
          }
          callback()
        };
		return {
            loading: false,
			// 数据查询请求参数声明
			searchQueryParams: {
				auditingStatusCode: "0", // 订单审核状态
				createStartDate: "", // 订单提交开始时间
				createEndDate: "", // 订单提交开始时间
				tradeStore: "", // 交易门店
				compensateOrderNo: "", // 补偿单号
				returnApplyNo: "", // 退货申请单号
				memberNo: "" // 会员账号
			},
			// 交易门店列表
			tradeStoreList: [  
				'门店A',
				'门店B',
				'门店C'
			],
			// 查询条件验证规则
			searchQueryValidate: {
				createStartDate: [
					{required: true, type: 'date', message: '请选择提交开始时间', trigger: 'change' },
                    { validator: compareTime, trigger: 'change' }
				],
				createEndDate: [
					{required: true, type: 'date', message: '请选择提交结束时间', trigger: 'change'}
				]
			},
			// 分页数据
			pageData: {
				totalNum: 200, // 查询结果总条数
				current: 1, // 分页当前页码
				pageSize: 10 // 每页显示条数
			},
            compensationList: [],
			// 已经选中表格项数据集合
			selectedOrderList: [],  
			// current补偿单数据
			currentOrderInfo: {}, 
			// 是否显示审批操作对话框 true:显示 false:不显示 
			orderReviewModal: false,
			// 订单审核操作相关数据
			orderReviewData: {
				reviewStatusCode: "1", // 审核通过标记
				vetoReason: "" // 否决原因
			},
            // 审核弹窗验证规则
			modalValidate: { 
				reviewStatusCode: [
					{ required: true, message: '请选择审批结果', trigger: 'change' }
				],
				vetoReason: [
					{ required: true, message: 'Please enter a personal introduction', trigger: 'blur' },
					{ type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
				]
			}
		};
  	},
	created() {},
	mounted() {
		this.getOrderDataList()
	},
	computed: {
		// 数据表列处理
		compensationColumns() {
		  return this.handleTableColumns();
		},
		// 数据表内容数据获取
		// compensationList() {
		//   return this.getOrderDataList();
		// }
	},
	methods: {
    	// 新增补偿单
    	addCompensationOrder(){
    		this.$router.push({
    			name: "compensate-order-addInfo"
    		});
    	},

		// 点击批量审核先判断是否有选中的审批单，有则弹出审批操作弹框，没有则错误提示
		batchAudit() {
    		if (this.selectedOrderList.length) {
    			console.log(this.orderReviewModal)
    			this.orderReviewModal = true;
    		} else {
    			this.$Message.error({
    			    content: "请先选择要审核的订单数据后再执行此操作！"
    			});
    		}
		},

		// 打印表单
		templatePrint() {

		},

		// 导出表单
		exportExcel() {

		},

		// 跳转到补偿单详情页
		linkToDetail(params) {
			this.$router.push({
				name: "compensate-order-detail",
				query: {
				    isAudit: this.searchQueryParams.auditingStatusCode === '0'?true: false,
				    id: params.id
				}
			});
		},

		// 提交审核
		orderReviewModalOk(name) {
            let self = this;
            if (this.orderReviewData.reviewStatusCode === '') {
                this.orderReviewModal = false;
                this.$Message.error({
                    content: "请选择审核结果后再执行此操作！"
                });
                return
            } else if (this.orderReviewData.reviewStatusCode === '2' && this.orderReviewData.vetoReason === '' ) {
                this.orderReviewModal = false;
                this.$Message.error({
                    content: "请先填写否决原因后再执行此操作！"
                });
                return
            } else {
                this.orderReviewModal = false;
                let params = {
                       id: '',
                       status: Number(this.orderReviewData.reviewStatusCode),
                       audit_remark: this.orderReviewData.vetoReason
                    };
                let idArr = [];    
                this.selectedOrderList.map((order, index) => {
                    idArr.push(order.id)
                })
                params.id = idArr.join(',')

                this.submitAudit(params, 'list')  
            }
	
		},

		// 取消审核
		orderReviewModalCancel() {
			this.orderReviewData.reviewStatusCode = '1';
			this.orderReviewData.vetoReason = '';
			this.orderReviewModal = false;
		},
	},
	watch: {}
}
</script>

<style>

</style>