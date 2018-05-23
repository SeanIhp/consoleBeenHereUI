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
</style>
<template>
  <div>
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">订单操作</p>
        <Steps :current="current">
          <Step title="拆分订单" content=""></Step>
          <Step title="修改履约地点" content=""></Step>
        </Steps>

        <!-- 数据表格 -->
        <Card class="margin-top-10" v-show="current == 0">
          <p slot="title">请选择需要拆单的商品:</p>
          <Table ref="dataTable" class="margin-top-10" highlight-row size="small" :columns="prodDetailColumns" :data="prodDetailList" @on-selection-change="handleSectionChange"></Table>
          <p slot="extra">
            操作：
            <Button type="ghost" @click="stockModalList">查看商品库存</Button>
            <Button type="ghost" @click="linkToSplit(2)">选择履约地点</Button>
            <Button type="primary" @click="linkToInfo">取消</Button>
          </p>
        </Card>

        <!-- 数据表格 -->
        <Card class="margin-top-10" v-show="current == 1">
          <p slot="title">请选择订单的履约地点:</p>
          <Form :label-width="80">
            <FormItem label="履约地点：">
              <Select>
                <Option value="1">门店1</Option>
                <Option value="2">门店1</Option>
                <Option value="3">仓库1</Option>
                <Option value="4">仓库2</Option>
              </Select>
            </FormItem>
          </Form>
          <Table size="small" :columns="forNewOrderColumns" :data="forNewOrderList"></Table>
          <p slot="extra">
            操作：
            <Button type="ghost" @click="linkToSplit(1)">上一步</Button>
            <Button type="ghost" @click="linkToNewInfo">生成新订单</Button>
            <Button type="primary" @click="linkToInfo">取消</Button>
          </p>
        </Card>
      </Card>
      </Col>
    </Row>

    <!-- 商品履约地点查询-->
    <Modal title="商品库存列表" :value="stockModal" @on-cancel="stockModalCancel" @on-ok="stockModalOk">
      <Table size="small" :columns="stockColumns" :data="stockList"></Table>
    </Modal>

  </div>
</template>
<script>
import Util from "@/libs/util";
export default {
  components: {},
  data() {
    return {
      id: '', //单据id
      current: 1,
      stockModal: false, //库存列表modal
      selectTableDataList: [], // 已经选中表格项数据集合 -- 待拆分商品
      //待拆分商品明细信息
      prodDetailColumns: [
        {
          type: "selection",
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
      //待拆分商品明细信息
      prodDetailList: [],
      //待生成新订单商品
      forNewOrderColumns: [
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
      //待生成新订单商品
      forNewOrderList: [],
      //库存信息
      stockColumns: [
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
          key: "sku_property",
          align: "center"
        },
        {
          title: "库存地点",
          key: "market",
          align: "center"
        },
        {
          title: "可售库存数量",
          key: "qty",
          align: "center"
        }
      ],
      //库存信息
      stockList: [],
    };
  },
  computed: {},
  methods: {
    //取消拆分
    linkToInfo() {
      let id = this.id;
      this.$router.push({
        name: "order-split-info",
        params: { id }
      });
    },

    //生成新订单
    linkToNewInfo() {
      // 修改履约地点前校验 ， 并生成新订单
      this.checkForEditLogisticsStore();
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

        //生成新订单
        this.createNewOrder();

      });

    },

    //生成新订单
    createNewOrder() {
      console.log('修改履约地点 >>');

      // 查询参数
      let _dataParam = {
        oid: '',//原订单id
        item_codes: '',//需要拆掉的商品编码集合
        logistics_store: '',//履约地点
      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/259",
        method: "get",
        data: _dataParam
      }).then(res => {
        //查询数据失败
        if (!res) return;

        console.log('res.data >>', res.data);

        //新订单生成成功，跳转到新订单详情页
        this.$router.push({
          name: "order-split-infon",
          params: {}
        });

      });

    },

    // step操作 -- 选择履约地及拆分订单步骤
    linkToSplit(v) {
      //判断来源 -- 订单操作中选择履约地点
      console.log('v--> ', v)
      console.log(123, this.selectTableDataList.length)

      if (this.selectTableDataList.length > 0) {
        // 判断是否选中数据
        this.current = v - 1;

        //上一步中选中待拆分的商品数组 
        this.forNewOrderList = this.selectTableDataList;
        
      } else {
        this.$Message.error({
          content: "请先选择要拆分的商品"
        });
        // console.log('是否选中数据： ', this.selectTableDataList.length)
      }

    },

    initData() {
      //初始化必要数据
      this.getRouterParams();
      //接口获取商品信息数据
      this.getList();

    },

    //接口获取商品信息数据
    getList() {

      // 查询参数
      let _dataParam = {

      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/174",
        method: "get",
        data: _dataParam
      }).then(res => {
        //查询数据失败
        if (!res) return;

        console.log('res.data >>', res.data);
        //商品明细
        this.prodDetailList = res.data.saleorderdetail.map((element, index) => {
          // let obj;
          //数据处理

          return element;
        })

      });

    },

    // abc() {
    //   this.mv = true;
    // },
    // ok() {
    //   this.mv = false;
    // },
    // cancel() {
    //   this.mv = false;
    // },

    getRouterParams() {
      //获取路由参数，定位step操作
      // let v = this.$route.params.v;
      let { v, id } = this.$route.params;
      this.current = v ? parseInt(v) - 1 : 0;
      this.id = id;
      console.log('v-id: ', v, id);
    },

    //获取库存
    getStockList() {

      // 查询参数
      // item_code 商品编码集合
      let item_code = '';
      let _dataParam = {
        item_code: item_code,
      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/257",
        method: "get",
        data: _dataParam
      }).then(res => {

        //查询数据失败
        if (!res) return;

        console.log('res.data >>', res.data);

        //退货单列表
        this.stockList = res.data.itemstock.map((element, index) => {
          // let obj;
          //数据处理

          return element;
        })
      })
    },

    //商品列表选择
    handleSectionChange(selection) {
      this.selectTableDataList = selection;
      console.log('this.selectTableDataList-->', this.selectTableDataList);
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

  },
  mounted() {
    //初始化数据
    this.initData();

  },
  created() { },
  watch: {
    $route: function () {
      this.getRouterParams();
    }
  }
};
</script>