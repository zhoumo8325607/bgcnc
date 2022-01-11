<!--
@author: Prajna
@since : 2021/12/28
@description: 刀具寿命排布
-->
<template>
  <div class="machineCutterDisplay">
    <el-row :gutter="10" v-for="item in data" :key="item.$index">
      <el-col class="macLeft" :span="1">{{ item.rowName }}</el-col>
      <el-col
        class="macCol"
        :span="23"
        v-for="col in item.machineDataRow"
        :key="col.$index"
      >
        <div
          :style="{
            backgroundColor: col.propLife[0].color,
            color: '#000',
            fontSize: '12px',
          }"
        >
          {{ col.propLife[0].name }}:{{col.propLife[0].surplusLife}}
        </div>
        <div
          :style="{
            backgroundColor: col.propLife[1].color,
            color: '#000',
            fontSize: '14px',
          }"
        >
          {{ col.propLife[1].name }}:{{col.propLife[1].surplusLife}}
        </div>
        <div style="font-size: 12px">{{ col.locIndex }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "CutterDistriArea",
  props: {
    data: Array,
  },
  mounted() {},
  methods: {},
};
</script>
<style>
.machineCutterDisplay {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* -webkit-transform-origin:0 0;
  transform-origin:0 0;
  transform:scaleX(0.33);
  -webkit-transform:scaleX(0.33); */
}
.machineCutterDisplay .el-row {
  margin-bottom: -5px;
}
.machineCutterDisplay div {
  color: #fff;
  height: 35%;
}
.machineCutterDisplay .macLeft {
  width: 2.5%;
  border: none;
  font-size: 14px;
  text-align: center;
}
.machineCutterDisplay .macCol {
  display: inline;
  float: left;
  width: 5%;
  -webkit-transform-origin:0 0;
  transform-origin:0 0;
  transform:scaleX(0.5);
  -webkit-transform:scaleX(0.5);
  margin-right: -2.5%;
  border: none;
  padding: 0 2px !important;
  text-align: center;
}
</style>
