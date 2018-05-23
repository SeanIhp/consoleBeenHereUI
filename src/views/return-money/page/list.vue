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
      <Card v-if="isReturnMoneyBtnShow">
        <Button class="handle-btn" type="primary" @click="returnMoney">批量退款</Button>
        <div style="clear:both;"></div>
      </Card>

      <Card class="margin-top-10">
        <!-- 标签切换 -->
        <Tabs type="card" @on-click="handleTabsChange">
          <TabPane label="未退款订单" name="notReturnOrder"></TabPane>
          <TabPane label="所有订单" name="allOrder"></TabPane>
        </Tabs>

        <!-- 查询 -->
        <div>
          <Form :label-width="100" ref="formSearch" :rules="ruleValidate" :model="form">
            <Row :gutter="10">
              <Col span="10">
              <FormItem label="退款申请单单号" prop="applysheetno">
                <Input v-model="form.applysheetno" type="text" placeholder=""></Input>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="账户类型" prop="payment_type">
                <Select v-model="form.payment_type">
                  <Option v-for="item in paymentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
              <FormItem label="退款账户" prop="return_count">
                <Input v-model="form.return_count" type="text" placeholder=""></Input>
              </FormItem>
              </Col>
              <Col span="8" v-if="isOrderStatusShow">
              <FormItem label="单据状态" prop="return_state">
                <Select v-model="form.return_state">
                  <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
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

    <Modal title="退款操作" :value="mv" @on-cancel="cancel" @on-ok="ok">
      <Form :label-width="80">
        <FormItem label="操作选项：">
          <RadioGroup>
            <Radio label="male">通过</Radio>
            <Radio label="female">不通过</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="否决原因：">
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
      mv: false,
      isOrderStatusShow: false, //是否显示查询中单据状态条件
      isReturnMoneyBtnShow: false, //是否显示顶部批量退款按钮
      currentPage: 1, //当前页码
      pageSize: 5, //每页条数
      totalCount: 20, //数据总数
      form: {
        applysheetno: '', //退款申请单单号
        payment_type: '', //账户类型
        return_count: '', //退款账户
        return_state: '', //单据状态
        // page_no: '', //
        // page_size: '', //
        // order_field: '', //排序字段（可选
        // order_direction: '', //排序方式（可选）
        // fields: '', //输出参数（可选）
      },
      ruleValidate: {
        xxx: [
          { required: true, message: 'The name cannot be empty', trigger: 'change' }
        ],
      },
      // 单据状态数据列表[待完善：API获取]
      statusList: [
        {
          value: "1",
          label: "已审核"
        },
        {
          value: "2",
          label: "申请中"
        },
        {
          value: "3",
          label: "已取消"
        }
      ],
      // 账户类型数据列表[待完善：API获取]
      paymentList: [
        {
          value: "1",
          label: "支付宝"
        },
        {
          value: "2",
          label: "借记卡"
        }
      ],
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
          title: "退货申请单单号",
          key: "apply_sheetno",
          align: "center"
        },
        {
          title: "退款单单号",
          key: "refund_sheetno",
          align: "center"
        },
        {
          title: "单据状态",
          key: "refund_state",
          align: "center"
        },
        {
          title: "退款金额",
          key: "refund_value",
          align: "center"
        },
        {
          title: "退款账户",
          key: "refund_account",
          align: "center"
        },
        {
          title: "账户类型",
          key: "payment_type",
          align: "center"
        },
        {
          title: "付款人员",
          key: "payment_man",
          align: "center"
        },
        {
          title: "付款时间",
          key: "payment_time",
          align: "center"
        },
        {
          title: "审核人员",
          key: "g",
          align: "center"
        },
        {
          title: "审核时间",
          key: "h",
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
        name: "order-money-info",
        params: { id }
      });
    },

    //初始化必要数据
    initData() {
      //初始化时获取选择器数据
      // this.getInitList();

    },

    //接口获取数据
    getList() {

      // 查询参数
      let _dataParam = {

      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/268",
        method: "get",
        data: _dataParam
      }).then(res => {

        //查询数据失败
        if (!res) return;

        console.log('res.data >>', res.data);

        //退款单列表
        this.dataList = res.data.saleorderrefund.map((element, index) => {
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

    //Tabs切换
    handleTabsChange(name) {
      console.log('name >>', name);
      if (name == 'allOrder') {
        //切换到所有定单查询
        this.isOrderStatusShow = true;
        this.isReturnMoneyBtnShow = false;

      } else {
        //未退款订单
        this.isOrderStatusShow = false;
        this.isReturnMoneyBtnShow = true;

      }
    },


    //初始化时获取选择器数据
    getInitList() {

      this.$http({
        url: "example",
        method: "get",
      }).then(res => {

        //查询数据失败
        if (!res) return;

        console.log('res.data >>', res.data);

        this.statusList = res.data.XXXX.map((element, index) => {
          // let obj;
          //数据处理
          return element;
        })

        // this.causeList

      });

    },


    // //打印
    // orderPrint() {
    //   console.log('打印');
    // },

    // //导出
    // orderExport() {
    //   console.log('导出');
    // },

    returnMoney() {
      this.mv = true;
    },
    ok() {
      this.mv = false;
    },
    cancel() {
      this.mv = false;
    }
  },
  mounted() {
    //初始化必要数据
    this.initData();
  },
  created() { }
};
</script>
