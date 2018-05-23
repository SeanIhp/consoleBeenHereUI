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
        //－－－－－－－－－－网络请求数据格式［待替换成异步API请求获取］end－－－－－－－－－－
        let nameStyle = {
                formatter: [
                    '{title|{b}}{abg|}',
                    
                ].join('\n'),
                backgroundColor: '#eee',
                borderColor: 'red',
                borderWidth: 1,
                borderRadius: 4,
                rich: {
                    title: {
                      color: 'green',
                      align: 'center'
                    },
                    abg: {
                      backgroundColor: 'green',
                      width: '100%',
                      align: 'right',
                      height: 25,
                      borderRadius: [4, 4, 0, 0]
                    },
                },
            };        

        let itemStyle = {
                width: 60,
                lineHeight: 20,
                fontSize: 10,
                color: '#666',
                borderWidth: 1,
                borderColor: '#e4e4e4',
                rich: {}
            };

        // 图表config配置参数设置
        const option =  {
          title: {
              text: '销售金额（万元）',
              left: 'center',
              textStyle: {
                color: '#666',
                fontStyle: 'normal',
                fontWeight: 'normal',
                fontSize: 14,
              }
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'cross',
                crossStyle: {
                  color: '#999'
                }
              }
          },
          legend: {
              data:[{
                        name:'去年',
                        textStyle: {
                            color: 'red'
                        }
                    },{
                        name:'今年',
                        textStyle: {
                            color: 'yellow'
                        }
                    },{
                        name:'同比',
                        textStyle: {
                            color: 'red'
                        }
                    },{
                        name:'环比',
                        textStyle: {
                            color: 'red'
                        }
                    }],   
              left: 'left',
              top: 'middle',
              orient: 'vertical'
          },
          grid: {
            top: "40",
            left: "4%",
            right: "4%",
            bottom: "12%",
            containLabel: true
          },
          // toolbox: {
          //     show: true,
          //     feature: {
          //         dataZoom: {
          //             yAxisIndex: 'none'
          //         },
          //         dataView: {readOnly: false},
          //         magicType: {type: ['line', 'bar']},
          //         restore: {},
          //         saveAsImage: {}
          //     }
          // },
          xAxis : [{
                  type : 'category',
                  position: 'top',
                  data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                },
                {
                  type : 'category',
                  position: 'bottom',
                  offset: -6,
                  data : [{
                    value:'1月',
                    textStyle: itemStyle
                  },{
                    value:'2月',
                    textStyle: itemStyle
                  },{
                    value:'3月',
                    textStyle: itemStyle
                  },{
                    value:'4月',
                    textStyle: itemStyle
                  },{
                    value:'5月',
                    textStyle: itemStyle
                  },{
                    value:'6月',
                    textStyle: itemStyle
                  },{
                    value:'7月',
                    textStyle: itemStyle
                  },{
                    value:'8月',
                    textStyle: itemStyle
                  },{
                    value:'9月',
                    textStyle: itemStyle
                  },{
                    value:'10月',
                    textStyle: itemStyle
                  },{
                    value:'11月',
                    textStyle: itemStyle
                  },{
                    value:'12月',
                    textStyle: itemStyle
                  }],

              },{
                  type : 'category',
                  position: 'bottom',
                  offset: 14,
                  name: '去年',
                  nameLocation: 'start',
                  nameTextStyle: nameStyle,
                  data : [{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  }
                ],

              },{
                  type : 'category',
                  position: 'bottom',
                  offset: 34,
                  name: '今年',
                  nameLocation: 'start',
                  nameTextStyle: nameStyle,
                  data : [{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  }]
                },{
                  type : 'category',
                  position: 'bottom',
                  offset: 54,
                  name: '今年',
                  nameLocation: 'start',
                  nameTextStyle: nameStyle,
                  data : [{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  }]
                },{
                  type : 'category',
                  position: 'bottom',
                  offset: 74,
                  name: '今年',
                  nameLocation: 'start',
                  nameTextStyle: nameStyle,
                  data : [{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  },{
                    value:'13424',
                    textStyle: itemStyle,
                  }]
                }
          ],
          yAxis : [{
                  type: 'value',
                  min: 0,
                  max: 250,
                  interval: 50,
                  axisLabel: {
                      formatter: '{value}'
                  }
              },
              {
                  type: 'value',
                  min: 0,
                  max: 25,
                  interval: 5,
                  axisLabel: {
                      formatter: '{value} %'
                  }
              }
          ],
          series : [
              {
                  name:'去年',
                  type:'bar',
                  data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
              },
              {
                  name:'今年',
                  type:'bar',
                  data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
              },{
                name:'同比',
                type:'line',
                yAxisIndex: 1,
                data:[2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
              },{
                name:'环比',
                type:'line',
                yAxisIndex: 1,
                data:[1.0, 2.0, 2.3, 3.5, 5.3, 10.2, 16.3, 20.4, 21.0, 14.5, 10.0, 5.2]
              }
          ],
          textStyle: {
            height: 1000,
            rich: {
              //height: ''

            }
          }
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
