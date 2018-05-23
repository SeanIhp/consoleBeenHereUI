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
        <Button v-if="searchQueryParams.reviewStatusCode==0" class="handle-btn" type="primary" @click="handleOrderReview">批量审核</Button>
        <Button class="handle-btn" type="primary" @click="handleOrderReview">打印</Button>
        <Button class="handle-btn" type="primary" @click="handleOrderReview">导出</Button>
        <!-- <Button class="handle-btn-right" type="ghost" @click="linkToList">返回</Button> -->
      </Card>

      <Card class="margin-top-10">

        <!-- 订单审核状态tabs切换 -->
        <Tabs type="line" v-model="searchQueryParams.reviewStatusCode" @on-click="reviewStatusTabClick">
          <TabPane name="0" label="待审核订单"></TabPane>
          <TabPane name="1" label="已审核订单"></TabPane>
          <TabPane name="2" label="审核不通过订单"></TabPane>
        </Tabs>

        <!-- 条件查询处理 -->
        <div>
          <Form :label-width="150" ref="searchQueryForm" :model="searchQueryParams">
            <Row :gutter="10">

              <Col span="10">
              <FormItem label="订单提交时间" prop="">
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
              <FormItem label="订单来源渠道" prop="channelCode">
                <Select v-model="searchQueryParams.channelCode">
                  <Option v-for="item in channelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              </Col>

              <Col span="10">
              <FormItem label="母订单编号" prop="motherOrderNo">
                <Input v-model="searchQueryParams.motherOrderNo" type="text" placeholder=""></Input>
              </FormItem>
              </Col>

              <Col span="8" v-if="searchQueryParams.reviewStatusCode==0">
              <FormItem label="自动审核未通过原因" prop="automaticReviewNotThroughCode">
                <Select v-model="searchQueryParams.automaticReviewNotThroughCode">
                  <Option v-for="item in automaticReviewNotThroughList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </FormItem>
              </Col>

              <Col span="4" style="padding-left:20px;">
              <Button type="primary" icon="search" @click="handleSubmit">查询</Button>
              <Button type="ghost" icon="search" @click="handleReset">重置</Button>
              </Col>

            </Row>

            <p style="border-bottom: 1px solid #dddee1;" class="margin-top-10"></p>

          </Form>
        </div>

        <!-- 提示 -->
        <Alert class="margin-top-10" show-icon>共有&nbsp;
          <span style="font-weight:600;">{{totalNum}}</span>
          张订单
        </Alert>

        <!-- 数据表格 -->
        <Table ref="dataTable" class="margin-top-10" highlight-row size="small" :columns="dataTableColumns" :data="orderReviewDataList" @on-selection-change="tableSelectionChange" :loading="reviewOrderLoading"></Table>

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

import ListTabs from "../mixin/list-tabs";
import ListSearch from "../mixin/list-search";
import ListTable from "../mixin/list-table";
import orderReview from "../mixin/orderReview";

export default {
  mixins: [ListTabs, ListSearch, ListTable, orderReview],
  components: {},
  data() {
    return {
      // 数据查询请求参数声明
      searchQueryParams: {
        reviewStatusCode: "0", //订单审核状态
        createStartDate: "", //订单提交开始时间
        createEndDate: "", //订单提交开始时间
        channelCode: "", //渠道编码
        motherOrderNo: "", //母订单号
        automaticReviewNotThroughCode: "", //自动审核未通过原因编码
        pageNo: 1 //分页页码
      },
      // 渠道数据列表[待完善：API获取]
      channelList: [
        {
          value: "1",
          label: "微信商城"
        },
        {
          value: "2",
          label: "门店POS"
        },
        {
          value: "3",
          label: "天猫旗舰店"
        }
      ],
      // 自动审核不通过原因[待完善：API获取]
      automaticReviewNotThroughList: [
        {
          value: "1",
          label: "订单总金额过大"
        },
        {
          value: "2",
          label: "订单优惠金额过大"
        },
        {
          value: "3",
          label: "订单存在客户特殊要求"
        }
      ]
    };
  },
  computed: {
    // 数据表列处理
    dataTableColumns() {
      return this.handleTableColumns();
    }
  },
  methods: {
    // 订单审核操作
    handleOrderReview() {
      // 判断是否选中数据
      if (this.selectTableDateList.length > 0) {
        this.orderReviewModal = true;
        // 订单接通API
      } else {
        this.$Message.error({
          content: "请先选择要审核的订单数据后再执行此操作！"
        });
      }
    },

    // 跳转详情
    linkToInfo(oid) {
      this.$router.push({
        name: "order-review-info",
        params: {
          oid: oid
        }
      });
    }
  },
  mounted() {},
  created() {}
};
</script>
