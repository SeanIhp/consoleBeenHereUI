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
      <!-- 操作  -->
      <Card>
        <Button class="handle-btn" type="primary" @click="cancelOrder">取消订单</Button>
        <Button class="handle-btn-right" type="ghost" @click="linkToList">返回</Button>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">基本信息</p>
        <Row>
          <Col class="margin-bottom-10" span="8">订单号：DD201803080001</Col>
          <Col class="margin-bottom-10" span="8">子订单号：DD201803080000</Col>
          <Col class="margin-bottom-10" span="8">订单状态：未审核</Col>
          <Col class="margin-bottom-10" span="8">来源渠道：微信商城</Col>
          <Col class="margin-bottom-10" span="8">交易门店：门店名称</Col>
          <Col class="margin-bottom-10" span="8">创建时间：2018-03-07 15:38:02</Col>
          <Col class="margin-bottom-10" span="8">客户帐号：vt128</Col>
          <Col class="margin-bottom-10" span="8">会员帐号：lv123123123</Col>
          <Col class="margin-bottom-10" span="8">联系方式：18766654563</Col>
          <Col class="margin-bottom-10" span="8">订单金额：￥888.88</Col>
          <Col class="margin-bottom-10" span="8">实际应付金额：￥888.88</Col>
          <Col class="margin-bottom-10" span="8">优惠金额：￥888.88</Col>
          <Col class="margin-bottom-10" span="8">履约地点：你猜</Col>
          <Col class="margin-bottom-10" span="8">履约状态：你猜</Col>
          <Col class="margin-bottom-10" span="8">支付状态：已支付</Col>
          <Col class="margin-bottom-10" span="24">客户备注：订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注</Col>
        </Row>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">配送信息</p>
        <Row>
          <Col class="margin-bottom-10" span="8">配送方式：配送方式名称</Col>
          <Col class="margin-bottom-10" span="8">收货人姓名：收货人名称</Col>
          <Col class="margin-bottom-10" span="8">收货人电话：1829998374</Col>
          <Col class="margin-bottom-10" span="24">收货地址：湖北省武汉市武昌区粮道街</Col>
          <Col class="margin-bottom-10" span="24">详细地址：泛悦汇中心11楼</Col>
        </Row>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">商品明细</p>
        <Table size="small" :columns="adminColumns" :data="adminList"></Table>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">支付方式明细</p>
        <Table size="small" :columns="payColumns" :data="payList"></Table>
      </Card>

      </Col>

    </Row>

    <!-- 取消操作 -->
    <Modal title="取消操作" :value="orderCancelModal" @on-cancel="modalCancel" @on-ok="modalOk">
      <Form :label-width="80">
        <FormItem label="取消原因：">
          <Select>
            <Option value="1">缺货</Option>
            <Option value="2">不想买了</Option>
            <Option value="3">商品选错了</Option>
            <Option value="4">无法支付</Option>
            <Option value="5">其他</Option>
          </Select>
        </FormItem>
        <FormItem label="备注：">
          <Input type="textarea" placeholder=""></Input>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script>
export default {
  data() {
    return {
      orderCancelModal: false,
      id: '', //单据id
      adminColumns: [
        {
          title: "行号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "商品编码",
          key: "a",
          align: "center"
        },
        {
          title: "商品名称",
          key: "b",
          align: "center"
        },
        {
          title: "单价",
          key: "c",
          align: "center"
        },
        {
          title: "数量",
          key: "d",
          align: "center"
        },
        {
          title: "金额",
          key: "e",
          align: "center"
        },
        {
          title: "优惠金额",
          key: "f",
          align: "center"
        },
        {
          title: "缺货数量",
          key: "g",
          align: "center"
        },
        {
          title: "是否赠品",
          key: "h",
          align: "center"
        }
      ],
      adminList: [
        {
          a: "1000029",
          b: "特仑苏牛奶",
          c: "55.00",
          d: "2",
          e: "110.00",
          f: "0.00",
          g: "2",
          h: "否"
        },
        {
          a: "1000029",
          b: "特仑苏牛奶",
          c: "55.00",
          d: "2",
          e: "110.00",
          f: "0.00",
          g: "2",
          h: "否"
        },
        {
          a: "1000029",
          b: "特仑苏牛奶",
          c: "55.00",
          d: "2",
          e: "110.00",
          f: "0.00",
          g: "0",
          h: "否"
        }
      ],
      payColumns: [
        {
          title: "行号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "支付方式类型",
          key: "a",
          align: "center"
        },
        {
          title: "支付方式名称",
          key: "b",
          align: "center"
        },
        {
          title: "支付金额",
          key: "c",
          align: "center"
        },
        {
          title: "汇率",
          key: "d",
          align: "center"
        },
        {
          title: "支付抵用金额",
          key: "e",
          align: "center"
        },
        {
          title: "支付帐号",
          key: "f",
          align: "center"
        }
      ],
      payList: [
        {
          a: "在线支付平台",
          b: "支付宝",
          c: "539.20",
          d: "1.00",
          e: "539.20",
          f: "asdfasdfasdf"
        }
      ]
    };
  },
  methods: {
    //返回
    linkToList() {
      this.$router.push({
        name: "order-cancel-list",
        params: {}
      });
    },
    initData() {
      //初始化必要数据
      //初始化必要数据
      let { id } = this.$route.params;
      this.id = id;
      console.log('this.id> ', this.id);
      //获取数据
      this.getList();
    },

    //接口获取数据
    getList(obj) {

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

    //取消订单model
    cancelOrder() {
      this.orderCancelModal = true;
    },
    modalOk() {
      this.orderCancelModal = false;
    },
    modalCancel() {
      this.orderCancelModal = false;
    }
  },
  mounted: function () {
    //初始化数据
    this.initData();
  },
  created: function () { }
};
</script>

<style>

</style>