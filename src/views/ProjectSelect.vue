<template>
  <el-main>
    <div
      ref="projectGroup"
      name="checkProject"
      class="projectSelect"
      v-for="item in projectList"
      :key="item.$index"
      :style="{ top: item.topStyle }"
    >
      <input
        :tabIndex="item.$index"
        type="checkbox"
        name="project"
        class="projectClass"
        v-model="item.checked"
        :checked="item.checked"
        @click="changeProject(item)"
      />
      <span>{{ item.project }}</span>
    </div>
  </el-main>
</template>

<script>
import Utils from "../assets/js/util.js";
import interfaceFunc from "../plugins/interfaceFunc.js";

let depObj = { id: "1", project: "", checked: false, topStyle: "0vh" };
export default {
  created() {
    this.$store.commit("setTitle", this.$t("L0008"));
    let factory = localStorage.getItem("factory")
      ? localStorage.getItem("factory")
      : "";
    let projectList = JSON.parse(localStorage.getItem("projectList"))
      ? JSON.parse(localStorage.getItem("projectList"))
      : [];
    let cacheProjectArray = [];
    projectList.forEach(function (element) {
      this.push(element.project);
    }, cacheProjectArray);
    if (factory) {
      this.$http
        .axios(`${this.$http.pre_url}getParam4Board&withNoPwd=1`)
        .then((res) => {
          //判断缓存数组和刷新数组所有元素value是否相同，相同取缓存值，否则取刷新值
          if (interfaceFunc.getProjectName(factory, res).length > 0) {
            if (
              JSON.stringify(cacheProjectArray) ==
              JSON.stringify(interfaceFunc.getProjectName(factory, res))
            ) {
              this.projectList = projectList;
            } else {
              this.projectList = interfaceFunc
                .getProjectName(factory, res)
                .map((el, index) => {
                  return Object.assign({},depObj, {
                    id: index + 1,
                    project: el,
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
      projectList: [],
      focusIndex: 0,
    };
  },
  mounted() {
    var that = this;
    Utils.$on("projectFocus", function () {
      that.projectFocus();
    });
    Utils.$on("changeProjectList", function (flag) {
      that.changeProjectList(that.focusIndex, flag);
    });
    Utils.$on("projectDownFocus", function () {
      that.focusIndex =
        that.focusIndex < 0
          ? 0
          : that.focusIndex == that.projectList.length - 1
          ? that.focusIndex
          : that.focusIndex + 1;
      that.projectDownFocus(that.focusIndex);
    });
    Utils.$on("projectUpFocus", function () {
      that.focusIndex =
        that.focusIndex < 0
          ? 0
          : that.focusIndex == 0
          ? that.focusIndex
          : that.focusIndex - 1;
      that.projectUpFocus(that.focusIndex);
    });
  },
  methods: {
    projectFocus() {
      if (
        Array.from(document.getElementsByClassName("projectClass")).length > 0
      ) {
        Array.from(document.getElementsByClassName("projectClass"))[0].focus();
      }
    },
    changeProject(item) {
      this.projectList.every((el) =>
        el.project === item.project ? Object.assign(el, item) : el
      );
    },
    changeProjectList(moduleId, flag) {
      this.projectList[moduleId].checked = flag;
    },
    projectDownFocus(moduleId) {
      if (moduleId < this.projectList.length) {
        Array.from(document.getElementsByClassName("projectClass"))[
          moduleId
        ].focus();
      }
    },
    projectUpFocus(moduleId) {
      if (moduleId < this.projectList.length) {
        Array.from(document.getElementsByClassName("projectClass"))[
          moduleId
        ].focus();
      }
    },
  },
  watch: {},
  beforeRouteLeave(to, from, next) {
    var projectSelect = [];
    this.projectList.forEach((element) => {
      element.checked ? projectSelect.push(element.project) : null;
    }, projectSelect);
    localStorage.setItem("project", projectSelect.join(","));
    localStorage.setItem("projectList", JSON.stringify(this.projectList));
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

.projectSelect {
  position: fixed;
  width: 100vw;
  left: 40vw;
  color: #fff;
}

.projectSelect span {
  margin-left: 2vw;
}
</style>
