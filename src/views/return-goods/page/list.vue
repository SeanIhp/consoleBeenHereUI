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
</style>
<template>
  <div class="app-main">
    <Row>
      <Col span="24">
      <Card>
        <!-- 标签切换 -->
        <Tabs type="card" @on-click="handleTabsChange">
          <TabPane label="待收货退货单" name="waitForReturn"></TabPane>
          <TabPane label="退货单查询" name="returnOrder"></TabPane>
        </Tabs>

        <!-- 查询 -->
        <div>
          <Form :label-width="100" ref="formSearch" :rules="ruleValidate" :model="form">
            <Row :gutter="10">
              <Col span="10">
              <FormItem label="退货生成时间" prop="start_date">
                <Row>
                  <Col span="11">
                  <DatePicker v-model="form.start_date" style="width:100%;" type="date" placeholder=""></DatePicker>
                  </Col>
                  <Col span="2" style="text-align: center">-</Col>
                  <Col span="11">
                  <DatePicker v-model="form.end_date" style="width:100%;" type="date" placeholder=""></DatePicker>
                  </Col>
                </Row>
              </FormItem>
              </Col>
              <Col span="8">
              <FormItem label="退货原因" prop="return_reason">
                <Select v-model="form.return_reason">
                  <Option v-for="item in causeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span="10">
              <FormItem label="退货申请单号" prop="applysheetno">
                <Input v-model="form.applysheetno" type="text" placeholder=""></Input>
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
            <p class="action-p margin-top-10">
            </p>
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

  </div>
</template>

<script>
import Util from "@/libs/util";
export default {
  components: {},
  data() {
    return {
      isOrderStatusShow: false, //是否显示查询中单据状态条件
      currentPage: 1, //当前页码
      pageSize: 5, //每页条数
      totalCount: 20, //数据总数
      form: {
        start_date: '', //开始时间
        end_date: '', //截止时间
        return_state: '', //单据状态
        applysheetno: '', //退货申请单号
        return_reason: '', //退货原因
        page_no: '',//页数
        page_size: '',//每页行数
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
      // 退货原因数据列表[待完善：API获取]
      causeList: [
        {
          value: "1",
          label: "质量问题"
        },
        {
          value: "2",
          label: "货品损坏"
        },
        {
          value: "3",
          label: "货品丢失"
        }
      ],
      //单据列表信息
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
          title: "退货单号",
          key: "sheetno",
          align: "center"
        },
        {
          title: "原订单号",
          key: "sale_sheetno",
          align: "center"
        },
        {
          title: "单据状态",
          key: "status",
          align: "center"
        },
        {
          title: "退款单号",
          key: "refund_sheetno",
          align: "center"
        },
        {
          title: "退货人姓名",
          key: "custom_name",
          align: "center"
        },
        {
          title: "联系方式",
          key: "mobile",
          align: "center"
        },
        {
          title: "交易时间",
          key: "deal_date",
          align: "center"
        },
        {
          title: "顾客ID",
          key: "custom_id",
          align: "center"
        },
        {
          title: "退货方式",
          key: "return_state",
          align: "center"
        },
        {
          title: "录入人名",
          key: "creator",
          align: "center"
        },
        {
          title: "录入时间",
          key: "create_time",
          align: "center"
        },
        {
          title: "审核人",
          key: "audit_man",
          align: "center"
        },
        {
          title: "审核时间",
          key: "audit_date",
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
        name: "order-goods-info",
        params: { id }
      });
    },

    //初始化必要数据
    initData() {
      //初始化时获取选择器数据
      // this.getInitList();

    },

    //退货单列表数据
    getList() {

      // 查询参数
      let _dataParam = {

      }

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/264",
        method: "get",
        data: _dataParam
      }).then(res => {

        //查询数据失败
        if (!res) return;

        console.log('res.data >>', res.data);

        //退货单列表
        this.dataList = res.data.saleorderreturn.map((element, index) => {
          // let obj;
          //数据处理

          return element;
        })

      });

    },
    //提交查询
    handleSubmit(name) {
      //校验
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
      if (name == 'returnOrder') {
        //切换到退货单查询
        this.isOrderStatusShow = true;

      } else {
        //待收货退货单
        this.isOrderStatusShow = false;

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

  },
  mounted() {
    //初始化必要数据
    this.initData();
  },
  created() { }
};
</script>
