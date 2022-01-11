<!--
@author: wang.weili
@since : 2021/06/04
@recommand: https://v-charts.js.org/#/
-->
<template>
  <div ref="dom" class="chart-box"/>
</template>

<script>
import * as echarts from 'echarts/lib/echarts'
import { TitleComponent } from 'echarts/components';
echarts.use([TitleComponent]);
import { TooltipComponent } from 'echarts/components';
echarts.use([TooltipComponent]);
import { LegendComponent } from 'echarts/components';
echarts.use([LegendComponent]);
import { GridComponent } from 'echarts/components';
echarts.use([GridComponent]);
import { BarChart } from 'echarts/charts';
echarts.use([BarChart]);
import { LineChart } from 'echarts/charts';
echarts.use([LineChart]);
import { PieChart } from 'echarts/charts';
echarts.use([PieChart]);

const defaultOption={
  grid: {
      left: '1%',
      right: '1%',
      bottom: '1%',
      top: '1%',
      containLabel: true
  },
  xAxis: {
      type: 'category',
      data: []
  },
  yAxis: {
      type: 'value'
  },
  series: []
}
export default {
  name: 'Chart',
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  watch:{
    data:{
      handler(){
        this.drawing()
      },
      deep:true
    }
  },
  data() {
    return {
      dom: null
    }
  },
  mounted() {
    const option = Object.assign({},defaultOption,this.data);
    this.dom = echarts.init(this.$refs.dom)
    this.dom.setOption(option);
    this.drawing();
    // this.$root.charts.push(this);
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy() {
    // this.$root.charts = this.$root.charts.filter(el=>el._uid!=this._uid);
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      this.dom.resize()
    },
    drawing() {
      this.dom.setOption(this.data);
    }
  }
}
</script>
<style>
.chart-box{min-height:180px}
</style>