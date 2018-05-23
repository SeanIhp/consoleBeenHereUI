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
  <div class="app-main bgc-F0F0F0">
    <Row>
      <Col span="24">
      <!-- 操作 -->
      <Card>
        <Button class="handle-btn" type="primary" @click="orderPrint">打印</Button>
        <Button class="handle-btn" type="primary" @click="orderExport">导出</Button>
      </Card>

      <Card class="margin-top-10">
        <!-- 标签切换 -->
        <Tabs type="card">
          <!-- 未发货订单 -->
          <TabPane label="未发货订单">
            <!-- 查询 -->
            <div>
              <Form :label-width="100" ref="formNotSend">
                <Row :gutter="10">
                  <Col span="8">
                  <FormItem label="母订单编号" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="子订单编号" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="订单来源渠道" prop="microapp_name">
                    <Select>
                      <Option value="1">微信商城</Option>
                      <Option value="1">门店POS</Option>
                      <Option value="1">天猫旗舰店</Option>
                    </Select>
                  </FormItem>
                  </Col>
                </Row>
                <Row :gutter="10">
                  <Col span="8">
                  <FormItem label="客户账号" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="联系方式" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="订单状态" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                </Row>
                <Row :gutter="10">
                  <Col span="8">
                  <FormItem label="支付状态" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="履约状态" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="6" style="padding-left:20px;">
                  <Button type="primary" icon="search" @click="handleSubmitForNotSend('formNotSend')">查询</Button>
                  <Button type="ghost" icon="refresh" @click="handleResetForNotSend('formNotSend')">重置</Button>
                  </Col>
                </Row>
                <p style="border-bottom: 1px solid #dddee1;" class="margin-top-10"></p>
              </Form>
            </div>

            <!-- 提示 -->
            <Alert class="margin-top-10" show-icon>应用总计&nbsp;
              <span style="font-weight:600;">0 条</span>
            </Alert>

            <!-- 数据表格 -->
            <Table ref="dataTable" class="margin-top-10" highlight-row size="small" :columns="dataColumns" :data="dataList"></Table>

            <!-- 分页 -->
            <div class="margin-top-10" style="overflow: hidden">
              <div style="float: right;">
                <Page :total="notSendOrderPage.totalCount" :current="notSendOrderPage.currentPage" :page-size="notSendOrderPage.pageSize" @on-change="changePageForNotSend"></Page>
              </div>
            </div>
          </TabPane>

          <!-- 已取消订单 -->
          <TabPane label="已取消订单">
            <!-- 查询 -->
            <div>
              <Form :label-width="100" ref="formCancel">
                <Row :gutter="10">
                  <Col span="8">
                  <FormItem label="母订单编号" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="子订单编号" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="订单来源渠道" prop="microapp_name">
                    <Select>
                      <Option value="1">微信商城</Option>
                      <Option value="1">门店POS</Option>
                      <Option value="1">天猫旗舰店</Option>
                    </Select>
                  </FormItem>
                  </Col>
                </Row>
                <Row :gutter="10">
                  <Col span="8">
                  <FormItem label="客户账号" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="联系方式" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="8" style="padding-left:20px;">
                  <Button type="primary" icon="search" @click="handleSubmitForCancel('formCancel')">查询</Button>
                  <Button type="ghost" icon="refresh" @click="handleResetForCancel('formCancel')">重置</Button>
                  </Col>
                </Row>
                <p style="border-bottom: 1px solid #dddee1;" class="margin-top-10"></p>
              </Form>
            </div>

            <!-- 提示 -->
            <Alert class="margin-top-10" show-icon>应用总计&nbsp;
              <span style="font-weight:600;">0 条</span>
            </Alert>

            <!-- 数据表格 -->
            <Table ref="dataTable" class="margin-top-10" highlight-row size="small" :columns="dataCancelColumns" :data="dataCancelList"></Table>

            <!-- 分页 -->
            <div class="margin-top-10" style="overflow: hidden">
              <div style="float: right;">
                <Page :total="cancelOrderPage.totalCount" :current="cancelOrderPage.currentPage" :page-size="cancelOrderPage.pageSize" @on-change="changePageForCancel"></Page>
              </div>
            </div>
          </TabPane>
        </Tabs>
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
import Util from "@/libs/util";

