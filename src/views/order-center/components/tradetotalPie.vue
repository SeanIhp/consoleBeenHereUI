<template>
  <div style="width:100%;height:100%;" :id="chartId"></div>
</template>

<script>
const echarts = require("echarts");

export default {
  name: "tradetotalPie",

  data() {
    return {
      //echarts对象声明
      echarts: {},
      apiData: {}
    };
  },

  props: {
    // url: String,
    chartId: String,
    // span: Number,
    // title: String
  },

  methods: {
    // 仪表盘初始化
    initEcharts() {
      this.$nextTick(() => {

        // 图表config配置参数设置
        const option = {
                title: {
                    text: '交易笔数',
                    left: 'center',
                    textStyle: {
                        color: '#666',
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                        fontSize: 14,
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    right: '10',
                    top: 'center',
                    data: [{
                        name:'实体门店',
                        icon: 'roundRect',
                        textStyle: {
                            color: 'red'
                        }
                    },{
                        name:'微信商城',
                        icon: 'roundRect',
                        textStyle: {
                            color: 'red'
                        }
                     },{
                        name:'天猫旗舰店',
                        icon: 'roundRect',
                        textStyle: {
                            color: 'red'
                        }
                    },{
                        name:'京东',
                        icon: 'roundRect',
                        textStyle: {
                            color: 'red'
                        }
                    }]
                },
                series : [
                    {
                        type: 'pie',
                        radius : '65%',
                        center: ['50%', '50%'],
                        selectedMode: 'single',
                        data:[
                            {value:1548,name: '实体门店'},
                            {value:535, name: '微信商城'},
                            {value:510, name: '天猫旗舰店'},
                            {value:634, name: '京东'}
                        ],
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
        //   声明图表dom对象
        this.echarts = echarts.init(document.getElementById(this.chartId));
        // 设置图表参数，启动图表显示
        this.echarts.setOption(option);
      });
    },

    // 根据仪表盘URL配置获取数据
    // getData() {
    //   this.$http({
    //     url: this.url,
    //     method: "post",
    //     data: {}
    //   }).then(res => {
    //     if (res) {
    //       this.apiData = res;
    //       this.init();
    //     }
    //   });
    // }
  },

  mounted() {
    //this.getData();
    const that = this;
    this.initEcharts();
    window.addEventListener("resize", function() {
      that.echarts.resize();
    });
  },

  watch: {
    //   监听列布局参数改变后刷新图表布局重绘
    // span: function(val, oldVal) {
    //   if (val != oldVal) {
    //     this.echarts.resize();
    //   }
    // },

    //监听列表数据URL改变后刷新图表数据
    // url: function(val, oldVal) {
    //   if (val != oldVal) {
    //     this.getData();
    //   }
    // }
  }
};
</script>
