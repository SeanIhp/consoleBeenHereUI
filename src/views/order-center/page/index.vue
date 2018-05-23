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
.action-h4 {
  color: #999;
  font-size: 14px;
  font-weight: normal;
}
.action-h3 {
  color: #333;
  font-size: 24px;
}
.action-arrow {
  color: #999;
}

.order-on {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.bgc-F0F0F0 {
  background-color: #f0f0f0;
}

.bgc-f1f2f6 {
  background-color: #f1f2f6;
  margin-top: 10px;
}
ul {
   list-style: none;
   width: 100%;  
}
.clearfix {
  &::after {
    content: '';
    clear: both;
    display: block;
  }
}
.li-card {
    width: 100%;
    height: 0;
    text-align: center;
    padding-bottom: 100%;
    border: solid 1px #e4e4e4;
    border-radius: 4px;
    position: relative;
}
.li-card:hover {
    box-shadow: 1px 1px 2px #e4e4e4;
}
.li-card span {
    position: absolute;
    left: 50%;
    top: 50%;
    color: #666;
    transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
}
.order-item>li {
    float: left;
    width: 10%;
    text-align: center;
    margin-left: 1.25%;

}
.order-item>li:first-child {
    margin-left: 0;
} 
/*.card-item {
    width: 100%;
    height: 0;
    text-align: center;
    padding-bottom: 100%;
    position: relative;    
}
.card-item .ivu-card-body {
    position: absolute !important;
    left: 50%  !important;
    top: 50%  !important;
    transform: translateX(-50%) translateY(-50%) !important ;
    -webkit-transform: translateX(-50%) translateY(-50%) !important;
}*/

.pie-chart-col {
    height: 300px;
    padding: 10px;
    background-color: #fff;
}
.bar-chart-col {
    height: 800px;
    background-color: #fff;
}
.chart-select {
    width: 200px;
    margin: 20px 0 10px 20px; 
}
</style>

<template>
    <div style="background-color: #f1f2f6; padding: 0 10px 10px 10px;">
        <Row> 

            <Col span="24">

            <Card class="bgc-f1f2f6" :padding="0" :bordered="false">
                <Row :gutter="10">
                    <Col v-for="(item, index) in todaySaleData" span="8" :key="index">
                        <Card :bordered="false">
                            <h4 class="action-h4">{{item.title}}</h4>
                            <h3 class="action-h3">{{item.value}}</h3>
                            <p class="action-arrow" style="overflow: hidden;">
                                <span class="margin-right-10" style="float: left; line-height:32px;">{{item.percentage}}</span>
                                <Icon  style="float: left;" :type="item.iconType" :color="item.iconType === 'arrow-up-a'?'#52c31b': '#f52b27'" size="32"></Icon>
                            </p>
                        </Card>
                    </Col>
                </Row>
            </Card>


            <Card class="bgc-f1f2f6" :padding="0" :bordered="false">    
                
                <Row >
                    <Col span="24" style="background-color: #fff;">
                        <p style="text-align: center; font-size:18px; color: #666;  line-height: 36px;">订单一览</p>
                    </Col>
                    <!-- <Col v-for="(item, index) in orderList" span="3">
                        <Card :bordered="false">
                            <ul>
                                <li class="li-card" style="margin-bottom: 33.3%;">
                                    <span>{{item.itemName}}</span>
                                </li>
                                <li class="li-card">
                                    <span>{{item.itemData}}</span>
                                </li>
                            </ul>
                        </Card>
                    </Col> -->

                    <Col span="24" style="background-color: #fff; padding: 10px;">
                    <ul class="order-item clearfix">
                        <li v-for="(item, index) in orderList">
                            <ul>
                                <li style="margin-bottom: 12.5%;">
                                    <div class="li-card">
                                        <span>{{item.itemName}}</span>
                                    </div>
                                    <!-- <Card class="card-item">{{item.itemName}}</Card> -->
                                </li>
                                <li >
                                    <div class="li-card">
                                        <span>{{item.itemData}}</span>
                                    </div>
                                    <!-- <Card class="card-item">{{item.itemData}}</Card> -->
                                </li>
                            </ul>    
                        </li>
                    </ul>
                    </Col>
                </Row>

            </Card>

            <Card class="bgc-f1f2f6" :padding="0" :bordered="false">
                <Row :gutter="10">
                    <Col v-for="(item, index) in echartsPieList" span="12" :key="index"> 
                        <div  class="pie-chart-col">  
                            <component :is="item.componentName" :chartId="item.id"></component>
                        </div>
                    </Col>
                </Row>
            </Card>   

            <Card v-for="(item, index) in echartsBarList" class="bgc-f1f2f6" :padding="0" :bordered="false" :key="index">
                <Row>
                    <Col span="24" class="bar-chart-col"> 
                        <Select v-model="item.currentCity" class="chart-select">
                            <Option v-for="(opt, eq) in item.cityList" :value="opt.value" :key="opt.value">{{ opt.label }}</Option>
                        </Select> 
                        <div style="height: 600px;">
                            <component :is="item.componentName" :chartId="item.id"></component>
                        </div>
                    </Col>
                </Row>
            </Card> 

            </Col>

        </Row>

    </div>
</template>

<script>
const echarts = require("echarts");
import Util from "@/libs/util";
import SaleamountPie from '../components/saleamountPie.vue'
import TradetotalPie from '../components/tradetotalPie.vue'
import StoresaleBar from '../components/storesaleBar.vue'

export default {
    components: {
        SaleamountPie,
        TradetotalPie,
        StoresaleBar
    },
    data() {
        return {
            // 今日销售数据
            todaySaleData: [{
                title: '今日销售金额',
                value: '1,073,998.45',
                percentage: '1.25%',
                iconType: 'arrow-up-a' 
            },{
                title: '今日交易笔数',
                value: '1,073,998.45',
                percentage: '1.251%',
                iconType: 'arrow-down-a' 
            },{
                title: '今日客单价',
                value: '1,0000073,998.45',
                percentage: '1.65%',
                iconType: 'arrow-up-a' 
            }],
            // 订单一览数据
            orderList: [{
                itemName: '订单总数',
                itemData: 463
            },{
                itemName: '已支付',
                itemData: 3543
            },{
                itemName: '已审核',
                itemData: 358358
            },{
                itemName: '已出库',
                itemData: 3585
            },{
                itemName: '已发货',
                itemData: 43443
            },{
                itemName: '已签收',
                itemData: 4634
            },{
                itemName: '缺货',
                itemData: 3554
            },{
                itemName: '拒收',
                itemData: 4634
            },{
                itemName: '退货',
                itemData: 53454
            }],
            // 饼图列表
            echartsPieList: [{
                componentName: 'saleamount-pie',
                id: 'saleAmountPie'
            },{
                componentName: 'tradetotal-pie',
                id: 'tradeTotalPie'
            }],
            // 柱状图列表
            echartsBarList: [{
                cityList: [{
                    value: 'New York',
                    label: '纽约'
                },{
                    value: 'London',
                    label: '伦敦'
                }],
                currentCity: '',
                componentName: 'storesale-bar',
                id: 'storeSaleBar'
            }]
        };
    },
    created() {},
    mounted() {
     
    },
    computed: {

    },
    methods: {
       
    },
    watch: {}
}
</script>

<style>

</style>