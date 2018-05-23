<style scoped>
.bgc-F0F0F0 {
  background-color: #f0f0f0;
}
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
.ivu-date-picker {
  display: block;
}
</style>
<style>
.v-table-title-cell {
  font-size: 12px;
  font-weight: bold;
  height: 32px !important;
  background: #f8f8f9 !important;
}
</style>

<template>
    <div class="bgc-F0F0F0">
        <Row>
            <Col span="24">
              <Card>
                <Button type="primary" @click="save(formItem)" :disabled="isSave">保存</Button>
                <Button type="primary" @click="saveAndClose(formItem)" :disabled="isSave">保存&amp;关闭</Button>
                <Button type="primary" @click="closeBtn">关闭</Button>
                <Button type="primary" @click="auditForm" :disabled="isAudit">审核</Button>
              </Card>
              <Card class="margin-top-10">
                  <p slot="title">基本信息</p>
                  <Row>
                      <Form :label-width="100" ref="formSearch" :model="formItem">
                        <Col class="margin-bottom-10" span="8">
                          <FormItem label="计划年份" prop="microapp_year">
                            <Select v-model="formItem.plan_year" :disabled="isDisable">
                                <Option v-for="item in yearlist" :key="item.value" :value="item.value">{{item.label}}</Option>
                            </Select>
                          </FormItem>
                        </Col>
                        <Col class="margin-bottom-10" span="8">
                          
                          <FormItem label="门店" prop="microapp_shop">
                              <Select v-model="formItem.sale_market"  :disabled="isDisable">
                                  <Option v-for="item in shoplist" :key="item.value" :value="item.value">{{item.label}}</Option>
                              </Select>
                          </FormItem>
                        </Col>
                        <Col class="margin-bottom-10" span="8">
                          <FormItem label="计划状态" prop="microapp_status">
                            <Select v-model="com_status" :disabled="true">
                                <Option value="-1">新单</Option>
                                <Option value="0">待审核</Option>
                                <Option value="1">审核通过</Option>
                                <Option value="2">审核未通过</Option>
                            </Select>
                          </FormItem>
                        </Col>
                        <Col class="margin-bottom-10" span="8">
                          <FormItem label="编制时间" prop="microapp_time">
                            <DatePicker type="date" placeholder="请选择时间" v-model="formItem.create_date"  :disabled="true"></DatePicker>
                          </FormItem>
                        </Col>
                        <Col class="margin-bottom-10" span="8">
                          <FormItem label="编制人" prop="microapp_people"> 
                            <Input placeholder="编制人" v-model="formItem.creator" :disabled="true"></Input>
                          </FormItem>
                        </Col>
                        <Col class="margin-bottom-10" span="8">
                        </Col>
                        <Col class="margin-bottom-10" span="24">
                          <FormItem label="备注" prop="microapp_note">
                            <Input type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="备注" v-model="formItem.remark" :disabled="isDisable1"></Input>
                          </FormItem>
                        </Col>
                      </Form>
                  </Row>
              </Card>

              <Card class="margin-top-10">
                  <p slot="title">门店汇总月度计划</p>
                  <!-- 数据表格 -->
                  <v-table
                          ref="table1"
                          is-horizontal-resize
                          style="width:100%"
                          :multiple-sort="false"
                          :min-height="400"
                          :columns="adminColumns"
                          :table-data="adminList"
                          :cell-edit-done="cellEditDone"
                          row-hover-color="#ebf7ff"
                          row-click-color="#ebf7ff"></v-table>
              </Card>


            </Col>

        </Row>
        
        <!--审核操作-->  
        <Modal title="审核操作" :value="modalStatus" @on-cancel="modalCancel" @on-ok="modalOk">
            <Form ref="audit" :model="modalData" :label-width="90">
                <FormItem label="审核结果：">
                    <RadioGroup v-model="modalData.statusCode">
                    <Radio label="1">通过</Radio>
                    <Radio label="2">不通过</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="审核描述：">
                    <Input type="textarea" v-model="modalData.desc" placeholder=""></Input>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable,VPagination} from 'vue-easytable'
