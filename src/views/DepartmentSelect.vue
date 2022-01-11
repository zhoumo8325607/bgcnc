<template>
  <el-main>
    <div
      ref="departmentGroup"
      name="checkDepartment"
      class="departmentSelect"
      v-for="item in departmentList"
      :key="item.$index"
      :style="{ top: item.topStyle }"
    >
      <input
        :tabIndex="item.$index"
        type="checkbox"
        name="department"
        class="departmentClass"
        v-model="item.checked"
        :checked="item.checked"
        @click="changeDepartment(item)"
      />
      <span>{{ item.department }}</span>
    </div>
  </el-main>
</template>

<script>
import Utils from "../assets/js/util.js";
import interfaceFunc from "../plugins/interfaceFunc.js";

let depObj = { id: "1", department: "", checked: false, topStyle: "0vh" };
export default {
  created() {
    this.$store.commit("setTitle", this.$t("L0006"));
    let factory = localStorage.getItem("factory")
      ? localStorage.getItem("factory")
      : "";
    let departmentList = JSON.parse(localStorage.getItem("departmentList"))
      ? JSON.parse(localStorage.getItem("departmentList"))
      : [];
    let cacheDepartmentArray = [];
    departmentList.forEach(function (element) {
      this.push(element.department);
    }, cacheDepartmentArray);
    if (factory) {
      this.$http
        .axios(`${this.$http.pre_url}getParam4Board&withNoPwd=1`)
        .then((res) => {
          //判断缓存数组和刷新数组所有元素value是否相同，相同取缓存值，否则取刷新值
          if (
            JSON.stringify(cacheDepartmentArray) ==
            JSON.stringify(interfaceFunc.getDepartment(factory, res))
          ) {
            this.departmentList = departmentList;
          } else {
            this.departmentList = interfaceFunc
              .getDepartment(factory, res)
              .map((el, index) => {
                return Object.assign({}, depObj, {
                  id: index + 1,
                  department: el,
                  topStyle: (index + 1) * 10 + 5 + "vh",
                });
              });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      this.$message.error("请先选择工厂");
    }
  },
  data() {
    return {
      departmentList: [],
      focusIndex: 0,
    };
  },
  mounted() {
    var that = this;
    // that.focusIndex = that.departmentList.findIndex((el)=>el.checked)>-1?that.departmentList.findIndex((el)=>el.checked):0;
    Utils.$on("departmentFocus", function () {
      that.departmentFocus();
    });
    Utils.$on("changeDepartmentlist", function (flag) {
      that.changeDepartmentlist(that.focusIndex, flag);
    });
    Utils.$on("departmentDownFocus", function () {
      //   moduleId =
      //     moduleId == that.departmentList.length
      //       ? moduleId - 1
      //       : moduleId == that.departmentList.length - 1
      //       ? moduleId
      //       : moduleId + 1;
      that.focusIndex =
        that.focusIndex < 0
          ? 0
          : that.focusIndex == that.departmentList.length - 1
          ? that.focusIndex
          : that.focusIndex + 1;
      that.departmentDownFocus(that.focusIndex);
    });
    Utils.$on("departmentUpFocus", function () {
      //   moduleId =
      //     moduleId < 1
      //       ? 0
      //       : moduleId == that.departmentList.length
      //       ? moduleId - 2
      //       : moduleId - 1;
      that.focusIndex =
        that.focusIndex < 0
          ? 0
          : that.focusIndex == 0
          ? that.focusIndex
          : that.focusIndex - 1;
      that.departmentUpFocus(that.focusIndex);
    });
  },
  methods: {
    departmentFocus() {
      if (
        Array.from(document.getElementsByClassName("departmentClass")).length >
        0
      ) {
        Array.from(
          document.getElementsByClassName("departmentClass")
        )[0].focus();
      }
    },
    changeDepartment(item) {
      this.departmentList.every((el) =>
        el.department === item.department ? Object.assign(el, item) : el
      );
	    localStorage.removeItem('workshopList')
      localStorage.removeItem('workshop')
    },
    changeDepartmentlist(moduleId, flag) {
      this.departmentList[moduleId].checked = flag;
	    localStorage.removeItem('workshopList')
      localStorage.removeItem('workshop')
    },
    departmentDownFocus(moduleId) {
      if (moduleId < this.departmentList.length) {
        Array.from(document.getElementsByClassName("departmentClass"))[
          moduleId
        ].focus();
      }
    },
    departmentUpFocus(moduleId) {
      if (moduleId < this.departmentList.length) {
        Array.from(document.getElementsByClassName("departmentClass"))[
          moduleId
        ].focus();
      }
    },
  },
  watch: {
	  
  },
  beforeRouteLeave(to, from, next) {
    // let departmentIndex =
    //   this.departmentList.findIndex((el) => el.checked) > -1
    //     ? this.departmentList.findIndex((el) => el.checked)
    //     : 0;
    // this.$store.commit("setDepartmentIndex", departmentIndex);
    var departmentSelected = [];
    this.departmentList.forEach((element) => {
      element.checked ? departmentSelected.push(element.department) : null;
    }, departmentSelected);
    localStorage.setItem("department", departmentSelected.join(","));
    localStorage.setItem("departmentList", JSON.stringify(this.departmentList));
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

.departmentSelect {
  position: fixed;
  width: 100vw;
  left: 40vw;
  color: #fff;
}

.departmentSelect span {
  margin-left: 2vw;
}
</style>
