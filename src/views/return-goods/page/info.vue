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

.compensate-order-info {
  color: #348eed;
  cursor: pointer;
}
</style>

<template>
  <div class="bgc-F0F0F0">
    <Row>
      <Col span="24">
      <!-- 操作 -->
      <Card>
        <Button class="handle-btn-right" type="ghost" @click="linkToList">返回</Button>
        <Button class="handle-btn" type="ghost" @click="">验货确认</Button>
        <Button class="handle-btn" type="ghost" @click="transportBtn">物流信息</Button>
        <Button class="handle-btn" type="ghost" @click="compensateBtn">补偿信息</Button>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">基本信息</p>
        <Row>
          <Col class="margin-bottom-10" span="8">退货单单号：{{returnGoodsInfo.base_info.sheetno}}</Col>
          <Col class="margin-bottom-10" span="8">原退货申请号：{{returnGoodsInfo.base_info.applysheetno}}</Col>
          <Col class="margin-bottom-10" span="8">单据状态：{{returnGoodsInfo.base_info.return_state}}</Col>
          <Col class="margin-bottom-10" span="8">退款单号：{{returnGoodsInfo.base_info.refund_sheetno}}</Col>
          <Col class="margin-bottom-10" span="8">原订单号：{{returnGoodsInfo.base_info.sale_sheetno}}</Col>
          <Col class="margin-bottom-10" span="8">交易时间：{{returnGoodsInfo.base_info.order_sale_date}}</Col>
          <Col class="margin-bottom-10" span="8">退货方式：{{returnGoodsInfo.base_info.return_type}}</Col>
          <Col class="margin-bottom-10" span="8">退货金额：￥{{returnGoodsInfo.base_info.return_amount || 0}}</Col>
          <Col class="margin-bottom-10" span="8">退货原因：{{returnGoodsInfo.base_info.return_reason}}</Col>
          <Col class="margin-bottom-10" span="8">顾客ID：{{returnGoodsInfo.base_info.custom_id}}</Col>
          <Col class="margin-bottom-10" span="8">会员折扣：￥{{returnGoodsInfo.base_info.member_discount || 0}}</Col>
          <Col class="margin-bottom-10" span="8">促销折扣：￥{{returnGoodsInfo.base_info.promotion_discount || 0}}</Col>
          <Col class="margin-bottom-10" span="8">临时折扣：￥{{returnGoodsInfo.base_info.temp_discount || 0}}</Col>
        </Row>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">配送信息</p>
        <Row>
          <Col class="margin-bottom-10" span="8">配送方式：{{returnGoodsInfo.delivery_info.logistics_mode}}</Col>
          <Col class="margin-bottom-10" span="8">物流公司：{{returnGoodsInfo.delivery_info.logistics_company_name}}</Col>
          <Col class="margin-bottom-10" span="8">物流单号：{{returnGoodsInfo.delivery_info.express_number}}</Col>
          <Col class="margin-bottom-10" span="8">退货人姓名：{{returnGoodsInfo.delivery_info.custom_name}}</Col>
          <Col class="margin-bottom-10" span="8">联系方法：{{returnGoodsInfo.delivery_info.custom_mobile}}</Col>
        </Row>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">其他信息</p>
        <Row>
          <Col class="margin-bottom-10" span="8">录入人员：{{returnGoodsInfo.other_info.creator}}</Col>
          <Col class="margin-bottom-10" span="8">审核人员：{{returnGoodsInfo.other_info.audit_man}}</Col>
          <Col class="margin-bottom-10" span="8">取消人员：{{returnGoodsInfo.other_info.cancel_man}}</Col>
          <Col class="margin-bottom-10" span="8">录入时间：{{returnGoodsInfo.other_info.create_date}}</Col>
          <Col class="margin-bottom-10" span="8">审核时间：{{returnGoodsInfo.other_info.audit_date}}</Col>
          <Col class="margin-bottom-10" span="8">取消时间：{{returnGoodsInfo.other_info.cancel_date}}</Col>
        </Row>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">商品明细</p>
        <Table size="small" :columns="prodDetailColumns" :data=" prodDetailList"></Table>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">支付方式明细</p>
        <Table size="small" :columns="payColumns" :data="payList"></Table>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">扣回明细</p>
        <Table size="small" :columns="discountColumns" :data="discountList"></Table>
      </Card>

      </Col>

    </Row>

    <!-- 物流信息 -->
    <Modal title="物流信息" :value="transportM" @on-cancel="transportMCancel" @on-ok="transportMOk">
      <Form :label-width="80">
        <Row>
          <Col>
          <FormItem label="快递公司" prop="microapp_name">
            <Select>
              <Option value="1">顺丰快递</Option>
              <Option value="2">中通快递</Option>
              <Option value="3">韵达快递</Option>
            </Select>
          </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="18">
          <FormItem label="快递单号">
            <Input type="text" placeholder=""></Input>
          </FormItem>
          </Col>
          <Col span="6" style="padding-left:20px;">
          <Button type="primary" icon="search" @click="getExpressInfo">查询</Button>
          </Col>
        </Row>
        <Row>
          <Col span="24">
          <FormItem label="详细信息">
            <Input type="textarea" placeholder=""></Input>
          </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>

    <!-- 补偿信息 -->
    <Modal title="补偿信息" :value="compensateM" @on-cancel="compensateMCancel" @on-ok="compensateMOk">
      <Row>
        <Col class="margin-bottom-10" span="12">补偿现金：￥100.00</Col>
        <Col class="margin-bottom-10" span="12">补偿储值金额：￥10.00</Col>
        <Col class="margin-bottom-10" span="12">补偿电子券：￥2.00</Col>
        <Col class="margin-bottom-10" span="12">补偿积分：234</Col>
        <Col class="margin-bottom-10" span="24">
        <div @click="linkToCompensateInfo" class="compensate-order-info"> 相关补偿单号：T20112030120000</div>
        </Col>
        <!-- 补偿单详细信息 -->
        <div v-if="isShowCompensateInfo">
          <Col class="margin-bottom-10" span="12">补偿单号：12234234</Col>
          <Col class="margin-bottom-10" span="12">单据状态：XX</Col>
          <Col class="margin-bottom-10" span="12">退货申请单号：2341324134</Col>
          <Col class="margin-bottom-10" span="12">订单来源渠道：门店</Col>
          <Col class="margin-bottom-10" span="12">交易门店：门店A</Col>
          <Col class="margin-bottom-10" span="12">创建时间：20112.10.12</Col>
          <Col class="margin-bottom-10" span="12">会员账号：xt11232344</Col>
          <Col class="margin-bottom-10" span="12">客户姓名：xxx</Col>
          <Col class="margin-bottom-10" span="12">联系方式：23434324443</Col>
          <Col class="margin-bottom-10" span="12">补偿类型：234</Col>
          <Col class="margin-bottom-10" span="12">补偿子类：234</Col>
          <Col class="margin-bottom-10" span="12">补偿金额：234</Col>
          <Col class="margin-bottom-10" span="12">审核时间：234</Col>
          <Col class="margin-bottom-10" span="12">审核人：234</Col>
          <Col class="margin-bottom-10" span="24">备注：234</Col>
        </div>
      </Row>
    </Modal>

  </div>
