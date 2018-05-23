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
</style>

<template>
  <div class="bgc-F0F0F0">
    <Row>

      <Col span="24">

      <!-- 操作 -->
      <Card>
        <Button class="handle-btn" type="primary" @click="handleOrderReview">审核</Button>
        <Button class="handle-btn-right" type="ghost" @click="linkToList">返回</Button>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">基本信息</p>

        <Row>

          <Col class="margin-bottom-10" span="8">订单号：{{saleorders.subsheetno}}</Col>
          <Col class="margin-bottom-10" span="8">订单状态：{{saleorders.order_state}}</Col>
          <Col class="margin-bottom-10" span="8">支付状态：{{saleorders.pay_state}}</Col>
          <Col class="margin-bottom-10" span="8">来源渠道：{{saleorders.channel}}</Col>
          <Col class="margin-bottom-10" span="8">交易门店：{{saleorders.sale_market}}</Col>
          <Col class="margin-bottom-10" span="8">创建时间：{{saleorders.create_date}}</Col>
          <Col class="margin-bottom-10" span="8">客户帐号：{{saleorders.user_id}}</Col>
          <Col class="margin-bottom-10" span="8">会员帐号：{{saleorders.custom_id}}</Col>
          <Col class="margin-bottom-10" span="8">联系方式：{{saleorders.custom_mobile}}</Col>
          <Col class="margin-bottom-10" span="8">订单金额：￥{{saleorders.fact_pay}}</Col>
          <Col class="margin-bottom-10" span="8">实际应付金额：￥{{saleorders.ought_pay}}</Col>
          <Col class="margin-bottom-10" span="8">优惠金额：￥{{saleorders.total_discount_value}}</Col>
          <Col class="margin-bottom-10" span="24">客户备注：{{saleorders.customer_remark}}</Col>
          <Col class="margin-bottom-10" span="24">客服备注：{{saleorders.caller_remark}}</Col>

        </Row>

      </Card>

      <Card class="margin-top-10">
        <p slot="title">配送信息</p>
        <Row>
          <Col class="margin-bottom-10" span="8">配送方式：{{saleorders.logistics_mode}}</Col>
          <Col class="margin-bottom-10" span="8">收货人姓名：{{saleordersext.receiver_name}}</Col>
          <Col class="margin-bottom-10" span="8">收货人电话：{{saleordersext.receiver_mobile}}</Col>
          <Col class="margin-bottom-10" span="24">收货地址：{{saleordersext.receiver_province}}-{{saleordersext.receiver_city}}-{{saleordersext.receiver_district}}-{{saleordersext.receiver_street}}</Col>
          <Col class="margin-bottom-10" span="24">详细地址：{{saleordersext.receiver_address}}</Col>
        </Row>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">商品明细</p>
        <Table size="small" :columns="orderGoodsColumns" :data="orderGoodsDataList"></Table>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">支付方式明细</p>
        <Table size="small" :columns="payColumns" :data="payList"></Table>
      </Card>

      </Col>

    </Row>

    <!-- 审核modal -->
    <Modal title="审核操作" :value="orderReviewModal" @on-cancel="orderReviewModalCancel" @on-ok="orderReviewModalOk('info')">
      <Form :label-width="80">
        <FormItem label="审核结果：">
          <RadioGroup v-model="orderReviewData.reviewStatusCode">
            <Radio label="1">通过</Radio>
            <Radio label="2">不通过</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem v-if="orderReviewData.reviewStatusCode == 2" label="否决原因：">
          <Input v-model="orderReviewData.info" type="textarea" placeholder=""></Input>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script>
import OrderReview from "../mixin/orderReview";

