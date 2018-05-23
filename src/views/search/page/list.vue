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
  <div class="app-main bgc-F0F0F0">
    <Row>
      <Col span="24">
      <!-- 操作 -->
      <Card>
        <Button class="handle-btn" type="primary" @click="">打印</Button>
        <Button class="handle-btn" type="primary" @click="">导出</Button>
        <!-- <Button class="handle-btn-right" type="ghost" @click="linkToList">返回</Button> -->
      </Card>

      <Card class="margin-top-10">
        <!-- 标签切换 -->
        <Tabs type="card">
          <!-- 销售订单 -->
          <TabPane label="销售订单">
            <!-- 查询 -->
            <div>
              <Form :label-width="100" ref="formSearch" :rules="ruleValidate" :model="form">
                <Row :gutter="10">
                  <Col span="10">
                  <FormItem label="订单创建时间" prop="microapp_code">
                    <Row>
                      <Col span="11">
                      <DatePicker style="width:100%;" type="date" placeholder=""></DatePicker>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                      <DatePicker style="width:100%;" type="date" placeholder=""></DatePicker>
                      </Col>
                    </Row>
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
                  <FormItem label="订单号" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="母订单号" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="交易门店" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                </Row>
                <Row :gutter="10">
                  <Col span="8">
                  <FormItem label="订单状态" prop="modules_code">
                    <Select>
                      <Option value="1">待审核</Option>
                      <Option value="1">已审核</Option>
                      <Option value="1">已完成</Option>
                    </Select>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="支付状态" prop="modules_code">
                    <Select>
                      <Option value="1">已支付</Option>
                      <Option value="1">未支付</Option>
                    </Select>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="履约状态" prop="modules_code">
                    <Select>
                      <Option value="1">备货中</Option>
                      <Option value="1">缺货</Option>
                      <Option value="1">已发货</Option>
                    </Select>
                  </FormItem>
                  </Col>
                </Row>
                <Row :gutter="10">
                  <Col span="8">
                  <FormItem label="会员账号类型" prop="microapp_name">
                    <Select v-model="form.xxx">
                      <Option value="1">会员账户</Option>
                      <Option value="1">卡号</Option>
                      <Option value="1">手机号</Option>
                      <Option value="1">邮箱</Option>
                      <Option value="1">QQ</Option>
                      <Option value="1">微信号</Option>
                      <Option value="1">磁道</Option>
                      <Option value="1">二维码</Option>
                    </Select>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="会员账号" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                </Row>
                <Row :gutter="10">
                  <Col span="10">
                  <FormItem label="订单金额区间" prop="microapp_code">
                    <Row>
                      <Col span="11">
                      <InputNumber style="width:100%;" :min="1"></InputNumber>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                      <InputNumber style="width:100%;" :min="1"></InputNumber>
                      </Col>
                    </Row>
                  </FormItem>
                  </Col>
                  <Col span="6" style="padding-left:20px;">
                  <Button type="primary" icon="search" @click="handleSubmit('formSearch')">查询</Button>
                  <Button type="ghost" icon="refresh" @click="handleReset('formSearch')">重置</Button>
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
                <Page :total="totalCount" :current="currentPage" :page-size="pageSize" @on-change="changePage"></Page>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Card>
      </Col>
    </Row>

  </div>
</template>

<script>
import Util from "@/libs/util";
export default {
  components: {},
  data() {
    return {
      currentPage: 1, //当前页码
      pageSize: 5, //每页条数
      totalCount: 20, //数据总数
      form: {
        xxx: '',
      },
      ruleValidate: {
        xxx: [
          { required: true, message: 'The name cannot be empty', trigger: 'change' }
        ],
      },
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
                    this.linkToInfo(id);
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
  computed: {},
  methods: {
    //跳转到详情
    linkToInfo(id) {
      this.$router.push({
        name: "order-search-info",
        params: { id }
      });
    },
    //初始化必要数据
    initData() {

    },

    //接口获取数据
    getList() {

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
    handleSubmit(name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          // this.$Message.success('Success!');

          //获取数据
          this.getList();

        } else {
          // this.$Message.error('Fail!');
        }
      })
    },
    //表单重置
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    //分页事件
    changePage(num) {
      this.currentPage = num;
      console.log('currentPage: ', this.currentPage);
      //更新数据
      this.getList();
    },

    //打印
    orderPrint() {
      console.log('打印');
    },

    //导出
    orderExport() {
      console.log('导出');
    },
  },
  mounted() {
    //初始化必要数据
    this.initData();
  },
  created() { }
};
</script>
