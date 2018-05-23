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
        <Button :disabled="ShippingInformationEditType" class="handle-btn" type="primary" @click="btnEditAction">修改</Button>
        <Button class="handle-btn" type="primary">删除</Button>
        <Button class="handle-btn" type="primary" @click="btnCancelAction">取消</Button>
        <Button :disabled="!ShippingInformationEditType" class="handle-btn" type="primary" @click="btnSubmitAction">保存</Button>
        <Button class="handle-btn" type="primary" @click="btnReviewAction">审核</Button>
        <Button class="handle-btn" type="primary">打印</Button>
        <Button class="handle-btn" type="primary">导出</Button>
        <Button class="handle-btn" type="primary">关闭</Button>
        <Button class="handle-btn" type="primary">物流信息</Button>
        <Button class="handle-btn" type="primary" @click="showCompensationModal">补偿信息</Button>
        <Button class="handle-btn-right" type="ghost" @click="linkToList">返回</Button>
      </Card>

      <!-- 单头信息 -->
      <Card class="margin-top-10">
        <p slot="title">基本信息</p>
        <Row>
          <Col class="margin-bottom-10" span="8">退货申请单号：{{returnApplyOrderInfo.base_info.applysheetno}}</Col>
          <Col class="margin-bottom-10" span="8">退货申请时间：{{returnApplyOrderInfo.base_info.apply_date}}</Col>
          <Col class="margin-bottom-10" span="8">退货申请状态：{{returnApplyOrderInfo.base_info.return_state}}</Col>
          <Col class="margin-bottom-10" span="8">原交易订单单号：{{returnApplyOrderInfo.base_info.sale_sheetno}}</Col>
          <Col class="margin-bottom-10" span="8">原交易订单时间：{{returnApplyOrderInfo.base_info.order_sale_date}}</Col>
          <Col class="margin-bottom-10" span="8">退货申请门店：【API缺少返回】</Col>
          <Col class="margin-bottom-10" span="8">退货申请渠道：{{returnApplyOrderInfo.base_info.deal_channel}}</Col>
          <Col class="margin-bottom-10" span="8">退货原因：{{returnApplyOrderInfo.base_info.return_reason}}</Col>
          <Col class="margin-bottom-10" span="8">退货单单号：{{returnApplyOrderInfo.base_info.return_no}}</Col>
          <Col class="margin-bottom-10" span="8">申请来源：{{returnApplyOrderInfo.base_info.apply_source}}</Col>
          <Col class="margin-bottom-10" span="8">会员折扣：{{returnApplyOrderInfo.base_info.member_discount}}</Col>
          <Col class="margin-bottom-10" span="8">促销折扣：{{returnApplyOrderInfo.base_info.promotion_discount}}</Col>
          <Col class="margin-bottom-10" span="8">退货金额：{{returnApplyOrderInfo.base_info.return_amount}}</Col>
          <Col class="margin-bottom-10" span="8">临时折扣：{{returnApplyOrderInfo.base_info.temp_discount}}</Col>
        </Row>
      </Card>

      <!-- 配送信息可修改 -->
      <Card class="margin-top-10">
        <p slot="title">配送信息</p>
        <Form :label-width="90" ref="ShippingInformationEditForm" :model="ShippingInformationEditFormInfo">

          <Row :gutter="10">
            <Col span="8">
            <FormItem label="退货方式：" prop="return_type">
              <p v-if="!ShippingInformationEditType">{{ShippingInformationEditFormInfo.return_type}}</p>
              <Select v-if="ShippingInformationEditType" v-model="ShippingInformationEditFormInfo.return_type">
                <Option value="0">已审核</Option>
                <Option value="1">申请中</Option>
                <Option value="2">已取消</Option>
              </Select>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="物流公司：" prop="logistics_company_name">
              <p v-if="!ShippingInformationEditType">{{ShippingInformationEditFormInfo.logistics_company_name}}</p>
              <Input v-if="ShippingInformationEditType" type="text" placeholder="" v-model="ShippingInformationEditFormInfo.logistics_company_name"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="退货人姓名：" prop="custom_name">
              <p v-if="!ShippingInformationEditType">{{ShippingInformationEditFormInfo.custom_name}}</p>
              <Input v-if="ShippingInformationEditType" type="text" placeholder="" v-model="ShippingInformationEditFormInfo.custom_name"></Input>
            </FormItem>
            </Col>
          </Row>

          <Row :gutter="10">
            <Col span="8">
            <FormItem label="物流单号：" prop="modules_code">
              <p v-if="!ShippingInformationEditType">{{ShippingInformationEditFormInfo.express_number}}</p>
              <Input v-if="ShippingInformationEditType" type="text" placeholder="" v-model="ShippingInformationEditFormInfo.express_number"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="联系方式：" prop="custom_mobile">
              <p v-if="!ShippingInformationEditType">{{ShippingInformationEditFormInfo.custom_mobile}}</p>
              <Input v-if="ShippingInformationEditType" type="text" placeholder="" v-model="ShippingInformationEditFormInfo.custom_mobile"></Input>
            </FormItem>
            </Col>
            <Col span="8">
            <FormItem label="客户账号：" prop="member_account">
              <p v-if="!ShippingInformationEditType">{{ShippingInformationEditFormInfo.member_account}}</p>
              <Input v-if="ShippingInformationEditType" type="text" placeholder="" v-model="ShippingInformationEditFormInfo.member_account"></Input>
            </FormItem>
            </Col>
          </Row>

        </Form>
      </Card>

      <!-- 其他信息 -->
      <Card class="margin-top-10">
        <p slot="title">其他信息</p>
        <Row>
          <Col class="margin-bottom-10" span="6">录入人员：{{returnApplyOrderInfo.other_info.apply_man}}</Col>
          <Col class="margin-bottom-10" span="6">录入时间：{{returnApplyOrderInfo.other_info.apply_date}}</Col>
          <Col class="margin-bottom-10" span="6">取消原因：{{returnApplyOrderInfo.other_info.cancel_reason}}</Col>
          <Col class="margin-bottom-10" span="6">取消人员：{{returnApplyOrderInfo.other_info.cancel_man}}</Col>
          <Col class="margin-bottom-10" span="6">取消时间：{{returnApplyOrderInfo.other_info.cancel_date}}</Col>
          <Col class="margin-bottom-10" span="6">审核人员：{{returnApplyOrderInfo.other_info.audit_man}}</Col>
          <Col class="margin-bottom-10" span="6">审核时间：{{returnApplyOrderInfo.other_info.audit_date}}</Col>
        </Row>
      </Card>

      <!-- 退货商品明细 -->
      <Card class="margin-top-10">
        <p slot="title">商品明细</p>
        <!-- 提示 -->
        <Alert class="margin-top-10" show-icon>
          退货商品数量:
          <span style="font-weight:600;color:#348EED;">{{goodsListTotalNum}}</span>
          <span style="margin:0 20px;"></span>
          退货商品总金额:
          <span style="font-weight:600;color:#348EED;">￥{{goodsListTotalAmount}}</span>
        </Alert>
        <Table size="small" :columns="goodsColumns" :data="goodsList"></Table>
      </Card>

      <!-- 支付明细 -->
      <Card class="margin-top-10">
        <p slot="title">支付方式明细</p>
        <!-- 提示 -->
        <Alert class="margin-top-10" show-icon>
          支付方式数量:
          <span style="font-weight:600;color:#348EED;">{{payListTotalNum}}</span>
          <span style="margin:0 20px;"></span>
          总支付金额:
          <span style="font-weight:600;color:#348EED;">￥{{payListTotalAmount}}</span>
        </Alert>
        <Table size="small" :columns="payColumns" :data="payList"></Table>
      </Card>

      <!-- 扣回明细 -->
      <Card class="margin-top-10">
        <p slot="title">扣回明细</p>
        <!-- 提示 -->
        <Alert class="margin-top-10" show-icon>
          扣回项目:
          <span style="font-weight:600;color:#348EED;">{{costDeductionsListTotalNum}}</span>
          <span style="margin:0 20px;"></span>
          应扣回金额:
          <span style="font-weight:600;color:#348EED;">￥{{costDeductionsListTotalAmount}}</span>
          <span style="margin:0 20px;"></span>
          实际扣回金额:
          <span style="font-weight:600;color:#348EED;">￥{{costDeductionsListTotalRealAmount}}</span>
        </Alert>
        <Table size="small" :columns="costDeductionsColumns" :data="costDeductionsList"></Table>
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

    <!-- 审核modal -->
    <Modal title="补偿信息" :value="compensationModal" @on-cancel="hideCompensationModal" @on-ok="ok">
      <Row>
        <Col class="margin-bottom-10" span="8">退货申请单号：T201803080001</Col>
        <Col class="margin-bottom-10" span="8">退货申请时间：2018-03-07 15:38:02</Col>
        <Col class="margin-bottom-10" span="8">退货申请状态：待处理</Col>
        <Col class="margin-bottom-10" span="8">原交易订单单号：T201803080000</Col>
        <Col class="margin-bottom-10" span="8">原交易订单时间：2018-03-06 15:38:02</Col>
        <Col class="margin-bottom-10" span="8">退货申请门店：门店名称</Col>
        <Col class="margin-bottom-10" span="8">退货申请渠道：支付宝</Col>
        <Col class="margin-bottom-10" span="8">退货原因：质量问题</Col>
        <Col class="margin-bottom-10" span="8">退货单单号：T201803080000</Col>
        <Col class="margin-bottom-10" span="8">申请来源：自动生成</Col>
        <Col class="margin-bottom-10" span="8">会员折扣：10.00</Col>
        <Col class="margin-bottom-10" span="8">促销折扣：0.00</Col>
        <Col class="margin-bottom-10" span="8">退货金额：100.00</Col>
        <Col class="margin-bottom-10" span="8">临时折扣：0.00</Col>
      </Row>
    </Modal>

  </div>
