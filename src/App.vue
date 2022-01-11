<!--
@author: zhou.mo
@since : 2021/11/03
-->
<template>
  <el-container>
    <el-header>
      <img
        src="./assets/byd.png"
        alt="BYD-logo"
        class="header-logo"
        @click="toggle"
      />
      <h3 name="title">{{ title }}</h3>
      <span v-if="isBoardPage">{{ leftTime }}S</span>
    </el-header>
    <el-main class="main">
      <el-container>
        <el-aside v-if="openMenu">
          <el-menu name="menu" router class="el-menu-vertical-demo">
            <el-menu-item index="/dashboard" name="dashboard">
              <i class="el-icon-data-board"></i>
              <span slot="title">{{ $t("L0004") }}</span>
            </el-menu-item>
            <el-menu-item index="/factorySelect" name="factorySelect">
              <i class="el-icon-s-home"></i>
              <span slot="title">{{ $t("L0005") }}</span>
            </el-menu-item>
            <el-menu-item index="/departmentSelect" name="departmentSelect">
              <i class="el-icon-s-management"></i>
              <span slot="title">{{ $t("L0006") }}</span>
            </el-menu-item>
            <el-menu-item index="/workshopSelect" name="workshopSelect">
              <i class="el-icon-s-shop"></i>
              <span slot="title">{{ $t("L0007") }}</span>
            </el-menu-item>
            <el-menu-item index="/projectSelect" name="projectSelect">
              <i class="el-icon-user-solid"></i>
              <span slot="title">{{ $t("L0008") }}</span>
            </el-menu-item>
            <el-menu-item index="/processSelect" name="processSelect">
              <i class="el-icon-tickets"></i>
              <span slot="title">{{ $t("L0012") }}</span>
            </el-menu-item>
            <el-menu-item index="/refreshRate" name="refreshRate">
              <i class="el-icon-refresh"></i>
              <span slot="title">{{ $t("L0009") }}</span>
            </el-menu-item>
            <el-menu-item index="/moduleSelect" name="moduleSelect">
              <i class="el-icon-menu"></i>
              <span slot="title">{{ $t("L0010") }}</span>
            </el-menu-item>
            <el-menu-item index="/languageSelect" name="languageSelect">
              <i class="el-icon-s-grid"></i>
              <span slot="title">{{ $t("L0003") }}</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        <el-main>
          <!-- <keep-alive> -->
          <router-view v-if="isRouterAlive"></router-view>
          <!-- </keep-alive> -->
        </el-main>
      </el-container>
    </el-main>
    <el-footer class="footer">&copy; Copyright {{ $t("L0011") }}</el-footer>
  </el-container>
</template>

<script>
import Utils from '@/assets/js/util.js';
import {mapState} from 'vuex';

