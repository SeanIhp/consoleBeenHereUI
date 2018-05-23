<style scoped>
.margin-top-10 {
  margin-top: 10px;
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
        <Button class="handle-btn-right" type="ghost" @click="linkToInfo">返回</Button>
        <div style="clear:both;"></div>
      </Card>

      <Card class="margin-top-10">
        <p slot="title">订单列表</p>
        <!-- 数据表格 -->
        <Table ref="dataTable" class="margin-top-10" highlight-row size="small" :columns="otherOrderColumns" :data="otherOrderList"></Table>

        <!-- 分页 -->
        <div class="margin-top-10" style="overflow: hidden">
          <div style="float: right;">
            <Page :total="totalCount" :current="currentPage" :page-size="pageSize" @on-change="changePage"></Page>
          </div>
        </div>
      </Card>
      </Col>

    </Row>

  </div>
</template>

<script>
export default {
  data() {
    return {
      id: '', //单据id
      currentPage: 1, //当前页码
      pageSize: 5, //每页条数
      totalCount: 20, //数据总数

      //其它相关订单列表
      otherOrderColumns: [
        {
          title: "行号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 150,
          render: (h, params) => {
            let infoAction = h(
              "Button",
              {
                props: { type: "text", size: "small" },
                style: { marginRight: "5px", color: "#359AFC" },
                on: {
                  click: () => {
                    // 单据id
                    let id = params.row.id || 20002;
                    this.linkToInfoN(id);
                  }
                }
              },
              "详情"
            );
            // 包裹容器
            let content = h("div", [infoAction]);
            return content;
          }
        },
        {
          title: "订单号",
          key: "oid",
          align: "center"
        },
        {
          title: "母订单号",
          key: "idsheetno",
          align: "center"
        },
        {
          title: "订单提交时间",
          key: "create_date",
          align: "center"
        },
        {
          title: "订单来源渠道",
          key: "channel",
          align: "center"
        },
        {
          title: "成交门店",
          key: "sale_market",
          align: "center"
        },
        {
          title: "订单总金额",
          key: "fact_pay",
          align: "center"
        },
        {
          title: "客户帐号",
          key: "user_id",
          align: "center"
        },
        {
          title: "联系方式",
          key: "contact_way",
          align: "center"
        }
      ],
      // 其它相关订单列表
      otherOrderList: [],

    };
  },
  methods: {
    // 单据详情
    // 传递两个id    
    linkToInfoN(id) {
      let _id = this.id;
      this.$router.push({
        name: "order-split-infon",
        params: { id, _id }
      });
    },

    //返回
    linkToInfo() {
      let id = this.id;
      this.$router.push({
        name: "order-split-info",
        params: { id }
      });
    },

    initData() {
      //初始化必要数据

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
        idsheetno: '',//母订单号
        page_no: '',//起始页
        page_size: '',//每页条数
      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/175",
        method: "get",
        data: _dataParam
      }).then(res => {
        //查询数据失败
        if (!res) return;

        console.log('res.data >>', res.data);

        //退款单列表
        this.otherOrderList = res.data.saleorders.map((element, index) => {
          // let obj;
          //数据处理

          return element;
        })
      });

    },
    //分页事件
    changePage(num) {
      this.currentPage = num;
      console.log('currentPage: ', this.currentPage);
      //更新数据
      this.getList();
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