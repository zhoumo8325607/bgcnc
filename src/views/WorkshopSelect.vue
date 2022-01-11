<template>
  <el-main>
    <div
      ref="workshopGroup"
      name="checkWorkshop"
      class="workshopSelect"
      v-for="item in workshopList"
      :key="item.$index"
      :style="{ top: item.topStyle }"
    >
      <input
        :tabIndex="item.$index"
        type="checkbox"
        name="workshop"
        class="workshopClass"
        v-model="item.checked"
        :checked="item.checked"
        @click="changeWorkshop(item)"
      />
      <span>{{ item.workshop }}</span>
    </div>
  </el-main>
</template>

<script>
import Utils from "../assets/js/util.js";
import interfaceFunc from "../plugins/interfaceFunc.js";

let depObj = { id: "1", workshop: "", checked: false, topStyle: "0vh" };
export default {
  created() {
    this.$store.commit("setTitle", this.$t("L0007"));
    let factory = localStorage.getItem("factory")
      ? localStorage.getItem("factory")
      : "";
    let department = localStorage.getItem("department")
      ? localStorage.getItem("department")
      : "";
    let workshopList = JSON.parse(localStorage.getItem("workshopList"))
      ? JSON.parse(localStorage.getItem("workshopList"))
      : [];
    let cacheWorkshopArray = [];
    workshopList.forEach(function (element) {
      this.push(element.workshop);
    }, cacheWorkshopArray);
    if (factory && department) {
      this.$http
        .axios(`${this.$http.pre_url}getParam4Board&withNoPwd=1`)
        .then((res) => {
          //判断缓存数组和刷新数组所有元素value是否相同，相同取缓存值，否则取刷新值
          if (
            interfaceFunc.getWorkshopMap(factory, department, res).length > 0
          ) {
            if (
              JSON.stringify(cacheWorkshopArray) ==
              JSON.stringify(
                interfaceFunc.getWorkshopMap(factory, department, res)
              )
            ) {
              this.workshopList = workshopList;
            } else {
              this.workshopList = interfaceFunc
                .getWorkshopMap(factory, department, res)
                .map((el, index) => {
                  return Object.assign({},depObj, {
                    id: index + 1,
                    workshop: el,
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
    } else if (!department) {
      this.$message.error("请先选择部门");
    }
  },
  data() {
    return {
      workshopList: [],
      focusIndex: 0,
    };
  },
  mounted() {
    var that = this;
    Utils.$on("workshopFocus", function () {
      that.workshopFocus();
    });
    Utils.$on("changeWorkshopList", function (flag) {
      that.changeWorkshopList(that.focusIndex, flag);
    });
    Utils.$on("workshopDownFocus", function () {
      that.focusIndex =
        that.focusIndex < 0
          ? 0
          : that.focusIndex == that.workshopList.length - 1
          ? that.focusIndex
          : that.focusIndex + 1;
      that.workshopDownFocus(that.focusIndex);
    });
    Utils.$on("workshopUpFocus", function () {
      that.focusIndex =
        that.focusIndex < 0
          ? 0
          : that.focusIndex == 0
          ? that.focusIndex
          : that.focusIndex - 1;
      that.workshopUpFocus(that.focusIndex);
    });
  },
  methods: {
    workshopFocus() {
      if (
        Array.from(document.getElementsByClassName("workshopClass")).length > 0
      ) {
        Array.from(document.getElementsByClassName("workshopClass"))[0].focus();
      }
    },
    changeWorkshop(item) {
      this.workshopList.every((el) =>
        el.workshop === item.workshop ? Object.assign(el, item) : el
      );
    },
    changeWorkshopList(moduleId, flag) {
      this.workshopList[moduleId].checked = flag;
    },
    workshopDownFocus(moduleId) {
      if (moduleId < this.workshopList.length) {
        Array.from(document.getElementsByClassName("workshopClass"))[
          moduleId
        ].focus();
      }
    },
    workshopUpFocus(moduleId) {
      if (moduleId < this.workshopList.length) {
        Array.from(document.getElementsByClassName("workshopClass"))[
          moduleId
        ].focus();
      }
    },
  },
  watch: {},
  beforeRouteLeave(to, from, next) {
    // let departmentIndex = this.workshopList.findIndex((el)=>el.checked)>-1?this.workshopList.findIndex((el)=>el.checked):0;
    // this.$store.commit('setWorkshopIndex',departmentIndex)
    var workshopSelect = [];
    this.workshopList.forEach((element) => {
      element.checked ? workshopSelect.push(element.workshop) : null;
    }, workshopSelect);
    localStorage.setItem("workshop", workshopSelect.join(","));
    localStorage.setItem("workshopList", JSON.stringify(this.workshopList));
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

.workshopSelect {
  position: fixed;
  width: 100vw;
  left: 40vw;
  color: #fff;
}

.workshopSelect span {
  margin-left: 2vw;
}
</style>
