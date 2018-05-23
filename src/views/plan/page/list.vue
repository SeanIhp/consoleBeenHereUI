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
</style>
<template>
    <div class="app-main bgc-F0F0F0">
        <Row>
            <Col span="24">
              <!-- 操作 -->
              <Card>
                <Button class="handle-btn" type="primary" @click="linkTo('')">新增</Button>
                <Button class="handle-btn" type="ghost">打印</Button>
                <Button class="handle-btn" type="ghost">导出</Button>
              </Card>

              <Card class="margin-top-10">
                <!-- 标签切换 -->
                <Tabs type="line">
                    <TabPane label="门店补偿计划列表">
                      <!-- 查询 -->
                      <Card>
                          <p slot="title">查询功能</p>
                          <Form :label-width="100" ref="searchQueryForm" :model="searchQueryParams">
                              <Row :gutter="10">
                                  
                                  <Col span="8">
                                    <FormItem label="年份" prop="year">
                                        <Select v-model="searchQueryParams.plan_year">
                                            <Option v-for="item in yearlist" :key="item.value" :value="item.value">{{item.label}}</Option>
                                        </Select>
                                    </FormItem>
                                  </Col>
                                  <Col span="8">
                                    <FormItem label="门店" prop="shop">
                                        <Select v-model="searchQueryParams.sale_market">
                                            <Option v-for="item in shoplist" :key="item.value" :value="item.value">{{item.label}}</Option>
                                        </Select>
                                    </FormItem>
                                  </Col>

                                  <Col span="8" style="padding-left:20px;">
                                    <Button type="primary" icon="search" @click="handleSubmit">查询</Button>
                                  </Col>
                              </Row>
                          </Form>
                      </Card>

                      <!-- 提示 -->
                      <Alert class="margin-top-10" show-icon>应用总计&nbsp;
                          <span style="font-weight:600;">{{listNum}} 条</span>
                      </Alert>

                      <!-- 数据表格 -->
                      <Table ref="dataTable" class="margin-top-10" highlight-row size="small" :loading="loading" :columns="dataColumns" :data="dataList"></Table>

                      <!-- 分页 -->
                      <div class="margin-top-10" style="overflow: hidden">
                          <div style="float: right;">
                              <Page :total="listNum" :current="searchQueryParams.page_no" :page-size="pageSize" @on-change="tablePageChange"></Page>
                          </div>
                      </div>
                    </TabPane>
                </Tabs>

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
      mv: false,
      listNum: 0, //列表数量
      loading: false, //表单列表loading状态
      dataColumns: [
        {
          type: "index",
          title: "行号",
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
                    this.linkTo(params.row.plancode);
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
          title: "计划编号",
          key: "plancode",
          align: "center"
        },
        {
          title: "计划状态",
          key: "planstatus",
          align: "center"
        },
        {
          title: "年份",
          key: "year",
          align: "center"
        },
        {
          title: "门店",
          key: "shop",
          align: "center"
        },
        {
          title: "编制人",
          key: "compactor",
          align: "center"
        },
        {
          title: "编制时间",
          key: "compilationDate",
          align: "center"
        },
        {
          title: "审核人",
          key: "auditor",
          align: "center"
        },
        {
          title: "审核时间",
          key: "auditorDate",
          align: "center"
        }
      ],
      dataList: [
      ],
      searchQueryParams: {
        'plan_year': '',
        'sale_market': '',
        'page_no': 1,
        'page_size': 50 
      },
      // 每页显示条数
      pageSize: 100,
      // 年份下拉数据[待完善：API获取]
      yearlist: [],
      // 门店下拉数据[待完善：API获取]
      shoplist: [
        {
          value: '1',
          label: '门店A'
        },
        {
          value: '2',
          label: '门店B'
        },
        {
          value: '3',
          label: '门店C'
        }]
    };
  },
  computed: {
    /**
     * 门店数据获取查询 [带接通API]
     * 
     */
    getShopDataList() {
        let _dataList = [
          {
            plancode: "1002019001",
            planstatus: "待审核",
            year: "2018",
            shop: "门店A",
            compactor: "小姐姐",
            compilationDate: "2018-03-26 02:34:00",
            auditor: "小哥哥",
            auditorDate: "2018-03-27 02:34:00"
          },
          {
            plancode: "1002019002",
            planstatus: "已审核",
            year: "2018",
            shop: "门店A",
            compactor: "小姐姐",
            compilationDate: "2018-03-26 02:34:00",
            auditor: "小哥哥",
            auditorDate: "2018-03-27 02:34:00"
          },
        ];
        console.log("获取门店初始数据",_dataList);
        return _dataList;
    },
  },
  methods: {
    /**
     * 初始化年份字段
     */
    resetYear() {
      let date = new Date().getFullYear();
      let month = (new Date().getMonth())+1;
      let day = new Date().getDate();
      let update = 0;
      let downdate =0;
      update = downdate = date;
      //设置年份
      this.yearlist = [];
      this.searchQueryParams.plan_year = date.toString();
      for(let j = 0; j < 7; j++) {
        if(j < 4) {
          this.yearlist.push({
            'value': update.toString(),
            'label': update.toString() 
          });
          update++;
        }else {
          downdate--;
          this.yearlist.push({
            'value': downdate.toString(),
            'label': downdate.toString() 
          });
        }
      }
    },
    /**
     * 重置
     * 
     */
    handleReset() {
        this.$refs.searchQueryForm.resetFields();
        this.searchQueryParams.sale_market = '';
        console.log("重置触发:", this.searchQueryParams);
    },

    /**
     * 查询
     * 
     */
    handleSubmit() {
        if(!this.searchQueryParams.plan_year) {
          this.$Message.error('请选择年份');
          return;
        }
        // if(this.searchQueryParams.sale_market.length == 0) {
        //   this.$Message.error('请选择门店');
        //   return;
        // }
        let queryParam = this.searchQueryParams;
        let that = this;
        this.loading = true;
        queryParam.fields = 'id,com_status,plan_year,sale_market,auditor,audit_time,create_date,creator,ent_id';
        this.$http({
            url: "https://rap-api.sjhgo.com/app/mock/data/239", //请求地址
            method: "get", //请求类型
            data: queryParam //请求参数对象
        }).then(res => {
            if (res) {
              let _dataList = [];
              res.data.compensationplan.map((item, index)=> {
                item.plancode = item.id;
                //item.planstatus = item.com_status;
                item.year = item.plan_year;
                item.shop = item.sale_market;
                item.compactor = item.creator;
                item.compilationDate = item.create_date;
                item.auditorDate = item.audit_time;
                switch(item.com_status) {
                  case '0':  
                      item.planstatus = '待审核';
                      break;
                  case '1':  
                      item.planstatus = '审核通过';
                      break;
                  case '2':  
                      item.planstatus = '审核未通过';
                      break;
                }
                _dataList.push(item);
              });
              that.dataList = _dataList;
              that.listNum = res.data.total_results;
              that.loading = false;
            }
        })

        console.log("搜索查询触发:", this.searchQueryParams);
    },
    /**
     * 列表分页查询
     * 
     * @param {any} page 切换目标页码
     */
    tablePageChange(page) {
        this.searchQueryParams.page_no = page;
        this.handleSubmit();
    },
    linkTo(value) {
      console.log("id",value);
      this.$router.push({
        name: "compensate-plan-detail",
        params: {
          id: value
        }
      });
    }
  },
  mounted() {},
  created() {
    this.resetYear();
  }
};
</script>
