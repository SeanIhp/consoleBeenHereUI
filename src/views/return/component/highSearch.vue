<style scoped>

</style>

<template>
    <div>
        <Row>

            <Col :span="16">
            <Table ref="highSearchTable" highlight-row size="small" :columns="dataColumns" :data="dataList | formatItemFields" @on-selection-change="tableSelChange"></Table>
            </Col>

            <Col :span="4" style="padding-left:10px;">
            <Button icon="search" class="handle-btn" type="primary" @click="addTableItem">新建</Button>
            <Button icon="search" class="handle-btn" type="primary" @click="subSearch">查询</Button>
            <Button icon="search" class="handle-btn" @click="clearTableItem">重置</Button>
            </Col>

        </Row>
    </div>
</template>

<script>
// 查询值
const valueCellInput = (vm, h, param) => {
  return h("Input", {
    props: {
      type: "text",
      value: vm.dataList[param.index][param.column.key]
    },
    on: {
      "on-blur"(event) {
        vm.$set(vm.dataList[param.index], param.column.key, event.target.value);
        console.log("vm.dataList:", vm.dataList);
      }
    }
  });
};

// 查询关系选择reader
const relationCellSelect = (vm, h, param) => {
  return h(
    "Select",
    {
      props: {
        value: vm.dataList[param.index][param.column.key],
        transfer: true
      },
      on: {
        "on-change": event => {
          //   this.data[params.index].volumeType = event;
          vm.$set(vm.dataList[param.index], param.column.key, event);
          console.log("vm.dataList:", vm.dataList);
        }
      }
    },
    vm.sqlRelation.map(function(item) {
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

// 查询条件选择reader
const conditionCellSelect = (vm, h, param) => {
  return h(
    "Select",
    {
      props: {
        value: vm.dataList[param.index][param.column.key],
        transfer: true
      },
      on: {
        "on-change": event => {
          //   this.data[params.index].volumeType = event;
          vm.$set(vm.dataList[param.index], param.column.key, event);
          console.log("vm.dataList:", vm.dataList);
        }
      }
    },
    vm.sqlCondition.map(function(item) {
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

// 查询字段选择reader
const fieldsCellSelect = (vm, h, param) => {
  return h(
    "Select",
    {
      props: {
        value: vm.dataList[param.index][param.column.key],
        transfer: true
      },
      on: {
        "on-change": event => {
          //   this.data[params.index].volumeType = event;
          vm.$set(vm.dataList[param.index], param.column.key, event);
          console.log("vm.dataList:", vm.dataList);
        }
      }
    },
    vm.fields.map(function(item) {
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
      // 高级查询表格列声明
      dataColumns: [
        {
          type: "selection",
          width: "80",
          align: "center"
        },
        {
          title: "关系",
          key: "relation",
          align: "center",
          render: (h, params) => {
            return relationCellSelect(this, h, params);
          }
        },
        {
          title: "字段名称",
          key: "field",
          align: "center",
          render: (h, params) => {
            return fieldsCellSelect(this, h, params);
          }
        },
        {
          title: "条件",
          key: "condition",
          align: "center",
          render: (h, params) => {
            return conditionCellSelect(this, h, params);
          }
        },
        {
          title: "值",
          key: "value",
          align: "center",
          render: (h, params) => {
            return valueCellInput(this, h, params);
          }
        }
      ],
      //   高级查询数据集合
      dataList: [
        {
          _disabled: true,
          _checked: true,
          relation: "",
          field: "",
          condition: "",
          value: ""
        }
      ],
      //   sql字段查询关系
      sqlRelation: [
        {
          label: "与",
          value: "and"
        },
        {
          label: "或",
          value: "or"
        }
      ],
      // sql查询条件
      sqlCondition: [
        {
          label: "等于",
          value: "="
        },
        {
          label: "大于",
          value: ">"
        },
        {
          label: "大于等于",
          value: ">="
        },
        {
          label: "小于",
          value: "<"
        },
        {
          label: "小于等于",
          value: "<="
        },
        {
          label: "不等于",
          value: "!="
        },
        {
          label: "包含",
          value: "like"
        }
      ],
      //   查询结果
      returnDataList: []
    };
  },
  props: {
    //   字段数组集合
    fields: {
      type: Array,
      required: true
    }
  },
  methods: {
    // 表格选择事件
    tableSelChange(selection) {
      this.dataList.map((item, index) => {
        item._checked = false;
        selection.map((titem, tindex) => {
          if (index == titem.sub) {
            this.dataList[titem.sub]._checked = true;
          }
        });
      });
    },
    // 添加查询条件
    addTableItem() {
      // 添加条件判断
      let sub = this.dataList.length - 1;
      let item = this.dataList[sub];

      if (item.relation == "") {
        this.$Message.info({
          content: "请选择条件关系"
        });
        return;
      }
      if (item.field == "") {
        this.$Message.info({
          content: "请选择查询字段"
        });
        return;
      }
      if (item.condition == "") {
        this.$Message.info({
          content: "请选择查询条件"
        });
        return;
      }

      this.dataList.push({
        _disabled: false,
        _checked: true,
        relation: "",
        field: "",
        condition: "",
        value: ""
      });
    },
    // 清空查询条件
    clearTableItem() {
      this.dataList = [
        {
          _disabled: true,
          _checked: true,
          relation: "",
          field: "",
          condition: "",
          value: ""
        }
      ];
      //   启动父级组件事件
      this.$emit("on-high-search-reset");
    },
    // 查询提交
    subSearch() {
      this.returnDataList = [];
      console.log("this.dataList:", this.dataList);
      this.dataList.map((item, index) => {
        console.log("item.value" + item.value, item._checked);
        if (
          item.relation != "" &&
          item.field != "" &&
          item.condition != "" &&
          item._checked == true
        ) {
          this.returnDataList.push({
            relation: item.relation,
            field: item.field,
            condition: item.condition,
            value: item.value
          });
        }
      });

      //   启动父级组件事件
      this.$emit("on-high-search-submit", this.returnDataList);
      console.log("asdf", this.returnDataList);
    }
  },
  filters: {
    //   利用过滤机制，将数组下标赋值给数组项
    formatItemFields: function(value) {
      let _ls = [];
      value.map((item, index) => {
        let _ls_item = item;
        _ls_item.sub = index;
        _ls.push(_ls_item);
      });
      return _ls;
    }
  },
  mounted: function() {},
  created: function() {}
};
</script>

<style>

</style>
