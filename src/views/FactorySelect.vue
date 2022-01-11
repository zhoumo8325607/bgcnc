<template>
  <el-main>
    <el-radio-group v-model="factory" class="factorySelect">
      <el-radio
        class="factoryClass"
        :label="item"
        :key="item"
        v-for="item in factoryList"
        name="factory"
      >
        {{ item }}
      </el-radio>
    </el-radio-group>
  </el-main>
</template>

<script>
import interfaceFunc from '../plugins/interfaceFunc.js'

export default {
  created() {
    this.$store.commit("setTitle", this.$t("L0005"));
    this.$http
      .axios(`${this.$http.pre_url}getParam4Board&withNoPwd=1`)
      .then((res) => {
        this.factoryList = interfaceFunc.getFactory(res)
        this.$store.commit('setConfigData',res)
      })
      .catch((err) => {
        console.log(err);
      });
  },
  data() {
    return {
      factory: window.localStorage.getItem("factory")
        ? window.localStorage.getItem("factory")
        : "",
      factoryList: [],
      facInitialIndex: 0,
    };
  },
  mounted() {
    setTimeout(() => {
      this.facInitialIndex = this.factoryList.findIndex((item) => {
        return item == this.factory;
      });
      this.facInitialIndex = this.facInitialIndex > -1 ? this.facInitialIndex : 0;
        document.getElementsByClassName("factoryClass")[this.facInitialIndex].focus();
    }, 500);
  },
  methods: {},
  watch: {
    factory: function (factoryVal) {
      this.facInitialIndex = this.factoryList.findIndex((item) => {
        return item == factoryVal;
      });
      window.localStorage.setItem("factory", factoryVal);
      localStorage.removeItem('departmentList')
      localStorage.removeItem('department')
      localStorage.removeItem('workshopList')
      localStorage.removeItem('workshop')
      localStorage.removeItem('projectList')
      localStorage.removeItem('project')
      localStorage.removeItem('processList')
      localStorage.removeItem('process')
      this.$store.commit("setFactoryIndex", this.facInitialIndex);
    },
  },
};
</script>

<style>
.factorySelect {
  margin-top: 5vh;
  width: 100vw;
  text-align: left;
  margin-left: 20vw;
}

.el-radio {
  display: block !important;
  margin-right: 0 !important;
  line-height: 10vh !important;
}

.el-radio__label {
  font-size: 22px !important;
}
</style>