export default {
  components: {VTable,VPagination},
  data() {
    return {
      modalStatus: false,  //弹框默认隐藏
      modalData: {
        statusCode: 1,
        desc:''
      },
      isDisable: false, //已审核状态下是否能编辑
      isDisable1: false, //待审核状态下是否能编辑
      isAudit: true, //是否能审核
      isSave: false, //是否保存
      adminColumns:  [
        {field: 'type', title:'补偿类型', width: 80, titleAlign: 'center',columnAlign:'center',isEdit:false,formatter: function (rowData,rowIndex,pagingIndex,field) {
            return `<span class='cell-edit-color'>${rowData[field]}</span>`;
         },isResize:true,isFrozen: true},
        {field: 'january', title: '1月', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'february', title: '2月', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'march', title: '3月', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'aril', title: '4月', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'may', title: '5月', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'june', title: '6月', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'july', title: '7月', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'august', title: '8月', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'september', title: '9月', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'october', title: '10月', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'november', title: '11月', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'december', title: '12月', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:true,isResize:true},
        {field: 'total', title: '合计', width: 100, titleAlign: 'center',columnAlign:'center',isEdit:false,isResize:true}
      ],
      com_status: "-1", //补偿计划详情的状态
      formItem: {
        plan_year: null,
        sale_market: '',
        create_date: "",
        creator: "小明",
        remark: "",
        data: {}
      },
      adminList: [], //表格数据
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
      //对象字段信息未填写，相应的提示信息
      hookParams: {
        plan_year: '请选择年份',
        sale_market: '请选择适用门店',
        create_date: '请选择时间',
        creator: '请填写编制人',
        remark: '111'
      },
      hookArr: ["type","january","february","march","aril","may","june","july","august","september","october","november","december","total"],
      //补偿计划类型字段名称
      compensateTypeArr: ['cash','stored_value','electronic_coupons','integral']  
    }
  },
  methods: {
    // 订单详情初始化
    init() {
      // 缺少API获取信息
      let orderNo = this.$route.params.id;
      if(orderNo){
        this.getData();
      }
      //防止从某个详情中返回点击新增，进入补偿计划详情中表单数据无法显示的情形
      this.$refs.table1.resize(); 
    },
    /**
     * 初始化表单字段
     */
    resetKey() {
      let type = ["现金","储值金额","电子券","积分"];

      this.adminList = [];
      for(let i = 0; i < 4; i++) {
        let list = {
          type: "0.00",
          january: "0.00",
          february: "0.00",
          march: "0.00",
          aril: "0.00",
          may: "0.00",
          june: "0.00",
          july: "0.00",
          august: "0.00",
          september: "0.00",
          october: "0.00",
          november: "0.00",
          december: "0.00",
          total: "0.00"
        };
        list.type = type[i];
        this.adminList.push(list);
      }
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
      this.formItem.plan_year = date;
      this.formItem.create_date = date +'-'+ month +'-'+ day;
      //设置年份
      this.yearlist = [];
      for(let j = 0; j < 7; j++) {
        if(j < 4) {
          this.yearlist.push({
            'value': update,
            'label': update 
          });
          update++;
        }else {
          downdate--;
          this.yearlist.push({
            'value': downdate,
            'label': downdate 
          });
        }
      }
    },
    /**
     * 获取数据
     */
    getData() {
      let that = this;
      let id = this.$route.params.id;
      let queryParam = {
        id: id
      };
      this.$http({
          url: "https://rap-api.sjhgo.com/app/mock/data/187", //请求地址
          method: "get", //请求类型
          data: queryParam //请求参数对象
      }).then(res => {
          if (res) {
            that.formItem.plan_year = res.data.plan_year;
            that.formItem.sale_market = '1'; //res.data.sale_market
            that.com_status = res.data.com_status; //res.data.com_status
            that.formItem.create_date = res.data.create_date.split(" ")[0];
            that.formItem.creator = res.data.creator;
            that.formItem.remark = res.data.remark;
            that.formItem.data = res.data.value;
            let data = res.data.value;
            let type = ["现金","储值金额","电子券","积分"];
            let paramsArr = [];
            for(let j = 0; j < 4; j++) {
              let obj = { total: 0};
              for(let i in data) {
                if(j == 0) {
                  obj[i] = data[i].cash.plan_value.toFixed(2)
                }else if(j == 1) {
                  obj[i] = data[i].stored_value.plan_value.toFixed(2)
                }else if(j == 2) {
                  obj[i] = data[i].electronic_coupons.plan_value.toFixed(2)
                }else if(j == 3) {
                  obj[i] = data[i].integral.plan_value.toFixed(2)
                }
              }
              for(let m in obj) {
                if(m != 'total') {
                  obj.total = (Number(obj.total) + Number(obj[m])).toFixed(2);
                }
              }
              obj.type = type[j];
              paramsArr.push(obj);
            }

            that.adminList = paramsArr;
            let len = this.adminColumns.length;
            if(that.com_status == "1" || that.com_status == "2") {
              //当计划状态为“已审核”时，全部不允许编辑
              that.adminColumns.forEach((value,index) => {
                if(index != 0){
                  value.isEdit = false;
                }
              })
              that.isAudit = true;
              that.isDisable = true;
              that.isDisable1 = true;
              that.isSave = true;
            }else if(that.com_status == "0") {
              that.adminColumns.forEach((value,index) => {
                //当计划状态为“待审核”时，表单和备注可以编辑
                if(index == 0 || index == len - 1) {
                  value.isEdit = false;
                }else {
                  value.isEdit = true;
                }
              })
              that.isAudit = false;
              that.isSave = false;
              that.isDisable = true;
              that.isDisable1 = false;
            }
          }
      })
      
    },
    // 单元格编辑回调
    cellEditDone(newValue,oldValue,rowIndex,rowData,field){
        if(newValue == oldValue) return;
        this.adminList[rowIndex][field] = newValue;
        let adminList = this.adminList;
        for(let i = 0; i < adminList.length; i++) {
          if(rowIndex == i) {
            adminList[i]['total'] = '0.00';
            for(let j in adminList[i]) {
              if(j != 'total' && j != 'type') {
                adminList[i]['total'] = (Number(adminList[i]['total'])+ Number(adminList[i][j])).toFixed(2);
              }
            }
          }
        }
        console.log("单元表格编辑", rowIndex,field,this.adminList);
        // 接下来处理业务逻辑，数据持久化等...
    },
    composnatePlanSave() {
      let queryParam = this.formItem;
      let id = this.$route.params.id;
      let url = "";
      console.log("queryParam",queryParam);
      if(id) {
        url = "https://rap-api.sjhgo.com/app/mock/data/185";
        queryParam.id = id;
      }else {
        url = "https://rap-api.sjhgo.com/app/mock/data/150";
      }
      delete queryParam.create_date;
      this.$http({
          url: url, //请求地址
          method: "get", //请求类型
          data: queryParam //请求参数对象
      }).then(res => {
          if (res) {
            console.log("res",res);
          }
      }); 
    },
    save(obj,callback) {
      let that = this;
      let orderNo = this.$route.params.id;
      for(let i in obj) {
        if(obj[i] == '' && i != 'adminList' && i != 'remark') {
          this.$Message.error(this.hookParams[i]);
          return;
        }
      } 

      //表格数组数据类型转化成对象
      let objNesting = {};
      let mLen = this.hookArr.length;
      let nLen = this.adminList.length;
      for(let m = 1; m < mLen - 1; m++) {
        objNesting[this.hookArr[m]] = {};
        for(let n = 0; n < nLen; n++) {
          objNesting[this.hookArr[m]][this.compensateTypeArr[n]] = {};
          if(!orderNo) {
            //新单时，设置表格单元格一个默认的id
            objNesting[this.hookArr[m]][this.compensateTypeArr[n]]['id'] = 1;
          }else {
            objNesting[this.hookArr[m]][this.compensateTypeArr[n]]['id'] = this.formItem.data[this.hookArr[m]][this.compensateTypeArr[n]]['id'];
          }
          objNesting[this.hookArr[m]][this.compensateTypeArr[n]]['plan_value'] = Number(this.adminList[n][this.hookArr[m]]);
        }
      }
      this.formItem.data = objNesting;

      this.composnatePlanSave();
      callback && callback();

      console.log("保存触发:", obj);
    },
    saveAndClose(obj) {
      console.log("保存关闭触发:", obj);
      let that = this;
      this.save(obj, function() {
        that.$router.push({
          name: "compensate-plan-list",
          params: {}
        });
      })
    },
    closeBtn() {
      this.$router.push({
        name: "compensate-plan-list",
        params: {}
      });
    },
    /**
     * 审核表单
     */
    auditForm() {
      this.modalStatus = true;
    },
    modalOk() {
      let id = this.$route.params.id;
      let status = this.modalData.statusCode;
      let audit_remark = this.modalData.desc;
      let queryParam = {id,status,audit_remark};
      console.log("queryParam",queryParam);
      this.$http({
          url: "https://rap-api.sjhgo.com/app/mock/data/241", //请求地址
          method: "get", //请求类型
          data: queryParam //请求参数对象
      }).then(res => {
          if (res) {
          }
      });
      this.modalStatus = false;
    },
    modalCancel() {
      this.modalStatus = false;
    }
  },
  mounted: function() {
    this.init();
  },
  /**
   * keep-alive组件被激活调用
   */
  activated: function() {
    this.init();
  },
  /**
   * keep-alive组件被移除调用
   * 清除组件数据缓存，重置数据
   */
  deactivated: function() {
    let item = {
        plan_year: null,
        sale_market: '',
        create_date: "",
        creator: "小明",
        remark: "",
        data: {}
    };
    let len = this.adminColumns.length;

    this.com_status = "-1",
    this.adminList = [];
    this.isDisable = false;
    this.isDisable1 = false;
    this.isAudit = true;
    this.isSave = false;
    this.formItem = item;
    this.resetKey();
    this.resetYear();

    this.adminColumns.forEach(function(value, index){
      if(index == 0 || index == len - 1) {
        value.isEdit = false;
      }else {
        value.isEdit = true;
      }
    });
    console.log("组件被移除",this.adminColumns)
  },
  created: function() {
      this.resetKey();
      this.resetYear();
      console.log("初始化数据", this.formItem);
  }
};
</script>
