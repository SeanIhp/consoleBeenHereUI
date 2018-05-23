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
.handle-btn {
  margin-right: 10px;
  font-weight: bold;
  font-size: 14px;
}
.handle-btn-right {
  float: right;
  color: #348eed;
  border-color: #348eed;
  font-size: 14px;
}
.handle-btn-margin {
    margin-bottom: 16px;
}
</style>
<template>
    <div class="bgc-F0F0F0">
        <Row>
            <Col span="24">
            <Card style="overflow: hidden;">
                <Button   v-if="showType === 0" class="handle-btn" type="primary" @click="saveCompensateOrder('infoFrom')">保存</Button>
                <Button  v-if="showType === 0" class="handle-btn" type="primary" @click="savelinkToListCompensateOrder('infoFrom')">保存&关闭</Button>
                <Button  v-if="showType === 0" class="handle-btn" type="primary" @click="audit('infoFrom')">审核</Button> 
                <Button class="handle-btn-right" :class="{'handle-btn-margin': !infoParams.status}" type="ghost" @click="linkToList">返回</Button>  
            </Card>

            <Card class="margin-top-10">
              <p slot="title">单据信息</p>
              <Form v-if="showType === 0" ref="infoFrom" :model="infoParams" :rules="ruleValidate" :label-width="100" > 
              <Row :gutter="10">
                <Col span="8">
                    <FormItem label="补偿单号："  prop="cid">
                        <span v-if="infoParams.cid">{{infoParams.cid}}</span>
                    </FormItem>
                </Col>
                <Col span="8">        
                    <FormItem label="单据状态："  prop="auditStatus">
                        <span v-if="infoParams.auditStatus">{{infoParams.auditStatus}}</span>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="退货申请单号"  prop="applysheetno">
                        <Input type="text" v-model.trim="infoParams.applysheetno" @input='searchApplysheetno' placeholder="" style="width: 100%;"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="订单来源渠道："  prop="channel">
                        <span v-if="infoParams.channel">{{infoParams.channel}}</span>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="交易门店："  prop="sale_market">
                        <span v-if="infoParams.sale_market">{{infoParams.sale_market}}</span>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="创建时间："  prop="create_date">
                        <span v-if="infoParams.create_date">{{infoParams.create_date}}</span>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="会员帐号："  prop="custom_count">
                        <span v-if="infoParams.custom_count">{{infoParams.custom_count}}</span>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="客户姓名："  prop="custom_name">
                        <span v-if="infoParams.custom_name">{{infoParams.custom_name}}</span>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="联系方式："  prop="contact_way">
                        <span v-if="infoParams.contact_way">{{infoParams.contact_way}}</span>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="补偿方式" prop="compensate_type">
                      <Select v-model="infoParams.compensate_type" style="width: 100%;">
                        <Option v-for="(item, index) in infoParams.compensate_typeList" :value="item" :key="index">{{item}}</Option>
                      </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="补偿子类" prop="compensate_subclass">
                      <Select v-model="infoParams.compensate_subclass" style="width: 100%;">
                        <Option v-for="(item, index) in infoParams.compensate_subclassList" :value="item" :key="index">{{item}}</Option>
                      </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="补偿金额"  prop="compensate_amount">
                      <Input type="text" v-model="infoParams.compensate_amount" placeholder="" style="width: 100%;"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="审核时间："  prop="audit_time">
                        <span v-if="infoParams.audit_time">{{infoParams.audit_time}}</span>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem label="审核人："  prop="auditor">
                        <span v-if="infoParams.auditor">{{infoParams.auditor}}</span>
                    </FormItem>
                </Col>
                <Col class="margin-bottom-10" span="24">
                    <FormItem label="审核人："  prop="remark">
                        <p v-if="infoParams.remark">{{infoParams.remark}}</p>
                    </FormItem>    
                </Col>
              </Row>
              </Form>

              <Row v-if="showType === 1">
                <Col class="margin-bottom-10" span="8">补偿单号：{{infoParams.cid}}</Col>
                <Col class="margin-bottom-10" span="8">单据状态：{{infoParams.auditStatus}}</Col>
                <Col class="margin-bottom-10" span="8">退货申请单号：{{infoParams.applysheetno}}</Col>
                <Col class="margin-bottom-10" span="8">订单来源渠道：{{infoParams.channel}}</Col>
                <Col class="margin-bottom-10" span="8">交易门店：{{infoParams.sale_market}}</Col>
                <Col class="margin-bottom-10" span="8">创建时间：{{infoParams.create_date}}</Col>
                <Col class="margin-bottom-10" span="8">会员帐号：{{infoParams.custom_count}}</Col>
                <Col class="margin-bottom-10" span="8">客户姓名：{{infoParams.custom_name}}</Col>
                <Col class="margin-bottom-10" span="8">联系方式：{{infoParams.contact_way}}</Col>
                <Col class="margin-bottom-10" span="8">补偿类型：{{infoParams.compensate_type}}</Col>
                <Col class="margin-bottom-10" span="8">补偿子类：{{infoParams.compensate_subclass}}</Col>
                <Col class="margin-bottom-10" span="8">补偿金额：{{infoParams.compensate_amount}}</Col>
                <Col class="margin-bottom-10" span="8">审核时间：{{infoParams.audit_time}}</Col>
                <Col class="margin-bottom-10" span="8">审批人：{{infoParams.auditor}}</Col>
                <Col class="margin-bottom-10" span="24">备注：{{infoParams.remark}}</Col>
              </Row>
              
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
import AuditModal from '../mixin/audit-modal';

