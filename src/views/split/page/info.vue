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
  text-align: left;
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
        <Button class="handle-btn" type="ghost" @click="linkToStep(1)">拆分订单</Button>
        <!-- <Button class="handle-btn" type="ghost" @click="linkToStep(2)">修改履约地点</Button> -->
        <Button class="handle-btn" type="ghost" @click="logisticsStoreModalList">修改履约地点</Button>
        <!-- <Button class="handle-btn" type="ghost" @click="saveAndBack">保存&返回</Button> -->
        <Button class="handle-btn" type="primary" @click="linkToOtherOrder">其他相关订单</Button>
        <Button class="handle-btn-right" type="ghost" @click="linkToList">返回</Button>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">基本信息</p>
        <Row>
          <Col class="margin-bottom-10" span="8">订单号：{{splitOrderInfo.saleorders.subsheetno}}</Col>
          <Col class="margin-bottom-10" span="8">母订单号：{{splitOrderInfo.saleorders.idsheetno}}</Col>
          <Col class="margin-bottom-10" span="8">订单状态：{{splitOrderInfo.saleorders.order_state}}</Col>
          <Col class="margin-bottom-10" span="8">来源渠道：{{splitOrderInfo.saleorders.subsheetno}}</Col>
          <Col class="margin-bottom-10" span="8">交易门店：{{splitOrderInfo.saleorders.channel}}</Col>
          <Col class="margin-bottom-10" span="8">创建时间：{{splitOrderInfo.saleorders.create_date}}</Col>
          <Col class="margin-bottom-10" span="8">客户帐号：{{splitOrderInfo.saleorders.user_id}}</Col>
          <Col class="margin-bottom-10" span="8">会员帐号：{{splitOrderInfo.saleorders.custom_id}}</Col>
          <Col class="margin-bottom-10" span="8">联系方式：{{splitOrderInfo.saleorders.custom_mobile}}</Col>
          <Col class="margin-bottom-10" span="8">订单金额：{{splitOrderInfo.saleorders.ought_pay}}</Col>
          <Col class="margin-bottom-10" span="8">实际应付金额：{{splitOrderInfo.saleorders.fact_pay}}</Col>
          <Col class="margin-bottom-10" span="8">优惠金额：{{splitOrderInfo.saleorders.total_discount_value}}</Col>
          <Col class="margin-bottom-10" span="8">履约地点：{{splitOrderInfo.saleorders.logistics_store}}</Col>
          <Col class="margin-bottom-10" span="8">履约状态：{{splitOrderInfo.saleorders.logistics_state}}</Col>
          <Col class="margin-bottom-10" span="8">支付状态：{{splitOrderInfo.saleorders.pay_state}}</Col>
          <Col class="margin-bottom-10" span="24">客户备注：{{splitOrderInfo.saleorders.customer_remark}}</Col>
        </Row>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">配送信息</p>
        <Row>
          <Col class="margin-bottom-10" span="8">配送方式：{{splitOrderInfo.saleordersext.logistics_mode}}</Col>
          <Col class="margin-bottom-10" span="8">收货人姓名：{{splitOrderInfo.saleordersext.delivery_man}}</Col>
          <Col class="margin-bottom-10" span="8">收货人电话：{{splitOrderInfo.saleordersext.receiver_phone}}</Col>
          <Col class="margin-bottom-10" span="24">收货地址：{{splitOrderInfo.saleordersext.receiver_addr}}</Col>
          <Col class="margin-bottom-10" span="24">详细地址：{{splitOrderInfo.saleordersext.receiver_address}}</Col>
        </Row>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">商品明细</p>
        <Table size="small" :columns="prodDetailColumns" :data="prodDetailList"></Table>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">支付方式明细</p>
        <Table size="small" :columns="payColumns" :data="payList"></Table>
      </Card>

      </Col>

    </Row>

    <!-- 商品履约地点查询-->
    <Modal title="商品库存列表" :value="stockModal" @on-cancel="stockModalCancel" @on-ok="stockModalOk">
      <Table size="small" :columns="stockColumns" :data="stockList"></Table>
    </Modal>

    <!-- 单独修改商品履约地-->
    <Modal title="修改商品履约地点" :value="logisticsStoreModal" @on-cancel="logisticsStoreModalCancel" @on-ok="logisticsStoreModalOk">
      <Form :label-width="80">
        <FormItem label="履约地点：">
          <Select>
            <Option value="1">门店A</Option>
            <Option value="2">仓库A</Option>
            <Option value="3">门店B</Option>
            <Option value="4">仓库B</Option>
          </Select>
        </FormItem>
      </Form>
    </Modal>

  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '', //单据id
      stockModal: false, //库存列表modal
      logisticsStoreModal: false, //单独修改履约地点
      //订单信息
      splitOrderInfo: {
        //订单基本信息
        saleorders: {
          subsheetno: '', //订单号
          idsheetno: '', //母订单号
          order_state: '', //订单状态
          channel: '', //来源渠道
          sale_market: '', //交易门店
          create_date: '', //创建时间
          user_id: '', //客户账号
          custom_id: '', //会员账号
          custom_mobile: '', //联系方式
          ought_pay: '', //订单金额
          fact_pay: '', //实际应付金额
          total_discount_value: '', //优惠金额
          logistics_store: '', //履约地点
          logistics_state: '', //履约状态 
          pay_state: '', //支付状态
          customer_remark: '', //客户备注
          ent_id: '', //零售商id
        },
        //配送信息
        saleordersext: {
          logistics_mode: '', //配送方式
          delivery_man: '', //收货人姓名
          receiver_phone: '', //收货人电话
          receiver_province: '', //收货地址-省
          receiver_city: '', //收货地址-市
          receiver_district: '', //收货地址-区
          receiver_street: '', //收货地址-街道
          receiver_address: '', //详细地址

          receiver_addr: '', //拼接后收货人地址
        },
      },

      //商品明细信息
      prodDetailColumns: [
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
        // {
        //   title: "库存查询",
        //   align: "center",
        //   render: (h, params) => {
        //     let infoAction = h(
        //       "Button",
        //       {
        //         props: { type: "text", size: "small" },
        //         style: { marginRight: "5px", color: "#359AFC" },
        //         on: {
        //           click: () => {
        //             //参数
        //             //测试id 10001
        //             let id = params.row.id || 10001;
        //             // console.log('id>> ', id)
        //             this.stockModalList(id);
        //           }
        //         }
        //       },
        //       "查询库存"
        //     );
        //     // 包裹容器
        //     let content = h("div", [infoAction]);
        //     return content;
        //   }
        // },
        {
          title: "商品名称",
          key: "sku_name",
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
          title: "优惠金额",
          key: "total_discount_value",
          align: "center"
        },
        {
          title: "缺货数量",
          key: "g",
          align: "center"
        },
        {
          title: "是否赠品",
          key: "goods_flag",
          align: "center"
        }
      ],
      //商品明细信息
      prodDetailList: [],
      //支付信息
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
          key: "amount",
          align: "center"
        },
        {
          title: "汇率",
          key: "rate",
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
      //支付信息
      payList: [],
      //履约地信息
      stockColumns: [
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
          title: "库存地点",
          key: "c",
          align: "center"
        },
        {
          title: "可售库存数量",
          key: "d",
          align: "center"
        }
      ],
      stockList: [
        {
          a: "1000011",
          b: "特仑苏牛奶",
          c: "c门店",
          d: "15"
        }
      ],
    };
  },
  methods: {
    //拆分订单及修改履约地点
    linkToStep(v) {
      // 待拆分订单id
      let id = this.id;
      this.$router.push({
        name: "order-split-step",
        params: { v, id }
      });
    },

    //其他相关订单
    linkToOtherOrder() {
      let id = this.id;
      this.$router.push({
        name: "order-split-other",
        params: { id }
      });
    },

    //返回
    linkToList() {
      this.$router.push({
        name: "order-split-list",
        params: {}
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
      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/174",
        method: "get",
        data: _dataParam
      }).then(res => {

        if (!res) return;

        console.log("returnData:", res.data);

        //基本信息
        this.splitOrderInfo.saleorders = res.data.saleorders;
        //物流信息
        this.splitOrderInfo.saleordersext = res.data.saleordersext;
        //拼接物流信息中的收货地址
        this.splitOrderInfo.saleordersext.receiver_addr = res.data.saleordersext.receiver_province + res.data.saleordersext.receiver_city
          + res.data.saleordersext.receiver_district + res.data.saleordersext.receiver_street;

        // Object.assign(o1, o2, o3);

        //商品明细
        this.prodDetailList = res.data.saleorderdetail.map((element, index) => {
          // let obj;
          //数据处理

          return element;
        })
        //支付方式明细
        this.payList = res.data.saleorderpay.map((element, index) => {
          // let obj;
          //数据处理

          return element;
        })


      });


    },
    //获取库存
    getStockList() {

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

    // 修改履约地点前校验
    checkForEditLogisticsStore() {

      console.log('修改履约地点前校验 >>');
      // 查询参数
      let _dataParam = {
        oid: '',//订单id
      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/269",
        method: "get",
        data: _dataParam
      }).then(res => {
        //查询数据失败
        if (!res) return;

        console.log('res.data >>', res.data);

        //修改履约地点
        this.editLogisticsStore();

      });

    },

    //修改履约地点
    editLogisticsStore() {
      console.log('修改履约地点 >>');

      // 查询参数
      let _dataParam = {
        oid: '',//订单id
        logistics_store: '',//履约地点
      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/270",
        method: "get",
        data: _dataParam
      }).then(res => {
        //查询数据失败
        if (!res) return;

        console.log('res.data >>', res.data);

        //重新获取数据
        this.getList();

      });

    },

    //库存列表Modal
    stockModalList() {
      this.stockModal = true;
      //获取库存
      this.getStockList();
    },
    stockModalOk() {
      this.stockModal = false;
    },
    stockModalCancel() {
      this.stockModal = false;
    },

    //单独修改履约地点Modal
    logisticsStoreModalList() {
      this.logisticsStoreModal = true;
    },
    logisticsStoreModalOk() {
      this.logisticsStoreModal = false;
      //修改履约地点前校验
      this.checkForEditLogisticsStore();
    },
    logisticsStoreModalCancel() {
      this.logisticsStoreModal = false;
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