
/** 
 * 数据字典设置-字典分组相关模型事件
*/
import Util from "@/libs/util";

export default {
    data() {
        return {
            // 数据字典分组数据模型
            dataDictionaryGroupList: [],
            // 数据字典分组修改操作标记
            updateGroupActionType: false,
        };
    },
    methods: {

        /**
         * 获取订单审核列数据信息
         * 
         */
        getDataDictionaryGroupTableColumns() {


            // 编辑输入框
            const CellInput = (vm, h, param) => {
                return h("Input", {
                    props: {
                        type: "text",
                        value: vm.dataDictionaryGroupList[param.index][param.column.key]
                    },
                    on: {
                        "on-blur"(event) {
                            vm.$set(
                                vm.dataDictionaryGroupList[param.index],
                                param.column.key,
                                event.target.value
                            );
                            console.log("vm.dataDictionaryGroupList:", vm.dataDictionaryGroupList);
                        }
                    }
                });
            };


            let _columns = [
                {
                    type: "index",
                    width: 60,
                    align: "center",
                    title: "序号"
                },
                {
                    key: "code",
                    title: "代码",
                    align: "center"
                },
                {
                    key: "group",
                    title: "字典分组",
                    align: "center"
                },
                {
                    key: "cnName",
                    title: "中文名称",
                    align: "center"
                },
                {
                    key: "usName",
                    title: "英文名称",
                    align: "center"
                },
                {
                    key: "state",
                    title: "状态",
                    align: "center",
                    render: (h, params) => {
                        if (this.updateGroupActionType) {
                            return CellInput(this, h, params);
                        } else {
                            return h("span", {}, params.row.state);
                        }
                    }
                },
                {
                    key: "codeLength",
                    title: "代码长度",
                    align: "center",
                    render: (h, params) => {
                        if (this.updateGroupActionType) {
                            return CellInput(this, h, params);
                        } else {
                            return h("span", {}, params.row.state);
                        }
                    }
                },
                {
                    key: "isOrNoAutoCoding",
                    title: '是否自动编码',
                    align: "center",
                    render: (h, params) => {
                        if (this.updateGroupActionType) {
                            return CellInput(this, h, params);
                        } else {
                            return h("span", {}, params.row.state);
                        }
                    }
                },
                {
                    key: "isOrNoAutoSystem",
                    title: '是否系统级',
                    align: "center",
                    render: (h, params) => {
                        if (this.updateGroupActionType) {
                            return CellInput(this, h, params);
                        } else {
                            return h("span", {}, params.row.state);
                        }
                    }
                }
            ];
            return _columns;
        },

        /**
         * 获取数据字典分组列表数据 [带接通API]
         * 
         */
        getDataDictionaryGroupList() {
            let _dataList = [
                {
                    code: "BCLX",
                    group: "退货字典",
                    cnName: "补偿类型",
                    usName: "BCYY",
                    state: "Y",
                    codeLength: "13",
                    isOrNoAutoCoding: "Y",
                    isOrNoAutoSystem: "Y",
                }
            ];
            this.dataDictionaryGroupList = _dataList;
        },

    },
    filters: {}
};
