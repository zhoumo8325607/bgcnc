<!--
@author: Prajna
@since : 2021/12/27
@description: 机台排布
-->
<template>
  <div class="machineDisplay">
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
            backgroundColor: col.bgColor,
            color: '#000',
            fontSize: '12px',
          }"
        >
          {{ col.outputPlaneQty }}
        </div>
        <div
          :style="{
            backgroundColor: col.bgColor,
            color: col.textColor,
            fontSize: '12px',
          }"
        >
          {{ col.outputActualQty }}
        </div>
        <div style="font-size: 12px">{{ col.locIndex }}</div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "DistriArea",
  props: {
    data: Array,
  },
  mounted() {},
  methods: {},
};
</script>
<style>
.machineDisplay {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.machineDisplay .el-row {
  margin-bottom: -5px;
}
.machineDisplay div {
  color: #fff;
  min-height: 15%!important;
}
.machineDisplay .macLeft {
  width: 2.5%;
  border: none;
  text-align: center;
}
.machineDisplay .macCol {
  display: inline;
  float: left;
  width: 2.55%;
  font-size: 12px;
  border: none;
  padding: 0 2px !important;
  text-align: center;
}
</style>
