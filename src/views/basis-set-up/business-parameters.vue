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
                <Button class="handle-btn" type="primary" @click="updateAction">修改</Button>
                <Button class="handle-btn" type="primary" @click="submitAction">保存</Button>
            </Card>

            <Card class="margin-top-10">

                <!-- 提示 -->
                <Alert class="margin-top-10" show-icon>共有&nbsp;
                    <span style="font-weight:600;">{{totalNum}}</span>
                    条业务参数设置
                </Alert>

                <!-- 数据表格 -->
                <Table ref="dataTable" class="margin-top-10" highlight-row size="small" :columns="dataTableColumns" :data="dataTableDataList"></Table>

            </Card>

            </Col>

        </Row>

    </div>
</template>

<script>
import Util from "@/libs/util";

// 参数值编辑输入框
const ParamCellInput = (vm, h, param) => {
  return h("Input", {
    props: {
      type: "text",
      value: vm.dataTableDataList[param.index][param.column.key]
    },
    on: {
      "on-blur"(event) {
        vm.$set(
          vm.dataTableDataList[param.index],
          param.column.key,
          event.target.value
        );
        console.log("vm.dataTableDataList:", vm.dataTableDataList);
      }
    }
  });
};

export default {
  data() {
    return {
      // 修改操作标记
      updateActionType: false,
      // 业务参数设置总数
      totalNum: 0,
      //   表格数据列模型
      dataTableColumns: [
        {
          type: "index",
          width: 60,
          align: "center",
          title: "序号"
        },
        {
          title: "代码",
          key: "code",
          align: "center"
        },
        {
          title: "参数类型",
          key: "type",
          align: "center"
        },
        {
          title: "描述",
          key: "info",
          align: "center"
        },
        {
          title: "参数值",
          key: "param",
          align: "center",
          render: (h, params) => {
            if (this.updateActionType) {
              return ParamCellInput(this, h, params);
            } else {
              return h("span", {}, params.row.param);
            }
          }
        },
        {
          title: "备注",
          key: "remark",
          align: "center"
        }
      ],
      //   表格数据模型
      dataTableDataList: [
        {
          code: "XSSX",
          type: "销售订单",
          info: "线上订单付款超时时限",
          param: "30",
          remark: "单位“分钟”"
        }
      ]
    };
  },
  created: function() {},
  mounted: function() {},
  computed: {},
  methods: {
    // 修改事件
    updateAction() {
      this.updateActionType = true;
    },
    // 保存事件
    submitAction() {
      this.updateActionType = false;
      console.log("this.dataTableDataList:", this.dataTableDataList);
    }
  },
  watch: {}
};
</script>

<style>

</style>