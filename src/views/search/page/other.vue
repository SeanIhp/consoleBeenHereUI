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

.clearfix::after {
  content: " ";
  display: block;
  clear: both;
}
</style>

<template>
  <div class="app-main bgc-F0F0F0">
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
        <Table ref="dataTable" class="margin-top-10" highlight-row size="small" :columns="dataColumns" :data="dataList"></Table>

        <!-- 分页 -->
        <div class="margin-top-10" style="overflow: hidden">
          <div style="float: right;">
            <Page :total="totalCount" :current="currentPage" :page-size="pageSize" @on-change="changePage"></Page>
          </div>
        </div>
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
      id: '', //单据id
      currentPage: 1, //当前页码
      pageSize: 5, //每页条数
      totalCount: 20, //数据总数
      dataColumns: [
        {
          type: "selection",
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
                    //参数
                    //测试id 10001
                    let id = params.row.id || 10001;
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
          key: "a",
          align: "center"
        },
        {
          title: "母订单号",
          key: "a",
          align: "center"
        },
        {
          title: "订单创建时间",
          key: "b",
          align: "center"
        },
        {
          title: "订单类型",
          key: "",
          align: "center"
        },
        {
          title: "订单状态",
          key: "c",
          align: "center"
        },
        {
          title: "支付状态",
          key: "d",
          align: "center"
        },
        {
          title: "履约状态",
          key: "e",
          align: "center"
        },
        {
          title: "订单来源渠道",
          key: "f",
          align: "center"
        },
        {
          title: "交易门店",
          key: "g",
          align: "center"
        },
        {
          title: "订单总金额",
          key: "h",
          align: "center"
        },
        {
          title: "客户帐号",
          key: "i",
          align: "center"
        },
        {
          title: "联系方式",
          key: "j",
          align: "center"
        },
        {
          title: "会员CID",
          key: "",
          align: "center"
        },
        {
          title: "退货原单号",
          key: "",
          align: "center"
        }
      ],
      dataList: [
        {
          a: "DD201803080001",
          b: "2018-03-07 15:38:02",
          c: "未发货",
          d: "已支付",
          e: "你猜",
          f: "微信商城",
          g: "A门店",
          h: "99,800.00",
          i: "SHIJI",
          j: "17728596021"
        },
        {
          a: "DD201803080001",
          b: "2018-03-07 15:38:02",
          c: "未发货",
          d: "已支付",
          e: "你猜",
          f: "微信商城",
          g: "A门店",
          h: "99,800.00",
          i: "SHIJI",
          j: "17728596021"
        }
      ],
    };
  },
  methods: {
    //返回
    linkToInfo() {
      this.$router.push({
        name: "order-search-info",
        params: {}
      });
    },

    //详情
    linkToInfoN(id){
      this.$router.push({
        name: "order-search-info",
        params: {id}
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

      // 查询参数-查询条件、页码等
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