export default {
  components: {},
  data() {
    return {
      idForCancel: '',//待取消订单id
      orderCancelModal: false,
      notSendOrderPage: {
        currentPage: 1, //当前页码
        pageSize: 5, //每页条数
        totalCount: 20, //数据总数
      }, //未发货页码
      cancelOrderPage: {
        currentPage: 1, //当前页码
        pageSize: 5, //每页条数
        totalCount: 30, //数据总数
      }, //未发货页码

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
                    // console.log('id>> ', id)
                    this.linkToInfo(id);
                  }
                }
              },
              "详情"
            );
            // 取消
            let editAction = h(
              "Button",
              {
                props: { type: "text", size: "small" },
                style: { marginRight: "5px", color: "#359AFC" },
                on: {
                  click: () => {
                    //参数
                    //测试id 10001
                    let id = params.row.id || 10001;
                    // console.log('id>> ', id)
                    this.cancelOrder(id);
                  }
                }
              },
              "取消"
            );
            // 包裹容器
            let content = h("div", [infoAction, editAction]);
            return content;
          }
        },
        {
          title: "母订单号",
          key: "a",
          align: "center"
        },
        {
          title: "子订单号",
          key: "b",
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
          title: "订单提交时间",
          key: "f",
          align: "center"
        },
        {
          title: "订单来源渠道",
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
        }
      ],
      dataList: [
        {
          a: "DD201803080001",
          b: "DD201803080001-01",
          c: "未发货",
          d: "已支付",
          e: "你猜",
          f: "2018-03-07 15:38:02",
          g: "微信商城",
          h: "99,800.00",
          i: "SHIJI",
          j: "17728596021"
        },
        {
          a: "DD201803080001",
          b: "DD201803080001-01",
          c: "未发货",
          d: "已支付",
          e: "你猜",
          f: "2018-03-07 15:38:02",
          g: "微信商城",
          h: "99,800.00",
          i: "SHIJI",
          j: "17728596021"
        }
      ],
      dataCancelColumns: [
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
                    // console.log('id>> ', id)
                    this.linkToCancelInfo(id);
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
          title: "母订单号",
          key: "a",
          align: "center"
        },
        {
          title: "子订单号",
          key: "b",
          align: "center"
        },
        {
          title: "取消时间",
          key: "c",
          align: "center"
        },
        {
          title: "取消原因",
          key: "d",
          align: "center"
        },
        {
          title: "订单来源渠道",
          key: "e",
          align: "center"
        },
        {
          title: "订单总金额",
          key: "f",
          align: "center"
        },
        {
          title: "客户帐号",
          key: "g",
          align: "center"
        },
        {
          title: "联系方式",
          key: "h",
          align: "center"
        }
      ],
      dataCancelList: [
        {
          a: "DD201803080001",
          b: "DD201803080001-01",
          c: "2018-03-07 15:38:02",
          d: "不想买了",
          e: "微信商城",
          f: "99,800.00",
          g: "SHIJI",
          h: "17728596021"
        },
        {
          a: "DD201803080001",
          b: "DD201803080001-01",
          c: "2018-03-07 15:38:02",
          d: "不想买了",
          e: "微信商城",
          f: "99,800.00",
          g: "SHIJI",
          h: "17728596021"
        }
      ]
    };
  },
  computed: {},
  methods: {
    //未发货订单详情
    linkToInfo(id) {
      this.$router.push({
        name: "order-cancel-info",
        params: { id }
      });
    },

    //已取消订单详情
    linkToCancelInfo(id) {
      this.$router.push({
        name: "order-cancel-infoc",
        params: { id }
      });
    },

    initData() {
      //初始化必要数据

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
    //提交查询
    handleSubmitForNotSend(name) {
      // this.$refs[name].validate((valid) => {
      //   if (valid) {
      //     // this.$Message.success('Success!');

      //     //获取数据
      //     this.getList(obj);

      //   } else {
      //     // this.$Message.error('Fail!');
      //   }
      // })
    },
    //表单重置
    handleResetForNotSend(name) {
      // this.$refs[name].resetFields();
    },
    //提交查询
    handleSubmitForCancel(name) {
      // this.$refs[name].validate((valid) => {
      //   if (valid) {
      //     // this.$Message.success('Success!');

      //     //获取数据
      //     this.getList(obj);

      //   } else {
      //     // this.$Message.error('Fail!');
      //   }
      // })
    },
    //表单重置
    handleResetForCancel(name) {
      // this.$refs[name].resetFields();
    },

    //未发货分页事件
    changePageForNotSend(num) {
      this.notSendOrderPage.currentPage = num;
      console.log('currentPage: ', this.notSendOrderPage.currentPage);
      //更新数据

      //查询参数
      let obj = {

      };
      this.getList(obj);
    },

    //已取消分页事件
    changePageForCancel(num) {
      this.notSendOrderPage.currentPage = num;
      console.log('currentPage: ', this.notSendOrderPage.currentPage);
      //更新数据
      //查询参数
      let obj = {

      };
      this.getList(obj);
    },

    //打印
    orderPrint() {
      console.log('打印');
    },

    //导出
    orderExport() {
      console.log('导出');
    },

    //订单取消接口
    getListCancelOrder(obj) {

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


          //刷新列表
          this.getList();


        } else {
          this.$Message.error("获取数据失败");
          // this.$Message.error(res.data.errMsg);
        }
      });

    },

    //取消订单modal
    cancelOrder(id) {
      this.orderCancelModal = true;
      //注意idForCancel可能是多个id拼接的字符串
      this.idForCancel = id;
    },
    modalOk() {
      this.orderCancelModal = false;
      //api订单取消操作
      this.getListCancelOrder(this.idForCancel);

    },
    modalCancel() {
      this.orderCancelModal = false;
    },


  },
  mounted() {
    //初始化必要数据
    this.initData();
  },
  created() { }
};
</script>
