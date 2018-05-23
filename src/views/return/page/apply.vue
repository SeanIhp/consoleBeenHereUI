<style scoped>
.margin-top-10 {
  margin-top: 10px;
}
.margin-top-20 {
  margin-top: 20px;
}
.padding-left-10 {
  padding-left: 10px;
}
.padding-left-right-10 {
  padding-left: 10px;
  padding-right: 10px;
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
.title {
  line-height: 35px;
  font-weight: bold;
}
</style>
<template>
  <div class="bgc-F0F0F0">
    <Row>
      <Col span="24">

      <!-- 头部标题，操作 -->
      <Card>
        <span class="title">退货申请</span>
        <Button class="handle-btn-right" type="ghost" @click="linkToList">返回</Button>
      </Card>

      <!-- 分布操作 -->
      <Card class="margin-top-10">

        <!-- 步骤条 -->
        <div style="padding:20px;">
          <!-- 原单退货步骤 -->
          <Steps v-if="orderInfo.returnOrderType==0" :current="stepsCurrent" status="finish">
            <Step title="退货信息" content="退货申请基础信息录入"></Step>
            <Step title="商品信息" content="退货商品录入"></Step>
            <Step title="退款信息" content="扣回信息录入"></Step>
            <Step title="完成" content="操作完成"></Step>
          </Steps>
          <!-- 无单退货步骤 -->
          <Steps v-if="orderInfo.returnOrderType==1" :current="stepsCurrent" status="finish">
            <Step title="退货信息" content="退货申请基础信息录入"></Step>
            <Step title="商品信息" content="退货商品录入"></Step>
            <Step title="完成" content="操作完成"></Step>
          </Steps>
        </div>

        <!-- 退货信息维护 -->
        <Card class="margin-top-20" v-show="stepsCurrent == 0">

          <p slot="title">销售订单信息</p>

          <Form ref="orderFormValidate" :model="orderInfo" :rules="orderFormRules" :label-width="150">

            <FormItem label="退货申请方式" prop="returnOrderType">
              <RadioGroup v-model="orderInfo.returnOrderType" @on-change="returnOrderTypeChange">
                <Radio label="0">原单退货</Radio>
                <Radio label="1">无单退货</Radio>
              </RadioGroup>
            </FormItem>

            <FormItem v-if="orderInfo.returnOrderType==0" label="销售订单号：" prop="orderNo">
              <Input v-model="orderInfo.orderNo" placeholder=""></Input>
            </FormItem>

            <FormItem label="退货方式" prop="returnWay">
              <Select v-model="orderInfo.returnWay">
                <Option v-for="item in returnWayList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>

            <FormItem label="退货原因" prop="returnReason">
              <Select v-model="orderInfo.returnReason">
                <Option v-for="item in returnReasonList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </FormItem>

            <FormItem label="退款方式" prop="refundWay">
              <RadioGroup v-model="orderInfo.refundWay">
                <Radio label="0">自动退款</Radio>
                <Radio label="1">人工转账</Radio>
              </RadioGroup>
            </FormItem>

            <div v-if="orderInfo.refundWay==1">
              <FormItem label="收款人姓名" prop="payeeName">
                <Input v-model="orderInfo.payeeName" placeholder=""></Input>
              </FormItem>
              <FormItem label="账户类型" prop="accountType">
                <Select v-model="orderInfo.accountType">
                  <Option v-for="item in accountTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              <FormItem label="账号" prop="tradingAccount">
                <Input v-model="orderInfo.tradingAccount" placeholder=""></Input>
              </FormItem>
            </div>

            <FormItem label="备注" prop="note">
              <Input type="textarea" v-model="orderInfo.note" placeholder=""></Input>
            </FormItem>

            <FormItem label="">
              <Button class="padding-left-right-10" type="primary" @click="toStepsSelGoods">下一步</Button>
            </FormItem>
          </Form>
        </Card>

        <!-- 商品信息 -->
        <Card class="margin-top-20" v-show="stepsCurrent == 1">

          <p slot="title">填写退货商品信息</p>

          <div v-if="orderInfo.returnOrderType==1">
            <Form :label-width="200">
              <Row :gutter="10">
                <Col span="10">
                <FormItem label="请输入退货商品编码&条码：">
                  <Input ref="goodsSearchInput" type="text" v-model="goodsSearchInputValue" placeholder="" @on-enter="goodsSearchInputChange"></Input>
                </FormItem>
                </Col>
              </Row>
            </Form>
            <p style="border-bottom: 1px solid #dddee1;" class="margin-top-10"></p>
          </div>

          <!-- 提示 -->
          <Alert class="margin-top-10" show-icon>
            共选择退货商品数量:
            <span style="font-weight:600;color:#348EED;">{{totalSelGoodsNum}}</span>
            <span style="margin:0 20px;"></span>
            退货金额:
            <span style="font-weight:600;color:#348EED;">￥{{totalSelReturnAmount | formatTotalReturnAmount}}</span>
          </Alert>

          <Table ref="returnOrderGoodsdataTable" class="margin-top-10" highlight-row size="small" :columns="returnOrderGoodsTableColumns" :data="returnOrderGoodsList | formatReturnOrderGoodsItemFields" @on-selection-change="returnOrderGoodstableSelectionChange"></Table>

          <p class="margin-top-10">
            <Button v-if="orderInfo.returnOrderType==1" class="padding-left-right-10" type="primary" @click="stepsSelGoodsCreateReturnOrder">生成退款申请单</Button>
            <Button v-if="orderInfo.returnOrderType==0" class="padding-left-right-10" type="primary" @click="toStepsCostDeductions">下一步</Button>
            <Button class="padding-left-right-10" type="ghost" @click="linkToSplit(0)">上一步</Button>
          </p>

        </Card>

        <!-- 退款信息，扣回项目 -->
        <Card class="margin-top-20" v-show="stepsCurrent == 2">
          <p slot="title">扣回信息</p>

          <!-- 提示 -->
          <Alert class="margin-top-10" show-icon>
            本退货申请单扣回项目:
            <span style="font-weight:600;color:#348EED;">{{totalCostDeductionsNum}}</span>
          </Alert>

          <Table ref="returnOrderGoodsdataTable" class="margin-top-10" highlight-row size="small" :columns="costDeductionsTableColumns" :data="costDeductionsList | formatcostDeductionsItemFields"></Table>

          <p class="margin-top-10">
            <Button class="padding-left-right-10" type="primary" @click="CostStepsCreateReturnOrder">生成退款申请单</Button>
            <Button class="padding-left-right-10" type="ghost" @click="linkToSplit(1)">上一步</Button>
          </p>
        </Card>

        <!-- 退货申请单完成 -->
        <Card class="margin-top-20" v-show="stepsCurrent == 3">

          <Row type="flex" justify="center">
            <Col span="12">

            <div style="text-align:center;">
              <Icon type="checkmark-circled" :size="160" color="#348EED"></Icon>
              <p style="font-size:18px;font-weight: bold;">创建成功</p>
            </div>

            <div style="text-align:center;background-color:#F0F0F0;margin-top:30px;padding:20px;">
              <Row type="flex" justify="center" align="middle">
                <Col span="12" style="text-align:right;padding-right:10px;font-weight:bold;">退货申请单号 ：</Col>
                <Col span="12" style="text-align:left;">20180425023</Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col span="12" style="text-align:right;padding-right:10px;font-weight:bold;">退货申请单状态 ：</Col>
                <Col span="12" style="text-align:left;">待审核</Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col span="12" style="text-align:right;padding-right:10px;font-weight:bold;">退货原因 ：</Col>
                <Col span="12" style="text-align:left;">质量问题</Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col span="12" style="text-align:right;padding-right:10px;font-weight:bold;">退货方式 ：</Col>
                <Col span="12" style="text-align:left;">物流配送</Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col span="12" style="text-align:right;padding-right:10px;font-weight:bold;">退款方式 ：</Col>
                <Col span="12" style="text-align:left;">自动退款</Col>
              </Row>
              <Row type="flex" justify="center" align="middle">
                <Col span="12" style="text-align:right;padding-right:10px;font-weight:bold;">退款金额 ：</Col>
                <Col span="12" style="text-align:left;">￥100.00</Col>
              </Row>
            </div>

            <div style="padding: 30px 0px 20px;text-align: center;">
              <Button class="padding-left-right-10" style="margin-right:10px;" type="primary" @click="refreshApplyPage">继续退货申请</Button>
              <Button class="padding-left-right-10" type="ghost" @click="linkToInfo">查看详情</Button>
            </div>

            </Col>
          </Row>

        </Card>

      </Card>

      </Col>
    </Row>
  </div>
</template>
<script>
import Util from "@/libs/util";

import ApplyOrder from "../mixin/apply-order";
import ApplyGoods from "../mixin/apply-goods";
import ApplyCost from "../mixin/apply-cost";

export default {
  mixins: [ApplyOrder, ApplyGoods, ApplyCost],
  components: {},
  data() {
    return {
      // 步骤跳转模型声明:0开始
      stepsCurrent: 0,
      // 退货方式声明【待接入API获取】
      returnWayList: [
        {
          value: "1",
          label: "物流配送"
        },
        {
          value: "2",
          label: "到店对货"
        },
        {
          value: "3",
          label: "上门提货"
        },
        {
          value: "4",
          label: "无需退回"
        }
      ],
      // 退货原因声明【待接入API获取】
      returnReasonList: [
        {
          value: "1",
          label: "质量问题"
        },
        {
          value: "2",
          label: "缺货"
        },
        {
          value: "3",
          label: "物品丢失"
        }
      ],
      // 账户类型声明【待接入API获取】
      accountTypeList: [
        {
          value: "1",
          label: "储值卡"
        },
        {
          value: "2",
          label: "支付宝"
        }
      ]
    };
  },
  computed: {
    // 退货商品数据表列处理
    returnOrderGoodsTableColumns() {
      return this.handleTableColumns();
    },
    // 扣回数据表列处理
    costDeductionsTableColumns() {
      return this.handleCostDeductionsTableColumns();
    }
  },
  methods: {
    // 返回列表
    linkToList() {
      this.$router.push({
        name: "order-return-list",
        params: {}
      });
    },
    // 前往详情
    linkToInfo() {
      this.$router.push({
        name: "order-return-info",
        params: {}
      });
    },
    // 快速切换步骤
    linkToSplit(v) {
      this.stepsCurrent = v;
    },
    // 刷新申请界面
    refreshApplyPage() {
      location.reload();
    }
    // --------------
  },
  mounted() {},
  created() {}
};
</script>