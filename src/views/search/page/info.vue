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
        <Button class="handle-btn" type="primary" @click="linkToOtherOrder">其他相关订单</Button>
        <Button class="handle-btn-right" type="ghost" @click="linkToList">返回</Button>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">基本信息</p>
        <Row>
          <Col class="margin-bottom-10" span="8">订单号：DD201803080001</Col>
          <Col class="margin-bottom-10" span="8">母订单号：DD201803080000</Col>
          <Col class="margin-bottom-10" span="8">订单状态：未审核</Col>

          <Col class="margin-bottom-10" span="8">订单类型：销售/退货</Col>
          <Col class="margin-bottom-10" span="8">退货原订单号：DD201803080000</Col>
          <Col class="margin-bottom-10" span="8">支付状态：未支付</Col>

          <Col class="margin-bottom-10" span="8">来源渠道：微信商城</Col>
          <Col class="margin-bottom-10" span="8">交易门店：门店名称</Col>
          <Col class="margin-bottom-10" span="8">创建时间：2018-03-07 15:38:02</Col>

          <Col class="margin-bottom-10" span="8">终端号：xxxxx</Col>
          <Col class="margin-bottom-10" span="8">终端流水号：xxxxx</Col>
          <Col class="margin-bottom-10" span="8">终端操作员：xxxxxx</Col>

          <Col class="margin-bottom-10" span="8">客户帐号：vt128</Col>
          <Col class="margin-bottom-10" span="8">会员帐号：lv123123123</Col>
          <Col class="margin-bottom-10" span="8">会员类别：普通会员</Col>

          <Col class="margin-bottom-10" span="8">联系方式：18766654563</Col>
          <Col class="margin-bottom-10" span="8">履约地点：你猜</Col>
          <Col class="margin-bottom-10" span="8">履约状态：你猜</Col>
          <Col class="margin-bottom-10" span="24">客户备注：订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注订单备注</Col>
        </Row>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">交易信息</p>
        <Row>
          <Col class="margin-bottom-10" span="8">应付金额：￥100.00</Col>
          <Col class="margin-bottom-10" span="8">实付金额：￥90.00</Col>
          <Col class="margin-bottom-10" span="8">优惠金额：￥10.00</Col>
          <Col class="margin-bottom-10" span="8">促销折扣：￥0.00</Col>
          <Col class="margin-bottom-10" span="8">会员折扣：￥0.00</Col>
          <Col class="margin-bottom-10" span="8">临时折扣：￥0.00</Col>
          <Col class="margin-bottom-10" span="8">返券金额：￥0.00</Col>
          <Col class="margin-bottom-10" span="8">获得积分：0</Col>
          <Col class="margin-bottom-10" span="8">运费金额：￥0.00</Col>
          <Col class="margin-bottom-10" span="8">运费减免金额：￥0.00</Col>
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
        <p slot="title">商品明细</p>
        <Table size="small" :columns="adminColumns" :data="adminList"></Table>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">促销与券明细</p>
        <Tabs value="name1">
          <TabPane label="用券分摊" name="name1">
            <Table size="small" :columns="couponUseColumns" :data="couponUseList"></Table>
          </TabPane>
          <TabPane label="促销明细" name="name2">
            <Table size="small" :columns="salePromotionColumns" :data="salePromotionList"></Table>
          </TabPane>
          <TabPane label="返券分摊" name="name3">
            <Table size="small" :columns="couponBackColumns" :data="couponBackList"></Table>
          </TabPane>
        </Tabs>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">扣回明细</p>
        <Table size="small" :columns="discountColumns" :data="discountList"></Table>
      </Card>

      </Col>

    </Row>

    <!-- 留作保存及关闭等提示框样例 -->
    <!-- <Modal title="审核操作" :value="mv" @on-cancel="cancel" @on-ok="ok">
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
      mv: false,
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
          title: "促销折扣",
          key: "g",
          align: "center"
        },
        {
          title: "会员折扣",
          key: "h",
          align: "center"
        },
        {
          title: "临时折扣",
          key: "i",
          align: "center"
        },
        {
          title: "返券金额",
          key: "g",
          align: "center"
        },
        {
          title: "获得积分",
          key: "k",
          align: "center"
        },
        {
          title: "促销活动",
          key: "l",
          align: "center"
        },
        {
          title: "是否赠品",
          key: "m",
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
          g: "",
          h: "",
          i: "",
          j: "",
          k: "",
          l: "",
          m: "否",
        },
        {
          a: "1000029",
          b: "特仑苏牛奶",
          c: "55.00",
          d: "2",
          e: "110.00",
          f: "0.00",
          g: "",
          h: "",
          i: "",
          j: "",
          k: "",
          l: "",
          m: "否",
        },
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
      ],
      discountColumns: [
        {
          title: "行号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "扣回项目",
          key: "a",
          align: "center"
        },
        {
          title: "应扣回金额",
          key: "b",
          align: "center"
        },
        {
          title: "实际扣回金额",
          key: "c",
          align: "center"
        },
        {
          title: "备注",
          key: "d",
          align: "center"
        }
      ],
      discountList: [
        {
          a: "YFKH 运费扣回",
          b: "120.00",
          c: "120.00",
          d: "备注备注"
        },
        {
          a: "YFKH 运费扣回",
          b: "120.00",
          c: "120.00",
          d: "备注备注"
        },
        {
          a: "YFKH 运费扣回",
          b: "120.00",
          c: "120.00",
          d: "备注备注"
        }
      ],
      couponUseColumns: [
        {
          title: "行号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "支付方式",
          key: "a",
          align: "center"
        },
        {
          title: "券种/积分类型",
          key: "b",
          align: "center"
        },
        {
          title: "分摊折现金额",
          key: "c",
          align: "center"
        }
      ],
      couponUseList: [
        {
          a: "积分消费",
          b: "权益积分",
          c: "50",
        },
        {
          a: "积分消费",
          b: "权益积分",
          c: "50",
        },
      ],
      salePromotionColumns: [
        {
          title: "行号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "促销类型",
          key: "a",
          align: "center"
        },
        {
          title: "促销活动单号",
          key: "a",
          align: "center"
        },
        {
          title: "促销规则单号",
          key: "a",
          align: "center"
        },
        {
          title: "活动名称",
          key: "a",
          align: "center"
        },
        {
          title: "促销金额",
          key: "a",
          align: "center"
        },
      ],
      salePromotionList: [
        {
          a: "",
          b: "",
          c: "",
          d: ""
        }],
      couponBackColumns: [
        {
          title: "行号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "券种/积分类型",
          key: "a",
          align: "center"
        },
        {
          title: "券号",
          key: "b",
          align: "center"
        },
        {
          title: "返券金额",
          key: "c",
          align: "center"
        },
      ],
      couponBackList: [
        {
          a: "积分",
          b: "xxxx",
          c: "200",
        }
      ],
    };
  },
  methods: {
    //返回
    linkToList() {
      this.$router.push({
        name: "order-search-list",
        params: {}
      });
    },
    //其他订单
    linkToOtherOrder() {
      let id = this.id;
      this.$router.push({
        name: "order-search-other",
        params: { id }
      });
    },

    //初始化必要数据
    initData() {

      //获取路由参数
      this.id = this.$route.params.id;
      console.log('this.id> ', this.id);
      //获取数据
      this.getList();

    },

    //接口获取数据
    getList() {

      // 查询参数
      let _dataParam = {
        id: this.id,
      }

      //测试标记
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