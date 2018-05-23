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
        <Form :label-width="100" ref="editForm" :rules="ruleValidate" :model="saleorderrefund" class="form-p">

          <Row :gutter="10">
            <Col span="8">
            <FormItem label="退款申请单单号：" prop="applysheetno">
              <p v-if="!isEditTypeShow">{{saleorderrefund.applysheetno}}</p>
              <Input v-if="isEditTypeShow" type="text" placeholder="" v-model="saleorderrefund.applysheetno"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="退款单单号：" prop="sheetno">
              <p v-if="!isEditTypeShow">{{saleorderrefund.sheetno}}</p>
              <Input v-if="isEditTypeShow" type="text" placeholder="" v-model="saleorderrefund.sheetno"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="单据状态：" prop="refund_state">
              <p v-if="!isEditTypeShow">{{saleorderrefund.refund_state}}</p>
              <Select v-if="isEditTypeShow" v-model="saleorderrefund.refund_state">
                <Option value="0">已审核</Option>
                <Option value="1">未审核</Option>
                <Option value="2">已退款</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>

          <Row :gutter="10">
            <Col span="8">
            <FormItem label="退款金额：" prop="refund_value">
              <p v-if="!isEditTypeShow">{{saleorderrefund.refund_value}}</p>
              <Input v-if="isEditTypeShow" type="text" placeholder="" v-model="saleorderrefund.refund_value"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="退款账户：" prop="refund_account">
              <p v-if="!isEditTypeShow">{{saleorderrefund.refund_account}}</p>
              <Input v-if="isEditTypeShow" type="text" placeholder="" v-model="saleorderrefund.refund_account"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="账户类型：" prop="account_type">
              <p v-if="!isEditTypeShow">{{saleorderrefund.account_type}}</p>
              <Select v-if="isEditTypeShow" v-model="saleorderrefund.account_type">
                <Option value="0">支付宝</Option>
                <Option value="1">借记卡</Option>
              </Select>
            </FormItem>
            </Col>
          </Row>

          <Row :gutter="10">
            <Col span="8">
            <FormItem label="录入人员：" prop="creator">
              <p v-if="!isEditTypeShow">{{saleorderrefund.creator}}</p>
              <Input v-if="isEditTypeShow" type="text" placeholder="" v-model="saleorderrefund.creator"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="审核人员：" prop="audit_man">
              <p v-if="!isEditTypeShow">{{saleorderrefund.audit_man}}</p>
              <Input v-if="isEditTypeShow" type="text" placeholder="" v-model="saleorderrefund.audit_man"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="付款人员：" prop="payment_man">
              <p v-if="!isEditTypeShow">{{saleorderrefund.payment_man}}</p>
              <Input v-if="isEditTypeShow" type="text" placeholder="" v-model="saleorderrefund.payment_man"></Input>
            </FormItem>
            </Col>
          </Row>

          <Row :gutter="10">
            <Col span="8">
            <FormItem label="录入时间：" prop="create_date">
              <p v-if="!isEditTypeShow">{{saleorderrefund.create_date}}</p>
              <Input v-if="isEditTypeShow" type="text" placeholder="" v-model="saleorderrefund.create_date"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="审核时间：" prop="audit_date">
              <p v-if="!isEditTypeShow">{{saleorderrefund.audit_date}}</p>
              <Input v-if="isEditTypeShow" type="text" placeholder="" v-model="saleorderrefund.audit_date"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="付款时间：" prop="payment_man">
              <p v-if="!isEditTypeShow">{{saleorderrefund.payment_man}}</p>
              <Input v-if="isEditTypeShow" type="text" placeholder="" v-model="saleorderrefund.payment_man"></Input>
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
      saleorderrefund: {
        "sheetno": "1234",
        "applysheetno": "1234",
        "refund_state": "1234",
        "refund_value": "1234",
        "refund_account": "1234",
        "account_type": "1234",
        "creator": "1234",
        "create_date": "1234",
        "audit_man": "1234",
        "audit_date": "1234",
        "payment_time": "1234",
        "payment_man": "1234"
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
    linkTo() {
      this.$router.push({
        name: "order-money-list",
        params: {}
      });
    },
    abc() {
      this.returnMoneyModal = true;
    },
    linkToList() {
      this.$router.push({
        name: "order-money-list",
        params: {}
      });
    },

    //初始化必要数据
    initData() {

    },

    //接口获取数据
    getList() {

      // 查询参数
      let _dataParam = {

      }

      // 测试标记
      return;

      this.$http({
        url: "/url-example",
        method: "post",
        data: _dataParam
      }).then(res => {
        console.log("returnData:", res);
        //判断返回状态
        if (res.status == 200 && res.data.isOK) {

          //返回数据展示


        } else {
          this.$Message.error("获取数据失败");
          // this.$Message.error(res.data.errMsg);
        }
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