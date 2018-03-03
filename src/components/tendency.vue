<template>
  <div class="tendency-wrap" >
    <div id="tendency_data" style="width: 90%; height: 450px;"></div>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/tooltip';

export default {
  mounted () {
    // 基于准备好的dom，初始化echarts实例
    this.myEcharts = echarts.init(document.getElementById('tendency_data'));
    this.initData();
  },
  props:['sevenData','sevenDay'],
  methods: {
    // 指定图表的配置项和数据
    initData(){
      const color = ['#5793f3', '#675bba', '#d14a61'];
      const option = {
        color: color,
        title: {
            text: '走势图',
            x: 'left'
        },
        tooltip: {
          trigger: 'axis'
        },
        //图例
        legend: {
            data:['新增注册用户','新增订单','新增管理员']
        },
        toolbox:{
          show:true,
          feature:{//特征
            datazoom:{
              yAxisIndex: 'none'
            },
            dataView: {readOnly: false},//数据视
            magicType: {type:['bar','line']},//图形切换
            restore: {},//复位
          }
        },
        xAxis: {
          type:'category',
          boundaryGap: false,
          data: this.sevenDay
        },
        yAxis: [
          {  
            type:'value',
            name: '用户',
            min: 0,
            max: 200,
            position: 'left',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          },
          {  
            type:'value',
            name: '订单',
            min: 0,
            max: 200,
            position: 'right',
            axisLine: {
              lineStyle: {
                color: '#999'
              }
            },
            axisLabel: {
              formatter: '{value}'
            }
          }],
        series: [{
            name: '新增注册用户',
            type: 'line',
            data: this.sevenData[0],
            markPoint:{
              data:[
                {type: 'max', name:'最大值'},
                {type: 'max', name:'最小值'}
              ]
            }
        },
        {
            name: '新增订单',
            type: 'line',
            data: this.sevenData[1],
            markPoint:{
              data:[
                {type: 'max', name:'最大值'},
                {type: 'max', name:'最小值'}
              ]
            }
        },
        {
            name: '新增管理员',
            type: 'line',
            data: this.sevenData[2],
            markPoint:{
              data:[
                {type: 'max', name:'最大值'},
                {type: 'max', name:'最小值'}
              ]
            }
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
        this.myEcharts.setOption(option);
    }
  },
  watch: {
    sevenDay:function(){
      this.initData();
    },
    sevenData:function(){
      this.initData();
    }
  }
}
</script>
<style lang="less" scoped>
  .tendency-wrap{
    display: flex;
    justify-content:center;
    margin-top:50px;
  }
</style>