</template>

<script>
export default {
  data() {
    return {
      transportM: false, //物流信息modal
      compensateM: false, //补偿信息modal
      isShowCompensateInfo: false, //展示补偿单详情
      returnGoodsInfo: {
        //基本信息
        base_info: {
          sheetno: '',//退货单号
          applysheetno: '',//原退货申请单号
          return_state: '',//单据状态
          refund_sheetno: '',//退款单号
          sale_sheetno: '',//原订单号
          order_sale_date: '',//交易时间
          return_type: '',//退货方式
          return_amount: '',//退货金额
          return_reason: '',//退货原因
          custom_id: '',//顾客ID
          member_discount: '',//会员折扣
          promotion_discount: '',//促销折扣
          temp_discount: '',//临时折扣
        },
        //配送信息
        delivery_info: {
          logistics_mode: '', //配送方式
          logistics_company_name: '',//物流公司
          custom_name: '',//退货人姓名
          express_number: '',//快递单号
          custom_mobile: '',//联系方式
        },
        //其他信息
        other_info: {
          creator: '',//创建人
          create_date: '',//创建时间
          cancel_reason: '',//取消原因
          cancel_man: '',//取消人名
          cancel_date: '',//取消时间
          audit_man: '',//审核人
          audit_date: '',//审核时间
        },
      },
      //商品明细
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
        {
          title: "商品名称",
          key: "sku_name",
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
          title: "数量",
          key: "qty",
          align: "center"
        },
        {
          title: "售价",
          key: "price",
          align: "center"
        },
        {
          title: "售价金额",
          key: "sale_price",
          align: "center"
        },
        {
          title: "原成交金额",
          key: "real_price",
          align: "center"
        },
        {
          title: "会员折扣",
          key: "custom_discount",
          align: "center"
        },
        {
          title: "促销折扣",
          key: "promotion_discount",
          align: "center"
        },
        {
          title: "临时折扣",
          key: "temp_discount",
          align: "center"
        },
        {
          title: "退货金额",
          key: "return_amount",
          align: "center"
        },
        {
          title: "规格",
          key: "spec_name",
          align: "center"
        },
        {
          title: "描述",
          key: "remark",
          align: "center"
        }
      ],
      //商品明细
      prodDetailList: [],
      //支付方式明细
      payColumns: [
        {
          title: "行号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "支付方式代码",
          key: "payment_code",
          align: "center"
        },
        {
          title: "支付方式名称",
          key: "payment_name",
          align: "center"
        },
        {
          title: "汇率",
          key: "rate",
          align: "center"
        },
        {
          title: "支付金额",
          key: "amount",
          align: "center"
        },
        {
          title: "支付账号",
          key: "payment_account",
          align: "center"
        }
      ],
      //支付方式明细
      payList: [],
      //扣回明细
      discountColumns: [
        {
          title: "行号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "扣回项目",
          key: "deduct_item",
          align: "center"
        },
        {
          title: "应扣回金额",
          key: "amount",
          align: "center"
        },
        {
          title: "实际扣回金额",
          key: "real_amount",
          align: "center"
        },
        {
          title: "备注",
          key: "remark",
          align: "center"
        }
      ],
      //扣回明细
      discountList: [],

    };
  },
  methods: {
    //返回
    linkToList() {
      this.$router.push({
        name: "order-goods-list",
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

    //获取退货单据详情信息
    getList() {

      // 查询参数
      let _dataParam = {
        id: this.id,
      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/265",
        method: "get",
        data: _dataParam
      }).then(res => {

        if (!res) return;

        console.log("returnData:", res.data);

        //基本信息
        this.returnGoodsInfo.base_info = res.data.base_info;
        //物流信息
        this.returnGoodsInfo.delivery_info = res.data.delivery_info;
        //其他信息
        this.returnGoodsInfo.other_info = res.data.other_info;
        //商品明细
        this.prodDetailList = res.data.prod_detail.map((element, index) => {
          // let obj;
          //数据处理

          return element;
        })
        //支付方式明细
        this.payList = res.data.payment_info.map((element, index) => {
          // let obj;
          //数据处理

          return element;
        })
        //扣回明细
        this.discountList = res.data.deduct_info.map((element, index) => {
          // let obj;
          //数据处理

          return element;
        })

      });
    },

    //获取单据详情信息
    getExpressInfo() {
      // 查询参数
      //参数验证

      let _dataParam = {
        id: this.id,
      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/242",
        method: "get",
        data: _dataParam
      }).then(res => {
        console.log("returnData:", res.data);

      });
    },


    //获取补偿单信息
    getCompensateInfo() {
      // 查询参数
      //参数验证

      let _dataParam = {
        id: this.id,
      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/242",
        method: "get",
        data: _dataParam
      }).then(res => {
        console.log("returnData:", res.data);

      });
    },

    //物流信息
    transportBtn() {
      this.transportM = true;
    },
    transportMOk() {
      this.transportM = false;
    },
    transportMCancel() {
      this.transportM = false;
    },

    //补偿信息
    compensateBtn() {
      this.compensateM = true;
      //获取补偿单信息
      this.getCompensateInfo();
    },
    compensateMOk() {
      this.compensateM = false;
    },
    compensateMCancel() {
      this.compensateM = false;
    },

    //补偿单详情信息
    linkToCompensateInfo() {
      console.log('补偿单 >>', 12);
      this.isShowCompensateInfo = !this.isShowCompensateInfo;

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