export default {
    mixins: [AuditModal],
	data() {
        let validateApplyNo = (rule, value, callback) => {
            let uPattern = /^[a-zA-Z0-9_-]{4,16}$/;
            if (!uPattern.test(value)) {
                    callback(new Error('请输入或字母数字值'));
            } else {
                callback();
            }
        };
        let isValidateSubClass = (rule, value, callback) => {
            if ((this.infoParams.compensate_type.indexOf('券') > -1 || this.infoParams.compensate_type.indexOf('积分') > -1) && this.infoParams.compensate_subclass === '') {
                console.log(rule)
                //this.compensationSubClass[0].required = false;
                callback(new Error('请选择补偿子类'));
            }  else {
                callback()
            }
            
        };

        let validateAmount = (rule, value, callback) => {
            let mPattern = /^([1-9][\d]{0,7}|0)(\.[\d]{1,2})?$/;
            if (!mPattern.test(value)) {
                    callback(new Error('请输入正确的金额！'));
            } else {
                callback();
            }
        };
		return {
            // 展示页面类型 0: 未保存 1: 已保存
            showType: 1,
			// 单据信息
            infoParams: { 
                applysheetno: "",
                channel: "",
                sale_market: "",
                create_date: "",
                custom_count: "",
                custom_name: "",
                contact_way: "",
                compensate_type: "",
                compensate_typeList: [
                    '电子券',
                    '现金',
                ],
                compensate_subclass: "",
                compensate_subclassList: [
                    '子类一',
                    '子类二',
                ],
                compensate_amount: 10,
                remark: "",
                status: 1,
                cid: "",
                oraid: 1,
                custom_id: "",
                auditor: "",
                audit_time: "",
                creator: "",
                id: 1
            },
			// 是否显示审批操作对话框 true:显示 false:不显示 
            orderReviewModal: false,
            // 订单审核操作相关数据
            orderReviewData: {
                reviewStatusCode: "1", // 审核通过标记
                vetoReason: "" // 否决原因
            },
            // 必填信息验证规则
			ruleValidate: {
				applysheetno: [
    				{ required: true, message: '请输入退货申请单号', trigger: 'blur' },
    				{ validator: validateApplyNo, trigger: 'change' }
				],
                compensate_type: [
                    { required: true, message: '请选择补偿类型', trigger: 'change' }
                ],
                compensate_subclass: [
                    { validator: isValidateSubClass, trigger: 'change' }
                    //{ required: true, message: '请选择补偿子类', trigger: 'change' }
                ],
                compensate_amount: [
                    { required: true, message: '请填写补偿金额', trigger: 'blur' },
                    { validator: validateAmount, trigger: 'change' }
                ]
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
        this.showType = 0
    },
    activated(){
        this.showType = 0;
    },
    deactivated(){
        this.$destroy(true);
    },
	computed: {

    },
	methods: {
        // 输入的退货申请单号查找退货申请单信息
        searchApplysheetno() {
            let params = {
                applysheetno: this.infoParams.applysheetno
            }
            console.log(params)

            let searchRequest

            if (searchRequest) {
                searchRequest.abort();
            }

            this.Loading = true;
            searchRequest = this.$http({
                url: 'https://rap-api.sjhgo.com/app/mock/data/193',
                method: "get",
                data: {id: 1}
            }).then(res => {
                this.Loading = false;
                if (res) {
                    if (res.returncode === 0) {
                        //console.log()
                        this.infoParams = res.data.saleordercompensation[0];
                        console.log(this.infoParams)
                    }    
                } 
            });
        },

        // 保存补偿单
        saveCompensateOrder() {
            this.submitInfoRefresh("https://rap-api.sjhgo.com/app/mock/data/191", 2)
        },

        // 保存补偿单&关闭
        saveCompensateOrderlinkToList() {
            this.submitInfoRefresh("https://rap-api.sjhgo.com/app/mock/data/191", 3)
        },

        /*
        ** 调用接口并刷新或调转页面
        ** @param url: 接口请求的url
        ** @param type: 接口请求的方式
        ** @param action: 当前的事件 1: 修改  2: 保存  3: 保存并关闭  
        */
        submitInfoRefresh(url, action) {
            this.$refs.infoFrom.validate((valid) => {
                if (valid) {
                    if (this.infoParams.custom_count === '') {
                        this.$Message.error({
                            content: "无会员帐号不允许补偿费用！"
                        });
                        return
                    } else {
                        let params = {
                                applysheetno: this.infoParams.applysheetno,
                                channel: this.infoParams.channel,
                                sale_market: this.infoParams.sale_market,
                                create_date: this.infoParams.create_date,
                                custom_count: this.infoParams.custom_count,
                                custom_name: this.infoParams.custom_name,
                                contact_way: this.infoParams.contact_way,
                                compensate_type: this.infoParams.compensate_type,
                                compensate_subclass: this.infoParams.compensate_subclass,
                                compensate_amount: this.infoParams.compensate_amount,
                                remark: this.infoParams.remark,
                                status: this.infoParams.status,
                                cid: this.infoParams.cid,
                                oraid: this.infoParams.oraid,
                                custom_id: this.infoParams.custom_id,
                                id: this.infoParams.id
                            };

                        this.Loading = true;
                        this.$http({
                            url: url,
                            method: "get",
                            data: params
                        }).then(res => {
                            this.Loading = false;
                            if (res) {
                                console.log(88888)
                                if (res.returncode === 0) {
                                    this.infoParams.id = res.data.id;
                                    this.infoParams.create_date = res.data.datacreate_date

                                    if (action === '3' ) {
                                        this.linkToList()
                                    } else {
                                        this.status = '1'
                                    }
                                }    
                            } 
                        });
                    }
                }
            })
        },

		// 保存补偿单&关闭
		savelinkToList() {
			this.$router.push({
				name: "compensate-order-list",
				params: {}
			});

		},

		// 关闭
		linkToList() {
            this.infoParams.auditStatusCode = '0'
			this.$router.push({
				name: "compensate-order-list",
				params: {}
			});
		},


		// 验证必填项OK后显示审核操作弹窗
		audit(name) {
			this.$refs[name].validate((valid) => {
                if (valid) {
                    this.orderReviewModal = true;
                }  
            }) 
	
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
                       id: this.infoParams.id,
                       status: Number(this.orderReviewData.reviewStatusCode),
                       audit_remark: this.orderReviewData.vetoReason
                    };

                this.submitAudit(params, 'detail')  
            } 
        },

        // 取消审核
        orderReviewModalCancel() {
            this.orderReviewData.reviewStatusCode = '';
            this.orderReviewData.vetoReason = '';
            this.orderReviewModal = false;
        },

	}
};
</script>
