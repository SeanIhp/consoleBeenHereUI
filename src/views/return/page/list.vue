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
.focused {
  border-color: #348eed;
  color: #348eed;
}
.reset-btn {
  margin-left: 20px;
  margin-right: 20px;
}
</style>
<template>
  <div class="app-main bgc-F0F0F0">
    <Row>
      <Col span="24">

      <!-- 操作 -->
      <Card v-if="searchQueryParams.handleStatusCode==0">
        <Button class="handle-btn" type="primary" @click="handleOrderReview">批量审核</Button>
        <Button class="handle-btn" type="primary" @click="toReturnRequest">退货申请</Button>
        <Button class="handle-btn" type="ghost">打印</Button>
        <Button class="handle-btn" type="ghost">导出</Button>
      </Card>

      <Card :class="{'margin-top-10':searchQueryParams.handleStatusCode==0}">
        <!-- <p slot="title">应用列表</p> -->

        <!-- 退货申请单状态tabs切换 -->
        <Tabs type="line" v-model="searchQueryParams.handleStatusCode" @on-click="returnRequestTabClick">
          <TabPane name="0" label="待处理退货申请"></TabPane>
          <TabPane name="1" label="已处理退货申请"></TabPane>
        </Tabs>

        <!-- 查询块 -->
        <Card>
          <p slot="title">查询功能</p>

          <!-- 查询 -->
          <div v-show="searchPanelShowType">

            <!-- 基础查询 -->
            <div v-show="searchType==0">
              <Form :label-width="150" ref="searchQueryForm" :model="searchQueryParams">
                <Row :gutter="10">

                  <Col span="10">
                  <FormItem label="退货申请提交时间" prop="">
                    <Row>
                      <Col span="11">
                      <FormItem prop="createStartDate">
                        <DatePicker :value="searchQueryParams.createStartDate" @on-change="createStartDateChange" style="width:100%;" type="date" placeholder=""></DatePicker>
                      </FormItem>
                      </Col>
                      <Col span="2" style="text-align: center">-</Col>
                      <Col span="11">
                      <FormItem prop="createEndDate">
                        <DatePicker :value="searchQueryParams.createEndDate" @on-change="createEndDateChange" style="width:100%;" type="date" placeholder=""></DatePicker>
                      </FormItem>
                      </Col>
                    </Row>
                  </FormItem>
                  </Col>

                  <Col span="8">
                  <FormItem label="退货申请状态" prop="statusCode">
                    <Select v-model="searchQueryParams.statusCode">
                      <Option v-for="item in statusList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                  </Col>

                  <Col span="10">
                  <FormItem label="退货申请单号" prop="returnRequestNo">
                    <Input v-model="searchQueryParams.returnRequestNo" type="text" placeholder=""></Input>
                  </FormItem>
                  </Col>

                  <Col span="8">
                  <FormItem label="退货原因" prop="causeCode">
                    <Select v-model="searchQueryParams.causeCode">
                      <Option v-for="item in causeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                  </FormItem>
                  </Col>

                  <Col span="4" style="padding-left:20px;">
                  <Button type="primary" icon="search" @click="handleSubmit">查询</Button>
                  <Button type="ghost" icon="search" @click="handleReset">重置</Button>
                  </Col>

                </Row>
              </Form>
            </div>

            <!-- 高级查询 -->
            <div v-show="searchType==1">
              <Row :gutter="10">
                <Col span="24">
                <!-- 高级查询组件 start -->
                <!-- :fields 查询列数据集合，格式[{value:'',label:''}],注解:value对应字段查询名称，label字段显示名称 -->
                <!-- @on-high-search-reset 重置按钮点击事件 -->
                <!-- @on-high-search-submit 查询按钮点击事件 返回合法的数据集合,如果用户操作不合法则返回空数组，params:[{}] -->
                <!-- @on-high-search-submit 返回结果: [{relation:"and",field:"orderNo",condition:"=",value:"22"}] -->
                <!-- @on-high-search-submit 返回结果字段说明 relation:查询关系，field：查询字段列明，condition：查询条件，value：查询内容 -->
                <high-search :fields="highSearchFieldsList" @on-high-search-reset="onHighSearchReset" @on-high-search-submit="onHighSearchSubmit"></high-search>
                <!-- 高级查询组件 end -->
                </Col>
              </Row>
            </div>

          </div>

          <p slot="extra">
            <ButtonGroup>
              <Button :class="{focused:searchType==0}" type="ghost" @click="basicsSearch">基础查询</Button>
              <Button :class="{focused:searchType==1}" type="ghost" style="margin-left:0px;" @click="highSearch">高级查询</Button>
            </ButtonGroup>

            <Button class="reset-btn" v-show="searchPanelShowType" @click="changeSearchPanelShowType" type="ghost">收起
              <Icon type="chevron-up"></Icon>
            </Button>
            <Button class="reset-btn" v-show="!searchPanelShowType" @click="changeSearchPanelShowType" type="ghost">展开
              <Icon type="chevron-down"></Icon>
            </Button>
          </p>
        </Card>

        <!-- 提示 -->
        <Alert class="margin-top-10" show-icon>共有
          <span style="font-weight:600;">{{totalNum}}</span> 张退货申请单
        </Alert>

        <!-- <div @contextmenu.prevent="bbb">asdfasdfasdf</div> -->
        <!-- 数据表格 -->
        <Table ref="dataTable" class="margin-top-10" highlight-row size="small" :columns="dataTableColumns" :data="dataTableDataList" @on-selection-change="tableSelectionChange" :loading="returnApplyOrder"></Table>

        <!-- 分页 -->
        <div class="margin-top-10" style="overflow: hidden">
          <div style="float: right;">
            <Page :total="totalNum" :current="current" :page-size="pageSize" @on-change="tablePageChange"></Page>
          </div>
        </div>

      </Card>
      </Col>
    </Row>

    <Modal title="审核操作" :value="orderReviewModal" @on-cancel="orderReviewModalCancel" @on-ok="orderReviewModalOk">
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

  </div>
