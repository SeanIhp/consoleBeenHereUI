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
          <TabPane label="可拆分订单">
            <!-- 查询 -->
            <div>
              <Form :label-width="100" ref="formSearch" :rules="ruleValidate" :model="form">
                <Row :gutter="10">
                  <Col span="10">
                  <FormItem label="订单提交时间">
                    <Row>
                      <Col span="11">
                      <FormItem prop="date1">
                        <DatePicker style="width:100%;" type="date" v-model="form.date1" placeholder=""></DatePicker>
                      </FormItem>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                      <FormItem prop="date2">
                        <DatePicker style="width:100%;" type="date" v-model="form.date2" placeholder=""></DatePicker>
                      </FormItem>
                      </Col>
                    </Row>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="订单来源渠道" prop="microapp_name">
                    <Select v-model="form.xxx">
                      <Option value="1">微信商城</Option>
                      <Option value="1">门店POS</Option>
                      <Option value="1">天猫旗舰店</Option>
                    </Select>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10">
                  <FormItem label="订单号" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                  <Col span="8">
                  <FormItem label="母订单号" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>
                </Row>
                <Row>
                  <Col span="10">
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
                <Row>
                  <Col span="10">
                  <FormItem label="联系方式" prop="modules_code">
                    <Input type="text" placeholder=""></Input>
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
      mv: false,
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
                    // console.log('id>> ', id)
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
          key: "subsheetno",
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
          title: "订单总金额",
          key: "ought_pay",
          align: "center"
        },
        {
          title: "客户帐号",
          key: "user_no",
          align: "center"
        },
        {
          title: "联系方式",
          key: "contact_way",
          align: "center"
        },
        {
          title: "自动拆分失败原因",
          key: "auto_audit_deny_reason",
          align: "center"
        }
      ],
      dataList: [],
    };
  },
  computed: {},
  methods: {
    //详情
    linkToInfo(id) {
      this.$router.push({
        name: "order-split-info",
        params: { id }
      });
    },

    //初始化必要数据
    initData() {

    },

    //可拆分订单列表数据
    getList() {

      // 查询参数
      let _dataParam = {

      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/267",
        method: "get",
        data: _dataParam
      }).then(res => {
        //查询数据失败
        if (!res) return;

        console.log('res.data >>', res.data);

        //退款单列表
        this.dataList = res.data.saleorders.map((element, index) => {
          // let obj;
          //数据处理

          return element;
        })
      });

    },
    //提交查询
    handleSubmit(name) {
      // this.$refs[name].validate((valid) => {
      //   if (valid) {
      //     // this.$Message.success('Success!');

      //     //获取数据
      //     this.getList();

      //   } else {
      //     // this.$Message.error('Fail!');
      //   }
      // })
      this.getList();
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