export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  created() {
    if (!window.sessionStorage.getItem("locale")) {
      this.$store.commit("setTitle", this.$t("L0003"));
    } else {
      this.$store.commit("setTitle", this.$t("L0004"));
    }
  },
  data() {
    return {
      isRouterAlive: true,
      openMenu: false,
      nextFocusPath: "",
      previousFocusPath: "",
      leftTime: localStorage.getItem("rate") ? localStorage.getItem("rate") / 1000 : 60,
    };
  },
  mounted: function () {
    this.monitor();
    var that = this;
    Utils.$on("getLefttime", function (leftTime) {
      that.getLefttime(leftTime);
    });
  },
  watch: {},
  computed: {
    title() {
      return this.$store.state.title;
    },
    ...mapState({
      isBoardPage:(state) => state.title.includes("看板")||state.title.includes("Board") ? true : false
    })
  },
  methods: {
    getLefttime(leftTime){
      this.leftTime = leftTime
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    toggle() {
      if (this.openMenu) {
        this.openMenu = false;
      } else {
        this.openMenu = true;
      }
    },
    nextFocus(currentPath) {
      switch (currentPath) {
        case "dashboard":
          this.nextFocusPath = "factorySelect";
          this.$store.commit("setTitle", this.$t("L0005"));
          break;
        case "factorySelect":
          this.nextFocusPath = "departmentSelect";
          this.$store.commit("setTitle", this.$t("L0006"));
          break;
        case "departmentSelect":
          this.nextFocusPath = "workshopSelect";
          this.$store.commit("setTitle", this.$t("L0007"));
          break;
        case "workshopSelect":
          this.nextFocusPath = "projectSelect";
          this.$store.commit("setTitle", this.$t("L0008"));
          break;
        case "projectSelect":
          this.nextFocusPath = "processSelect";
          this.$store.commit("setTitle", this.$t("L0012"));
          break;
        case "processSelect":
          this.nextFocusPath = "refreshRate";
          this.$store.commit("setTitle", this.$t("L0009"));
          break;
        case "refreshRate":
          this.nextFocusPath = "moduleSelect";
          this.$store.commit("setTitle", this.$t("L0010"));
          break;
        case "moduleSelect":
          this.nextFocusPath = "languageSelect";
          this.$store.commit("setTitle", this.$t("L0003"));
          break;
        case "languageSelect":
          this.nextFocusPath = "dashboard";
          this.$store.commit("setTitle", this.$t("L0004"));
          break;
        default:
          this.nextFocusPath = "factorySelect";
          break;
      }
    },
    previousFocus(currentPath) {
      switch (currentPath) {
        case "dashboard":
          this.previousFocusPath = "languageSelect";
          this.$store.commit("setTitle", this.$t("L0003"));
          break;
        case "factorySelect":
          this.previousFocusPath = "dashboard";
          this.$store.commit("setTitle", this.$t("L0004"));
          break;
        case "departmentSelect":
          this.previousFocusPath = "factorySelect";
          this.$store.commit("setTitle", this.$t("L0005"));
          break;
        case "workshopSelect":
          this.previousFocusPath = "departmentSelect";
          this.$store.commit("setTitle", this.$t("L0006"));
          break;
        case "projectSelect":
          this.previousFocusPath = "workshopSelect";
          this.$store.commit("setTitle", this.$t("L0007"));
          break;
        case "processSelect":
          this.previousFocusPath = "projectSelect";
          this.$store.commit("setTitle", this.$t("L0008"));
          break;
        case "refreshRate":
          this.previousFocusPath = "processSelect";
          this.$store.commit("setTitle", this.$t("L0012"));
          break;
        case "moduleSelect":
          this.previousFocusPath = "refreshRate";
          this.$store.commit("setTitle", this.$t("L0009"));
          break;
        case "languageSelect":
          this.previousFocusPath = "moduleSelect";
          this.$store.commit("setTitle", this.$t("L0010"));
          break;
        default:
          this.previousFocusPath = "languageSelect";
          this.$store.commit("setTitle", this.$t("L0003"));
          break;
      }
    },
    monitor: function () {
      var that = this;
      document.onkeydown = function (e) {
        //按下回车提交
        let target = e.srcElement || e.target;
        let key = window.event.keyCode;
        // 事件中 keycode=82为menu事件，先用49=数字1键代替
        if (key == 82) {
          that.toggle();
          if (that.openMenu) {
            setTimeout(() => {
              if (that.$route.path == "/") {
                let el = document.getElementsByName("dashboard")[0];
                el.focus();
              } else {
                let el = document.getElementsByName(
                  that.$route.path.substr(1)
                )[0];
                el.focus();
              }
            }, 100);
          } else {
            // that.$router.go(0);//重新加载实在太影响用户体验
            if (
              (that.$route.path.substr(1) == "" &&
                !window.sessionStorage.getItem("locale")) ||
              that.$route.path.substr(1) == "languageSelect"
            ) {
              switch (window.sessionStorage.getItem("locale")) {
                case "zh":
                  document.getElementsByClassName("langClass")[0].focus();
                  break;
                case "en":
                  document.getElementsByClassName("langClass")[1].focus();
                  break;
                default:
                  document.getElementsByClassName("langClass")[0].focus();
                  break;
              }
            } else if (that.$route.path.substr(1) == "departmentSelect") {
              //document.getElementsByClassName("departmentClass")[that.$store.state.departmentIndex].focus();
            } else if (that.$route.path.substr(1) == "factorySelect") {
              //document.getElementsByClassName("factoryClass")[that.$store.state.factoryIndex].focus();
            } else if (
              (that.$route.path.substr(1) == "" &&
                window.sessionStorage.getItem("locale")) ||
              that.$route.path.substr(1) == "dashboard"
            ) {
              return;
            } else {
              return;
            }
          }
        } else if (key == 40) {
          if (that.openMenu) {
            that.nextFocus(that.$route.path.substr(1));
            document.getElementsByName(that.nextFocusPath)[0].focus();
            that.$router.push({
              path: `/${that.nextFocusPath}`,
            });
          }else{
            if(that.$route.path.substr(1)=='moduleSelect'){
              Utils.$emit('downFocus',target.tabIndex)
            }else if(that.$route.path.substr(1)=='departmentSelect'){
              Utils.$emit('departmentDownFocus')
            }else if(that.$route.path.substr(1)=='workshopSelect'){
              Utils.$emit('workshopDownFocus')
            }else if(that.$route.path.substr(1)=='projectSelect'){
              Utils.$emit('projectDownFocus')
            }else if(that.$route.path.substr(1)=='processSelect'){
              Utils.$emit('processDownFocus')
            }
          }          
        } else if (key == 38) {
          if (that.openMenu) {
            that.previousFocus(that.$route.path.substr(1));
            document.getElementsByName(that.previousFocusPath)[0].focus();
            that.$router.push({
              path: `/${that.previousFocusPath}`,
            });
          }else{ 
            if(that.$route.path.substr(1)=='moduleSelect'){
              Utils.$emit('upFocus',target.tabIndex)
            }else if(that.$route.path.substr(1)=='departmentSelect'){
              Utils.$emit('departmentUpFocus')
            }else if(that.$route.path.substr(1)=='workshopSelect'){
              Utils.$emit('workshopUpFocus')
            }else if(that.$route.path.substr(1)=='projectSelect'){
              Utils.$emit('projectUpFocus')
            }else if(that.$route.path.substr(1)=='processSelect'){
              Utils.$emit('processUpFocus')
            }
          }          
        } else if (key == 13) {
          if(that.$route.path.substr(1)=='moduleSelect'){
            Utils.$emit('moduleFocus')
            target.checked = !target.checked
            if(target.tabIndex>0){
              Utils.$emit('changeModulelist',target.tabIndex,target.checked)
            }            
          }else if(that.$route.path.substr(1)=='departmentSelect'){
            that.openMenu?Utils.$emit('departmentFocus'):null
            target.checked = !target.checked
            // if(target.tabIndex>0){
            //   Utils.$emit('changeDepartmentlist',target.checked)
            // } 
            !that.openMenu?Utils.$emit('changeDepartmentlist',target.checked):null
          }else if(that.$route.path.substr(1)=='workshopSelect'){
            that.openMenu?Utils.$emit('workshopFocus'):null
            target.checked = !target.checked
            !that.openMenu?Utils.$emit('changeWorkshopList',target.checked):null
          }else if(that.$route.path.substr(1)=='projectSelect'){
            that.openMenu?Utils.$emit('projectFocus'):null
            target.checked = !target.checked
            !that.openMenu?Utils.$emit('changeProjectList',target.checked):null
          }else if(that.$route.path.substr(1)=='processSelect'){
            that.openMenu?Utils.$emit('processFocus'):null
            target.checked = !target.checked
            !that.openMenu?Utils.$emit('changeProcessList',target.checked):null
          }
        }
      };
    },
  },
};
</script>
