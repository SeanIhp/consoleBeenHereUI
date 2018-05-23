<style>
.v-table-title-cell {
  font-size: 12px;
  font-weight: bold;
  background: #f8f8f9 !important;
}
.v-table-body-cell {
  font-size: 12px;
}
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
.v-table-loading-content{
    position: absolute;
    top: 50% !important;
    left: 50%;
    -webkit-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
}
.ivu-spin-dot {
  position: relative;
  display: inline-block;
  border-radius: 50%;
  background-color: #2d8cf0;
  width: 32px;
  height: 32px;
  -webkit-animation: ani-spin-bounce 1s 0s ease-in-out infinite;
  animation: ani-spin-bounce 1s 0s ease-in-out infinite;
}
@-webkit-keyframes ani-spin-bounce{
  0%{-webkit-transform:scale(0);transform:scale(0)}
  to{-webkit-transform:scale(1);transform:scale(1);opacity:0}
}
@keyframes ani-spin-bounce{
  0%{-webkit-transform:scale(0);transform:scale(0)}
  to{-webkit-transform:scale(1);transform:scale(1);opacity:0}
}
</style>
<template>
    <div class="app-main">
        <Row>
            <Col span="24">
              <Card>
                <!-- 标签切换 -->
                <Tabs type="line">
                    <TabPane label="补偿计划执行分析表">
                      <!-- 查询 -->
                      <Card>
                          <p slot="title">查询功能</p>
                          <Form :label-width="100" ref="formSearch" :model="searchQueryParams">
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
                                        <Select v-model="searchQueryParams.sale_market" multiple>
                                            <Option v-for="item in shoplist" :key="item.value" :value="item.value">{{item.label}}</Option>
                                        </Select>
                                    </FormItem>
                                  </Col>

                                  <Col span="8" style="padding-left:20px;">
                                    <Button type="primary" icon="search" @click="handleSubmit(searchQueryParams)">查询</Button>
                                  </Col>
                              </Row>
                          </Form>
                      </Card>

                      <!-- 提示 -->
                      <Alert class="margin-top-10" show-icon>应用总计&nbsp;
                          <span style="font-weight:600;">0 条</span>
                      </Alert>

                      <!-- 数据表格 -->
                      <v-table
                              is-vertical-resize
                              :vertical-resize-offset='100'
                              is-horizontal-resize
                              style="width:100%"
                              :is-loading="isLoading"
                              :loading-content="loadingContent"
                              :multiple-sort="false"
                              :min-height="400"
                              :title-rows="dataRows"
                              :columns="dataColumns"
                              :table-data="dataTableDataList"
                              row-hover-color="#ebf7ff"
                              row-click-color="#ebf7ff"></v-table>

                      <!-- 分页 -->
                      <div class="margin-top-10" style="overflow: hidden">
                          <div style="float: right;">
                              <Page :total="1" :current="1" :page-size="1"></Page>
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
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'
export default {
  components: {VTable,VPagination},
  data() {
    return {
      mv: false,
      isLoading: false, ////表单列表loading状态
      loadingContent:'<span class="ivu-spin-dot"></span>',
      paramKey: ['planmoney','actualmoney','percent'],
      paramName: ['计划补偿金额','实际补偿金额','占比'],
      hookTypeArr: ['plan_cash','plan_stored_value','plan_electronic_coupons','plan_integral','real_cash','real_stored_value','real_electronic_coupons','real_integral','rate_cash','rate_stored_value','rate_electronic_coupons','rate_integral'],
      hookDateArr: ['this_month','this_year','january','february','march','aril','may','june','july','august','september','october','november','december'],
      dataColumns: [
        {
          field: 'custome', 
          width: 100, 
          columnAlign: 'center', 
          isFrozen: true,
          formatter: function (rowData, index) {
              return index + 1
          }
        },
        { 
          field: 'type', 
          width: 100, 
          columnAlign: 'center', 
          isFrozen: true,
        }
      ],
      dataRows: [
        [
          {fields: ['custome'], title: '行号', titleAlign: 'center', rowspan: 2},
          {fields: ['type'], title: '补偿类型', titleAlign: 'center', rowspan: 2},
        ],
        [
        ],
      ],
      searchQueryParams: {
        'plan_year': '',
        'sale_market': []
      },
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
        }],
      dataTableDataList: []
    };
  },
  computed: {
  },
  methods: {
    linkTo() {
      this.$router.push({
        name: "compensate-plan-list",
        params: {}
      });
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
        if(this.searchQueryParams.sale_market.length == 0) {
          this.$Message.error('请选择门店');
          return;
        }
        // 初始化分页页码
        //this.searchQueryParams.pageNo = 1;
        console.log("搜索查询触发:", this.searchQueryParams);
        this.getData();
    },
    /**
     * 重置
     * 
     */
    handleReset() {
        this.$refs.formSearch.resetFields();
        this.searchQueryParams.sale_market = [];
        console.log("重置触发:", this.searchQueryParams);
    },
    /**
     * 获取数据
     */
    getData() {
      let type = ["现金","储值金额","电子券","积分"];
      let typeKey = ['cash','stored_value','electronic_coupons','integral'];
      let queryParam = this.searchQueryParams;
      let that = this;
      this.isLoading = true;
      this.$http({
          url: "https://rap-api.sjhgo.com/app/mock/data/240", //请求地址
          method: "get", //请求类型
          data: queryParam //请求参数对象
      }).then(res => {
          if (res) {
              // 刷新当前列表
              console.log("res:", res);
              // 初始化
              let value = res.data.value;
              let dataList = [];
              for(let i = 0; i < 4; i++) {
                let obj = {};
                for(let j = 1; j < 43; j++) {
                  if(j % 3 == 1) {
                    let num = Math.floor(j/3);
                    obj[this.paramKey[0]+(num+1)] = value[this.hookDateArr[num]]['plan_'+typeKey[i]];
                  }else if(j % 3 == 2) {
                    let num = Math.floor(j/3);
                    obj[this.paramKey[1]+(num+1)] = value[this.hookDateArr[num]]['real_'+typeKey[i]];
                  }else if(j % 3 == 0) {
                    let num = Math.floor(j/3);
                    obj[this.paramKey[2]+num] = (value[this.hookDateArr[num-1]]['rate_'+typeKey[i]])*100+'%';
                  }
                }
                obj.type = type[i];
                dataList.push(obj);
              }
              that.dataTableDataList = dataList;
              setTimeout(function() {
                that.isLoading = false;
              },300);
          }
      });
    },
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
     * 重置表格中的表头字段
     */
    resetTableHead() {
      let rows = this.dataRows;
      let paramKey = this.paramKey;
      let paramName = this.paramName;

      rows.forEach((item,index) => {
        if(index == 0) {
          for(let m = 0; m < 14; m++) {
            let obj = {
              fields: [], 
              title: '', 
              titleAlign: 'center', 
              colspan: 3
            }
            if( m == 0) {
              obj.title = "当前";
            }else if(m == 1){
              obj.title = "年度";
            }else {
              obj.title = (m-1)+"月";
            }
            for(let n = 0; n < 3; n++) {
              let key = "";
              key = paramKey[n]+(m+1);
              obj.fields.push(key);
            }
            item.push(obj);
          }
        }else if(index == 1) {
          for(let m = 0; m < 14; m++) {
            for(let n = 0; n < 3; n++) {
              let key = "";
              let title = ""
              let obj = {
                fields: [], 
                title: '', 
                titleAlign: 'center'
              };

              key = paramKey[n]+(m+1);
              obj.fields.push(key);
              obj.title = paramName[n];
              item.push(obj);
            }
          }
        }
      });

      //添加表头字段名
      for(let i = 0; i < 14; i++) {
        for(let j = 0; j < 3; j++) {
          let obj = {
            field: '', 
            width: 100, 
            columnAlign: 'center',
          };
          obj.field = paramKey[j]+(i+1);
          this.dataColumns.push(obj);
        }
      }
    }
  },
  mounted() {
  },
  created() {
    this.resetTableHead();
    this.resetYear();
  }
};
</script>