</template>

<script>
import OrderReview from "../mixin/orderReview";

export default {
  mixins: [OrderReview],
  data() {
    return {
      // 退货申请单id
      id: "",

      // 退货申请单详情数据模型
      returnApplyOrderInfo: {
        base_info: {
          applysheetno: "", //退货申请单号
          apply_date: "", //退货申请时间
          return_state: "", //退货申请状态
          sale_sheetno: "", //原交易订单单号
          order_sale_date: "", //原交易订单时间
          deal_channel: "", //退货申请渠道
          return_reason: "", //退货原因
          return_no: "", //退货单单号
          apply_source: "", //申请来源
          member_discount: "", //会员折扣
          promotion_discount: "", //促销折扣
          return_amount: "", //退货金额
          temp_discount: "" //临时折扣
        },
        other_info: {
          apply_man: "", // 录入人员
          apply_date: "", // 录入时间
          cancel_reason: "", // 取消原因
          cancel_man: "", // 取消人员
          cancel_date: "", // 取消时间
          audit_man: "", // 审核人员
          audit_date: "" // 审核时间
        }
      },
      // 物流信息编辑表单模型声明
      ShippingInformationEditFormInfo: {
        return_type: "", // 退货方式
        logistics_company_name: "", //物流公司
        custom_name: "", // 退货人姓名
        express_number: "", // 物流单号
        custom_mobile: "", // 联系方式
        member_account: "" // 客户账号
      },

      // 物流信息编辑状态切换
      ShippingInformationEditType: false,

      //  商品明细表列数据声明
      goodsColumns: [
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
          key: "item_over",
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
      // 商品明细表列数据模型
      goodsList: [],
      // 总商品数量
      goodsListTotalNum: 0,
      // 退货商品总金额
      goodsListTotalAmount: 0,

      // 支付方式明细表列数据声明
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
          title: "支付帐号",
          key: "payment_account",
          align: "center"
        }
      ],
      // 支付方式明细表数据模型声明
      payList: [],
      // 支付方式总数量
      payListTotalNum: 0,
      // 总支付金额
      payListTotalAmount: 0,

      // 扣回明细表列数据声明
      costDeductionsColumns: [
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
          key: "c",
          align: "center"
        }
      ],
      // 扣回明细表数据模型声明
      costDeductionsList: [],
      // 扣回明细总数量
      costDeductionsListTotalNum: 0,
      // 应扣回总金额
      costDeductionsListTotalAmount: 0,
      // 实际扣回总金额
      costDeductionsListTotalRealAmount: 0,

      //===================================

      // 审核modal标记
      auditModal: false,
      // 补偿信息modal标记
      compensationModal: false
    };
  },
  methods: {
    // 返回列表
    linkToList() {
      this.$router.push({
        name: "order-return-list",
        params: {}
      });
    },
    // 初始化
    init() {
      // 缺少API获取信息
      this.id = this.$route.params.id;

      // 查询条件整理
      let queryParam = {
        id: this.id //退货申请单id
      };
      console.log("queryParam:", queryParam);

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/242", //请求地址
        method: "get", //请求类型
        data: queryParam //请求参数对象
      }).then(res => {
        if (res) {
          this.returnApplyOrderInfo = res.data;

          // 物流信息form表单数据整理
          this.ShippingInformationEditFormInfo = {
            return_type: res.data.delivery_info.return_type, // 退货方式
            logistics_company_name:
              res.data.delivery_info.logistics_company_name, //物流公司
            custom_name: res.data.delivery_info.custom_name, // 退货人姓名
            express_number: res.data.delivery_info.express_number, // 物流单号
            custom_mobile: res.data.delivery_info.custom_mobile, // 联系方式
            member_account: res.data.base_info.member_account // 客户账号
          };

          // 商品明细处理
          this.goodsList = res.data.prod_detail;
          res.data.prod_detail.map((item, index) => {
            this.goodsListTotalNum =
              this.goodsListTotalNum + parseInt(item.qty);
            this.goodsListTotalAmount =
              this.goodsListTotalAmount + parseFloat(item.return_amount);
          });

          // 支付方式处理
          this.payList = res.data.payment_info;
          this.payListTotalNum = res.data.payment_info.length;
          res.data.payment_info.map((item, index) => {
            this.payListTotalAmount =
              this.payListTotalAmount + parseFloat(item.amount);
          });

          //扣回明细处理
          this.costDeductionsList = res.data.deduct_info;
          this.costDeductionsListTotalNum = res.data.deduct_info.length;
          res.data.deduct_info.map((item, index) => {
            this.costDeductionsListTotalAmount =
              this.costDeductionsListTotalAmount + parseFloat(item.amount);
            this.costDeductionsListTotalRealAmount =
              this.costDeductionsListTotalRealAmount +
              parseFloat(item.real_amount);
          });
        }
      });
    },
    // 修改按钮事件
    btnEditAction() {
      this.ShippingInformationEditType = true;
    },
    // 保存按钮事件
    btnSubmitAction() {
      // 查询条件整理
      let queryParam = {
        id: this.id, //退货申请单id
        delivery_info: this.ShippingInformationEditFormInfo
      };
      console.log("queryParam:", queryParam);
      
      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/246", //请求地址
        method: "get", //请求类型
        data: queryParam //请求参数对象
      }).then(res => {
        if (res) {
          this.ShippingInformationEditType = false;
          this.init();
        }
      });
    },
    // 审核按钮事件
    btnReviewAction() {
      this.selectTableDateList = [
        {
          id: this.id
        }
      ];
      console.log("asdfas123123");
      this.orderReviewModal = true;
    },
    // 取消按钮事件
    btnCancelAction() {
      this.$Modal.confirm({
        title: "操作提示",
        content: "确认要取消该退货申请单吗？",
        onOk: () => {
          // 查询条件整理
          let queryParam = {
            id: this.id //退货申请单id
          };
          console.log("queryParam:", queryParam);
          this.$http({
            url: "https://rap-api.sjhgo.com/app/mock/data/253", //请求地址
            method: "get", //请求类型
            data: queryParam //请求参数对象
          }).then(res => {
            if (res) {
              this.init();
            }
          });
        }
      });
    },
    // --------------------------------------------

    // 审核模态框显示
    showAuditModal() {
      this.auditModal = true;
    },
    // 审核模态框隐藏
    hideAuditModal() {
      this.auditModal = false;
    },

    // 补偿信息模态框显示
    showCompensationModal() {
      this.compensationModal = true;
    },
    // 补偿信息模态框隐藏
    hideCompensationModal() {
      this.compensationModal = false;
    },

    // 打印
    print() {
      window.print();
    },
    linkTo() {
      this.$router.push({
        name: "order-return-list",
        params: {}
      });
    },
    abc() {
      this.mv = true;
    },
    closeBtn() {
      this.$router.push({
        name: "order-return-list",
        params: {}
      });
    },
    ok() {
      this.mv = false;
    },
    cancel() {
      this.mv = false;
    },
    a() {
      // 空方法
    }
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