export default {
  mixins: [OrderReview],
  data() {
    return {
      // 订单id
      oid: "",
      // 订单基本信息
      saleorders: {
        subsheetno: "", // 订单号
        order_state: "", // 订单状态
        pay_state: "", // 支付状态
        channel: "", // 来源渠道
        sale_market: "", // 交易门店
        create_date: "", // 创建时间
        user_id: "", // 客户帐号
        custom_id: "", // 会员帐号
        custom_mobile: "", // 联系方式
        fact_pay: "", // 订单金额
        ought_pay: "", // 实际应付金额
        total_discount_value: "", // 优惠金额
        customer_remark: "", // 客户备注
        caller_remark: "", // 客服备注
        logistics_mode: "" // 配送方式
      },
      // 订单配送信息
      saleordersext: {
        receiver_name: "", // 收货人姓名
        receiver_mobile: "", // 收货人电话
        receiver_province: "", // 省
        receiver_city: "", // 市
        receiver_district: "", // 区
        receiver_street: "", // 街道
        receiver_address: "" // 详细地址
      },

      // 商品明细表格列
      orderGoodsColumns: [
        {
          title: "行号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "商品编码",
          key: "item_code",
          align: "center"
        },
        {
          title: "商品名称",
          key: "sku_name",
          align: "center"
        },
        {
          title: "商品属性",
          key: "style_name",
          align: "center"
        },
        {
          title: "商品类别",
          key: "cat_name",
          align: "center"
        },
        {
          title: "商品品牌",
          key: "brand_name",
          align: "center"
        },
        {
          title: "规格",
          key: "spec_name",
          align: "center"
        },
        {
          title: "单价",
          key: "list_price",
          align: "center"
        },
        {
          title: "数量",
          key: "qty",
          align: "center"
        },
        {
          title: "金额",
          key: "list_amount",
          align: "center"
        },
        {
          title: "实际应付金额",
          key: "sale_amount",
          align: "center"
        },
        {
          title: "优惠金额",
          key: "total_discount_value",
          align: "center"
        },
        {
          title: "是否赠品",
          key: "goods_flag",
          align: "center"
        }
      ],
      // 商品明细列表数据
      orderGoodsDataList: [],

      // 支付方式表格列
      payColumns: [
        {
          title: "行号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "支付方式类型",
          key: "paycode",
          align: "center"
        },
        {
          title: "支付方式名称",
          key: "payname",
          align: "center"
        },
        {
          title: "支付金额",
          key: "money",
          align: "center"
        },
        {
          title: "汇率",
          key: "rete",
          align: "center"
        },
        {
          title: "支付抵用金额",
          key: "money",
          align: "center"
        },
        {
          title: "支付帐号",
          key: "consumers_id",
          align: "center"
        }
      ],
      // 支付方式列表数据
      payList: []

      // -----------------------
    };
  },
  methods: {
    // 订单详情初始化
    init() {
      this.oid = this.$route.params.oid;
      console.log("oid:", this.oid);

      // 查询条件整理
      let queryParam = {
        oid: this.oid //退货申请单id
      };
      console.log("queryParam:", queryParam);

      this.$http({
        url: "http://172.17.13.51:82/app/mock/data/258", //请求地址
        method: "get", //请求类型
        data: queryParam //请求参数对象
      }).then(res => {
        if (res) {
          // 基本信息
          this.saleorders = res.data.saleorders[0];
          // 配送信息
          this.saleordersext = res.data.saleordersext[0];
          // 商品明细列处理
          this.orderGoodsDataList = res.data.saleorderdetail;
          // 支付方式明细
          this.payList = res.data.saleorderpay;
        }
      });
    },
    // 返回列表页
    linkToList() {
      this.$router.push({
        name: "order-review-list",
        params: {}
      });
    },
    // 审核按钮操作
    handleOrderReview() {
      this.selectTableDateList = [
        {
          oid: this.oid
        }
      ];
      console.log("asdfas123123");
      this.orderReviewModal = true;
    }
    // -----------------------------------
  },
  mounted: function() {
    this.init();
  },
  activated: function() {
    this.init();
  },
  created: function() {}
};
</script>

<style>

</style>