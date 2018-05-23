
/** 
 * 数据字典设置-字典分组明细相关模型事件
*/
import Util from "@/libs/util";

export default {
    data() {
        return {
            // 数据字典分组明细数据模型
            dataDictionaryGroupItemList: [],
        };
    },
    methods: {

        /**
         * 获取字典数据明细表格列获取
         * 
         */
        getDataDictionaryGroupItemTableColumns() {


            // 编辑输入框
            const CellInput = (vm, h, param) => {
                return h("Input", {
                    props: {
                        type: "text",
                        value: vm.dataDictionaryGroupItemList[param.index][param.column.key]
                    },
                    on: {
                        "on-blur"(event) {
                            vm.$set(
                                vm.dataDictionaryGroupItemList[param.index],
                                param.column.key,
                                event.target.value
                            );
                        }
                    }
                });
            };

            // 排序列操作
            const CellSorting = (vm, h, param) => {

                // 上移动
                let upBtn = h(
                    "Button",
                    {
                        props: { type: "text", size: "small", icon: "arrow-up-a" },
                        style: { fontSize: "18px" },
                        on: {
                            click: () => {
                                // 缺少获取当前行订单编号
                                // this.linkToInfo();
                            }
                        }
                    }
                );

                // 下移动
                let downBtn = h(
                    "Button",
                    {
                        props: { type: "text", size: "small", icon: "arrow-down-a" },
                        style: { fontSize: "18px" },
                        on: {
                            click: () => {
                                // 缺少获取当前行订单编号
                                // this.linkToInfo();
                            }
                        }
                    }
                );

                // 置顶
                let topBtn = h(
                    "Button",
                    {
                        props: { type: "text", size: "small", icon: "chevron-up" },
                        style: { fontSize: "18px" },
                        on: {
                            click: () => {
                                // 缺少获取当前行订单编号
                                // this.linkToInfo();
                            }
                        }
                    }
                );

                // 置底
                let bottomBtn = h(
                    "Button",
                    {
                        props: { type: "text", size: "small", icon: "chevron-down" },
                        style: { fontSize: "18px" },
                        on: {
                            click: () => {
                                // 缺少获取当前行订单编号
                                // this.linkToInfo();
                            }
                        }
                    }
                );

                // return h("div", {
                //     domProps: {
                //         innerHTML: 'baz'
                //     }
                // }, [upBtn, downBtn, topBtn, bottomBtn]);

                return h("div", [upBtn, downBtn, topBtn, bottomBtn]);
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
                    align: "center",
                    width: 150,
                    render: (h, params) => {
                        return CellInput(this, h, params);
                    }
                },
                {
                    key: "cnName",
                    title: "中文名称",
                    align: "center",
                    width: 150,
                    render: (h, params) => {
                        return CellInput(this, h, params);
                    }
                },
                {
                    key: "usName",
                    title: "英文名称",
                    align: "center",
                    width: 150,
                    render: (h, params) => {
                        return CellInput(this, h, params);
                    }
                },
                {
                    key: "value",
                    title: "值",
                    align: "center",
                    width: 150,
                    render: (h, params) => {
                        return CellInput(this, h, params);
                    }
                },
                {
                    key: "state",
                    title: "状态",
                    align: "center",
                    width: 150,
                    render: (h, params) => {
                        return CellInput(this, h, params);
                    }
                },
                {
                    key: "isOrNoAutoSystemDefault",
                    title: '是否系统默认',
                    align: "center",
                    width: 150,
                    render: (h, params) => {
                        return CellInput(this, h, params);
                    }
                },
                {
                    key: "action",
                    title: '排序',
                    align: "center",
                    width: 200,
                    render: (h, params) => {
                        return CellSorting(this, h, params);
                    }
                }
            ];
            return _columns;
        },

        /**
         * 获取数据字典分组明细列表数据 [带接通API]
         * 
         */
        getDataDictionaryGroupItemList(groupCode) {
            let _dataList = [
                {
                    code: "BCLX",
                    cnName: "补偿类型",
                    usName: "BCYY",
                    value: "",
                    state: "Y",
                    isOrNoAutoSystemDefault: "Y",
                }
            ];
            this.dataDictionaryGroupItemList = _dataList;
        },

    },
    filters: {}
};
