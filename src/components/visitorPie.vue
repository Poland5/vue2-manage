<template>
  <div class="visitorPie">
    <div id="visitorPie_data" style="width: 90%; height: 450px;"></div>
  </div>
</template>
<script>
import echarts from 'echarts/lib/echarts';
import pie from 'echarts/lib/chart/pie';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
export default {
  mounted () {
    this.myEcharts = echarts.init(document.getElementById('visitorPie_data'));
    this.initData();
  },
  props:['visitorData'],
  methods: {
    initData(){
      const option = {
        title : {
          text: '用户分布',
          x:'center'
        },
        tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: ['北京','上海','深圳','杭州','其他']
        },
        series : [
          {
            name: '访问来源',
            type: 'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:[
              {value:this.visitorData.beijing, name:'北京'},
              {value:this.visitorData.shanghai, name:'上海'},
              {value:this.visitorData.shenzhen, name:'深圳'},
              {value:this.visitorData.hangzhou, name:'杭州'},
              {value:this.visitorData.qita, name:'其他'}
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
      this.myEcharts.setOption(option);
    }
  },
  watch: {
    visitorData:function(){
      this.initData();
    }
  }
}
</script>
<style lang="less">
@import "../style/mixin.less";
.visitorPie{
  margin: 20px;
}
</style>

