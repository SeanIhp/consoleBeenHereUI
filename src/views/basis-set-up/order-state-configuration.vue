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
                <Button class="handle-btn" type="primary" @click="updateAction" :disabled="updateActionType">修改</Button>
                <Button class="handle-btn" type="primary" @click="submitAction" :disabled="!updateActionType">保存</Button>
            </Card>

            <Card class="margin-top-10">

                <!-- 提示 -->
                <Alert class="margin-top-10" show-icon>共有&nbsp;
                    <span style="font-weight:600;">{{totalNum}}</span>
                    条订单名称配置
                </Alert>

                <!-- 数据表格 -->
                <Table ref="dataTable" class="margin-top-10" highlight-row size="small" :columns="dataTableColumns" :data="dataTableDataList" :loading="tableLoading"></Table>

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

// 参数值编辑选择框
const statusCellSelect = (vm, h, param) => {
  // 状态（0-禁用/1-启用）
  let _optionList = [
    {
      value: "0",
      label: "禁用"
    },
    {
      value: "1",
      label: "启用"
    }
  ];
  return h(
    "Select",
    {
      props: {
        value: vm.dataTableDataList[param.index][param.column.key],
        transfer: true
      },
      on: {
        "on-change": event => {
          vm.$set(vm.dataTableDataList[param.index], param.column.key, event);
          console.log("vm.dataTableDataList:", vm.dataTableDataList);
        }
      }
    },
    _optionList.map(function(item) {
      return h(
        "Option",
        {
          props: { value: item.value }
        },
        item.label
      );
    })
  );
};

export default {
  data() {
    return {
      // 表格lo
      tableLoading: false,
      // 修改操作标记
      updateActionType: false,
      // 总数
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
          title: "订单状态代码",
          key: "code",
          align: "center"
        },
        {
          title: "订单状态名称",
          key: "name",
          align: "center"
        },
        {
          title: "终端显示名称",
          key: "show_name",
          align: "center",
          render: (h, params) => {
            if (this.updateActionType) {
              return ParamCellInput(this, h, params);
            } else {
              return h("span", {}, params.row.show_name);
            }
          }
        },
        {
          title: "是否启用",
          key: "status",
          align: "center",
          render: (h, params) => {
            if (this.updateActionType) {
              return statusCellSelect(this, h, params);
            } else {
              return h("span", {}, params.row.status == "0" ? "禁用" : "启用");
            }
          }
        }
      ],
      //   表格数据模型
      dataTableDataList: []
    };
  },
  created: function() {},
  mounted: function() {
    this.init();
  },
  activated: function() {
    this.init();
  },
  computed: {},
  methods: {
    // 修改事件
    updateAction() {
      this.updateActionType = true;
    },
    // 保存事件
    submitAction() {
      this.updateActionType = false;
      this.init();
      console.log("this.dataTableDataList:", this.dataTableDataList);
    },
    // 初始化事件
    init() {
      this.tableLoading = true;
      // 查询条件整理
      let queryParam = {
        order_field: "create_date", // 排序字段
        order_direction: "desc", // 排序顺序
        page_no: 1,
        page_size: 10000
      };
      console.log("queryParam:", queryParam);

      this.$http({
        url: "https://rap-api.sjhgo.com/app/mock/data/279", //请求地址
        method: "get", //请求类型
        data: queryParam //请求参数对象
      }).then(res => {
        if (res) {
          this.dataTableDataList = res.data.orderstatusconfig;
          this.totalNum = res.data.total_results;
          this.tableLoading = false;
        }
      });
    }
  },
  watch: {}
};
</script>

<style>

</style>