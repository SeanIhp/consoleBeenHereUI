<style scoped>
.margin-top-10 {
  margin-top: 10px;
}
.margin-bottom-10 {
  margin-bottom: 10px;
}
.margin-right-10 {
  margin-right: 10px;
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

/* .form-p p {
  font-size: 14px;
  color: red;
} */

/* form表单中label字体 */
/* .form-p .ivu-form .ivu-form-item-label {
  font-size: 14px !important;
  color: red !important;
} */
</style>

<template>
  <div class="bgc-F0F0F0">
    <Row>
      <Col span="24">
      <!-- 操作 -->
      <Card>
        <Button class="handle-btn" type="ghost" @click="editReturnMonenyOrder">修改</Button>
        <Button class="handle-btn" type="ghost" @click="saveReturnMonenyOrder" v-if="isSaveBtnShow">保存</Button>
        <Button class="handle-btn" type="ghost" @click="returnMoneny" v-if="!isSaveBtnShow">退款</Button>
        <Button class="handle-btn-right" type="ghost" @click="linkToList" v-if="!isEditTypeShow">返回</Button>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">基本信息</p>
        <Form :label-width="100" ref="editForm" :rules="ruleValidate" :model="returnMoneyInfo" class="form-p">

          <Row :gutter="10">
            <Col span="8">
            <FormItem label="退款申请单单号：" prop="applysheetno">
              <p>{{returnMoneyInfo.applysheetno}}</p>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="退款单单号：" prop="sheetno">
              <p>{{returnMoneyInfo.sheetno}}</p>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="单据状态：" prop="refund_state">
              <p>{{returnMoneyInfo.refund_state}}</p>
            </FormItem>
            </Col>
          </Row>

          <Row :gutter="10">
            <Col span="8">
            <FormItem label="退款金额：" prop="refund_value">
              <p>{{returnMoneyInfo.refund_value}}</p>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="退款账户：" prop="refund_account">
              <p v-if="!isEditTypeShow">{{returnMoneyInfo.refund_account}}</p>
              <Input v-if="isEditTypeShow" type="text" placeholder="" v-model="returnMoneyInfo.refund_account"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="账户类型：" prop="account_type">
              <p v-if="!isEditTypeShow">{{returnMoneyInfo.account_type}}</p>
              <Select v-if="isEditTypeShow" v-model="returnMoneyInfo.account_type">
                <Option value="0">支付宝</Option>
                <Option value="1">借记卡</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>

          <Row :gutter="10">
            <Col span="8">
            <FormItem label="录入人员：" prop="creator">
              <p>{{returnMoneyInfo.creator}}</p>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="审核人员：" prop="audit_man">
              <p>{{returnMoneyInfo.audit_man}}</p>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="付款人员：" prop="payment_man">
              <p>{{returnMoneyInfo.payment_man}}</p>
            </FormItem>
            </Col>
          </Row>

          <Row :gutter="10">
            <Col span="8">
            <FormItem label="录入时间：" prop="create_date">
              <p>{{returnMoneyInfo.create_date}}</p>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="审核时间：" prop="audit_date">
              <p>{{returnMoneyInfo.audit_date}}</p>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="付款时间：" prop="payment_time">
              <p>{{returnMoneyInfo.payment_time}}</p>
            </FormItem>
            </Col>
          </Row>
        </Form>

      </Card>
      </Col>
    </Row>

    <Modal title="退款操作" :value="returnMoneyModal" @on-cancel="returnMoneyModalCancel" @on-ok="returnMoneyModalOk">
      <Form :label-width="80">
        <FormItem label="操作选项：">
          <RadioGroup>
            <Radio label="male">通过</Radio>
            <Radio label="female">不通过</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="否决原因：">
          <Input type="textarea" placeholder=""></Input>
        </FormItem>
      </Form>
    </Modal>

    <!-- 留作保存及关闭等提示框样例 -->
    <!-- <Modal title="审核操作" :value="returnMoneyModal" @on-cancel="cancel" @on-ok="ok">
            <Form :label-width="80">
                <FormItem label="审核结果：">
                    <RadioGroup>
                        <Radio label="male">通过</Radio>
                        <Radio label="female">不通过</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="否决原因：">
                    <Input type="textarea" placeholder=""></Input>
                </FormItem>
            </Form>
        </Modal> -->

  </div>
</template>

<script>
export default {
  data() {
    return {
      returnMoneyModal: false,
      isSaveBtnShow: false, //是否显示保存按钮
      isEditTypeShow: false, //是否启动退款单编辑
      //退款单详情
      returnMoneyInfo: {
        sheetno: '', //退款单号
        applysheetno: '', //退款申请单号
        refund_state: '', //退款状态
        refund_value: '', //退款金额
        refund_account: '', //退款账户
        account_type: '', //账户类型
        creator: '', //录入人员
        create_date: '', //录入日期
        audit_man: '', //审核人员
        audit_date: '', //审核日期
        payment_time: '', //付款时间
        payment_man: '', //付款人员
      },
      form: {
        xxx: '',
      },
      ruleValidate: {
        xxx: [
          { required: true, message: 'The name cannot be empty', trigger: 'change' }
        ],
      },
    };
  },
  methods: {
    //返回
    linkToList() {
      this.$router.push({
        name: "order-money-list",
        params: {}
      });
    },

    //初始化必要数据
    initData() {
      //退款详情数据
      this.getList();
      
    },

    //退款详情数据
    getList() {

      // 查询参数
      let _dataParam = {

      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/271",
        method: "get",
        data: _dataParam
      }).then(res => {

        if (!res) return;

        console.log("returnData:", res.data);

        //退款单详情
        this.returnMoneyInfo = res.data.saleorderrefund;

        // //支付方式明细
        // this.payList = res.data.payment_info.map((element, index) => {
        //   // let obj;
        //   //数据处理

        //   return element;
        // })

      });

    },
    //提交查询
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$Message.success('Success!');

          //获取数据
          this.getList();

        } else {
          // this.$Message.error('Fail!');
        }
      })
    },

    //修改退款单
    editReturnMonenyOrder() {
      //显示保存按钮
      this.isSaveBtnShow = true;
      //打开表单编辑 同时 隐藏返回按钮
      this.isEditTypeShow = true;


    },

    //退款单保存
    saveReturnMonenyOrder() {
      //隐藏保存按钮
      this.isSaveBtnShow = false;
      //关闭表单编辑 同时 显示返回按钮
      this.isEditTypeShow = false;

    },

    //退款
    returnMoneny() {
      //显示确认modal
      this.returnMoneyModal = true;
    },
    returnMoneyModalCancel() {
      this.returnMoneyModal = false;
    },
    returnMoneyModalOk() {
      this.returnMoneyModal = false;
      //退款操作
      this.handleReturnMoney();
    },
    //退款操作
    handleReturnMoney() {

    },

  },
  mounted: function () {
    //初始化必要数据
    this.initData();
  },
  created: function () { }
};
</script>

<style>

</style>