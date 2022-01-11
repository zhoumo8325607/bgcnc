<template>
  <el-main>
    <div
      ref="processGroup"
      name="checkProcess"
      class="processSelect"
      v-for="item in processList"
      :key="item.$index"
      :style="{ top: item.topStyle }"
    >
      <input
        :tabIndex="item.$index"
        type="checkbox"
        name="process"
        class="processClass"
        v-model="item.checked"
        :checked="item.checked"
        @click="changeProcess(item)"
      />
      <span>{{ item.process }}</span>
    </div>
  </el-main>
</template>

<script>
import Utils from "../assets/js/util.js";
import interfaceFunc from "../plugins/interfaceFunc.js";

let depObj = { id: "1", process: "", checked: false, topStyle: "0vh" };
export default {
  created() {
    this.$store.commit("setTitle", this.$t("L0012"));
    let factory = localStorage.getItem("factory")
      ? localStorage.getItem("factory")
      : "";
    let processList = JSON.parse(localStorage.getItem("processList"))
      ? JSON.parse(localStorage.getItem("processList"))
      : [];
    let cacheProcessArray = [];
    processList.forEach(function (element) {
      this.push(element.process);
    }, cacheProcessArray);
    if (factory) {
      this.$http
        .axios(`${this.$http.pre_url}getParam4Board&withNoPwd=1`)
        .then((res) => {
          //判断缓存数组和刷新数组所有元素value是否相同，相同取缓存值，否则取刷新值
          if (interfaceFunc.getProcessType(factory, res).length > 0) {
            if (
              JSON.stringify(cacheProcessArray) ==
              JSON.stringify(interfaceFunc.getProcessType(factory, res))
            ) {
              this.processList = processList;
            } else {
              this.processList = interfaceFunc
                .getProcessType(factory, res)
                .map((el, index) => {
                  return Object.assign({},depObj, {
                    id: index + 1,
                    process: el,
                    topStyle: (index + 1) * 10 + 5 + "vh",
                  });
                });
            }
          } else {
            this.$message.error("返回数据为空，请重新选择！");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (!factory) {
      this.$message.error("请先选择工厂");
    }
  },
  data() {
    return {
      processList: [],
      focusIndex: 0,
    };
  },
  mounted() {
    var that = this;
    Utils.$on("processFocus", function () {
      that.processFocus();
    });
    Utils.$on("changeProcessList", function (flag) {
      that.changeProcessList(that.focusIndex, flag);
    });
    Utils.$on("processDownFocus", function () {
      that.focusIndex =
        that.focusIndex < 0
          ? 0
          : that.focusIndex == that.processList.length - 1
          ? that.focusIndex
          : that.focusIndex + 1;
      that.processDownFocus(that.focusIndex);
    });
    Utils.$on("processUpFocus", function () {
      that.focusIndex =
        that.focusIndex < 0
          ? 0
          : that.focusIndex == 0
          ? that.focusIndex
          : that.focusIndex - 1;
      that.processUpFocus(that.focusIndex);
    });
  },
  methods: {
    processFocus() {
      if (
        Array.from(document.getElementsByClassName("processClass")).length > 0
      ) {
        Array.from(document.getElementsByClassName("processClass"))[0].focus();
      }
    },
    changeProcess(item) {
      this.processList.every((el) =>
        el.process === item.process ? Object.assign(el, item) : el
      );
    },
    changeProcessList(moduleId, flag) {
      this.processList[moduleId].checked = flag;
    },
    processDownFocus(moduleId) {
      if (moduleId < this.processList.length) {
        Array.from(document.getElementsByClassName("processClass"))[
          moduleId
        ].focus();
      }
    },
    processUpFocus(moduleId) {
      if (moduleId < this.processList.length) {
        Array.from(document.getElementsByClassName("processClass"))[
          moduleId
        ].focus();
      }
    },
  },
  watch: {},
  beforeRouteLeave(to, from, next) {
    var processSelect = [];
    this.processList.forEach((element) => {
      element.checked ? processSelect.push(element.process) : null;
    }, processSelect);
    localStorage.setItem("process", processSelect.join(","));
    localStorage.setItem("processList", JSON.stringify(this.processList));
    next();
  },
};
</script>

<style>
.el-checkbox {
  display: block !important;
  margin-left: 30vw;
  color: #fff !important;
  font-size: 3rem !important;
}
.el-checkbox__label {
  line-height: 3rem !important;
  font-size: 1.2rem !important;
}

.processSelect {
  position: fixed;
  width: 100vw;
  left: 40vw;
  color: #fff;
}

.processSelect span {
  margin-left: 2vw;
}
</style>
