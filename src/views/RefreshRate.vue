<template>
  <el-main>
    <el-radio-group v-model="rate" class="rateSelect">
      <el-radio class="rateClass" v-for="item in rateList" :key="item.value" :label="item.text">
        {{ item.text }}
      </el-radio>
    </el-radio-group>
  </el-main>
</template>

<script>
import Utils from "../assets/js/util.js";

export default {
  name:"RefreshRate",
  created() {
    this.$store.commit("setTitle", this.$t("L0009"));
  },
  data() {
    return {
      rate: window.localStorage.getItem("rateName")
        ? window.localStorage.getItem("rateName")
        : "1分",
      rateList: [{
        text: "6秒",
        value: "6000",
      },
      {
        text: "30秒",
        value: "30000",
      },
      {
        text: "1分",
        value: "60000",
      },
      {
        text: "3分",
        value: "180000",
      },
      {
        text: "10分",
        value: "600000",
      },
      {
        text: "30分",
        value: "1800000",
      }],
      rateInitialIndex: 2,
    };
  },
  mounted(){
    setTimeout(() => {
      this.rateInitialIndex = this.rateList.findIndex((item) => {
        return item.text == this.rate;
      });
      this.rateInitialIndex =
        this.rateInitialIndex > -1 ? this.rateInitialIndex : 2;
        //console.log(document.getElementsByClassName("rateClass")[this.rateInitialIndex])
        document.getElementsByClassName("rateClass")[this.rateInitialIndex].focus();
    }, 500);
  },
  methods: {},
  watch: {
    rate: function (rateVal) {
      let rateIndex = this.rateList.findIndex((item) => {
        return item.text == rateVal;
      });
      window.localStorage.setItem("rate", this.rateList[rateIndex].value);
      window.localStorage.setItem("rateName", rateVal);
      Utils.$emit('rateRefresh',this.rateList[rateIndex].value/1000);
	    Utils.$emit('getLefttime',this.rateList[rateIndex].value/1000);
    },
  },
};
</script>

<style>
.rateSelect {
  margin-top: 5vh;
  width: 100vw;
  text-align: left;
  margin-left: 30vw;
  height: 78vh;
  overflow-y: scroll;
}

.el-radio {
  display: block !important;
  margin-right: 0 !important;
  line-height: 10vh !important;
}

.el-radio__label {
  font-size: 20px !important;
}
</style>