</template>

<script>
import Util from "@/libs/util";

import highSearch from "../component/highSearch";

import ListTabs from "../mixin/list-tabs";
import ListSearch from "../mixin/list-search";
import ListTable from "../mixin/list-table";
import OrderReview from "../mixin/orderReview";

export default {
  mixins: [ListTabs, ListSearch, ListTable, OrderReview],
  // mixins: [ListTabs, ListSearch, ListTable],
  components: { highSearch },
  data() {
    return {
      // 查询面板显示隐藏
      searchPanelShowType: true,
      // 查询类型
      searchType: 0, //退货申请单查询切换标记：0基础查询，1高级查询
      // 数据查询请求参数声明
      searchQueryParams: {
        handleStatusCode: "0", //退货申请单处理状态
        createStartDate: "", //退货申请单提交开始时间
        createEndDate: "", //退货申请单提交结束时间
        statusCode: "", //退货申请单状态
        returnRequestNo: "", // 退货申请单号
        causeCode: "", //退货原因
        pageNo: 1 //分页页码
      },
      // 退货申请单状态数据列表[待完善：API获取]
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
      // 退货申请单状态数据列表[待完善：API获取]
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
      // 高级查询字段数据集合
      highSearchFieldsList: [
        {
          value: "orderNo",
          label: "订单号"
        }
      ],
      // 查询结果总条数
      totalNum: 0,
      // 分页当前页码
      current: 1,
      // 每页显示条数
      pageSize: 100
    };
  },
  computed: {
    // 数据表列处理
    dataTableColumns() {
      return this.handleTableColumns();
    }
    // 数据表内容数据获取
    // dataTableDataList() {
    //   return this.getOrderDataList();
    // }
  },
  methods: {
    // 跳转退货申请
    toReturnRequest() {
      this.$router.push({
        name: "order-return-apply",
        params: {}
      });
    },
    // 跳转详情
    linkToInfo(id) {
      this.$router.push({
        name: "order-return-info",
        params: {
          id: id
        }
      });
    },
    // 显示隐藏查询面板操作
    changeSearchPanelShowType() {
      this.searchPanelShowType = !this.searchPanelShowType;
    }
  },
  mounted() {},
  created() {}
};
</script>
