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
</style>

<template>
    <div class="bgc-F0F0F0">
        <Row>

            <Col span="24">

            <!-- 操作 -->
            <Card>
                <Button class="handle-btn" type="primary" @click="updateGroupAction" :disabled="groupActiondisabledType">修改</Button>
                <Button class="handle-btn" type="primary" @click="submitGroupAction" :disabled="!groupActiondisabledType">保存</Button>
                <Button class="handle-btn" type="primary" @click="createItemAction" :disabled="itemActiondisabledType">新增明细</Button>
                <Button class="handle-btn" type="primary" @click="delItemAction" :disabled="itemActiondisabledType">保存明细</Button>
                <Button class="handle-btn" type="primary" @click="delItemAction" :disabled="itemActiondisabledType">删除明细</Button>
            </Card>

            <Row class="margin-top-10">
                <Col span="12">

                <Card>

                    <p slot="title">字典列表</p>

                    <!-- 提示 -->
                    <Alert class="margin-top-10" show-icon>共有&nbsp;
                        <span style="font-weight:600;">{{groupTotalNum}}</span>
                        条数据字典组
                    </Alert>

                    <!-- 数据表格 -->
                    <Table ref="groupTable" class="margin-top-10" highlight-row size="small" :columns="dataDictionaryGroupTableColumns" :data="dataDictionaryGroupList" @on-row-click="groupTableRowClick"></Table>

                </Card>

                </Col>
                <Col span="12" style="padding-left:10px;" v-show="groupItemShowType">

                <Card>

                    <p slot="title">{{currentGroupName}}明细</p>

                    <!-- 提示 -->
                    <Alert class="margin-top-10" show-icon>共有&nbsp;
                        <span style="font-weight:600;">{{groupItemTotalNum}}</span>
                        条业务参数设置
                    </Alert>

                    <!-- 数据表格 -->
                    <Table ref="groupItemTable" class="margin-top-10" highlight-row size="small" :columns="dataDictionaryGroupItemTableColumns" :data="dataDictionaryGroupItemList"></Table>

                </Card>

                </Col>
            </Row>

            </Col>

        </Row>

    </div>
</template>

<script>
import Util from "@/libs/util";

import DataDictionaryGroup from "./mixin/data-dictionary-group";
import DataDictionaryItem from "./mixin/data-dictionary-item";

export default {
  mixins: [DataDictionaryGroup, DataDictionaryItem],
  data() {
    return {
      groupActiondisabledType: false,
      // 明细操作按钮可用标记
      itemActiondisabledType: true,
      // 总数据字典分组数
      groupTotalNum: 0,
      // 总数据字典分组数明细
      groupItemTotalNum: 0,
      //   字典分组明细显示标记
      groupItemShowType: false,
      //   当前选中字典分组名称
      currentGroupName: ""
    };
  },
  created: function() {},
  mounted: function() {
    this.getDataDictionaryGroupList();
    console.log("localStorage.token:", localStorage.token);

    // this.$http({
    //   url: "/rap2Dev/264", //请求地址
    //   method: "get", //请求类型
    //   data: {} //请求参数对象
    // }).then(res => {
    //   console.log("returnData:", res); //res返回结果
    // });

    this.$http({
      url: "https://rap-api.sjhgo.com/app/mock/data/264", //请求地址
      method: "get", //请求类型
      data: {} //请求参数对象
    }).then(res => {
      console.log("returnData:", res); //res返回结果
    });

  },
  computed: {
    // 数据字典分组表格列获取
    dataDictionaryGroupTableColumns() {
      return this.getDataDictionaryGroupTableColumns();
    },
    // 数据字典分组明细表格列获取
    dataDictionaryGroupItemTableColumns() {
      return this.getDataDictionaryGroupItemTableColumns();
    }
  },
  methods: {
    // 修改事件
    updateGroupAction() {
      this.updateGroupActionType = true;
      this.groupActiondisabledType = true;
    },
    // 保存事件
    submitGroupAction() {
      this.updateGroupActionType = false;
      this.groupActiondisabledType = false;
    },
    // 明细项添加事件
    createItemAction() {},
    // 明细项删除
    delItemAction() {},
    // 字典分组表格行单击事件
    groupTableRowClick(row, index) {
      console.log("row:", row);

      this.groupItemShowType = true;
      this.currentGroupName = row.cnName;
      this.itemActiondisabledType = false;
      this.getDataDictionaryGroupItemList();
    }
  },
  watch: {}
};
</script>

<style>

</style>