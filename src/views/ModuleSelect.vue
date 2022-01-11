<template>
  <el-main>
    <div
      ref="moduleGroup"
      name="checkModule"
      class="moduleSelect"
      v-for="item in moduleList"
      :key="item.$index"
      :style="{'top':item.topStyle}"
    >
      <input
        :tabIndex="item.id"
        type="checkbox"
        name="module"
        class="moduleClass"
        v-model="item.checked"
        :checked="item.checked"
        @click="changeModule(item)"
      />
      <span>{{ item.module }}</span>
    </div>
  </el-main>
</template>

<script>
import Utils from "../assets/js/util.js";

export default {
  created() {
    this.$store.commit("setTitle", this.$t("L0010"));
    this.moduleList = [
      { id: "1", module: "状态产出看板", checked: false, topStyle:'15vh' },
      { id: "2", module: "刀具寿命看板", checked: false, topStyle:'25vh'},
    ];
  },
  data() {
    return {
      moduleList: [],
      focusIndex:0
    };
  },
  mounted() {
    var that = this;
    that.moduleList = JSON.parse(localStorage.getItem('moduleList'))?JSON.parse(localStorage.getItem('moduleList')):that.moduleList;
    that.focusIndex = that.moduleList.findIndex((el)=>el.checked)>-1?that.moduleList.findIndex((el)=>el.checked):0;
    Utils.$on('moduleFocus',function(){
      that.getFocus(that.focusIndex);
    })
    Utils.$on('changeModulelist',function(moduleId,flag){
      that.changeModulelist(moduleId,flag);
    })
    Utils.$on('downFocus',function(moduleId){
      moduleId = moduleId==that.moduleList.length?moduleId-1:(moduleId==(that.moduleList.length-1)?moduleId:moduleId+1)
      that.downFocus(moduleId);
    })
    Utils.$on('upFocus',function(moduleId){
      moduleId = moduleId<1?0:(moduleId==that.moduleList.length?moduleId-2:moduleId-1);
      that.upFocus(moduleId);
    })
  },
  methods: {
    getFocus(index){
      Array.from(document.getElementsByClassName("moduleClass"))[index].focus();
    },
    changeModule(item){
      this.moduleList.every(el=>(el.module===item.module?Object.assign(el,item):el))
    },
    changeModulelist(moduleId,flag){
      this.moduleList[moduleId-1].checked = flag;
    },
    downFocus(moduleId){
      if(moduleId<this.moduleList.length){
        Array.from(document.getElementsByClassName("moduleClass"))[moduleId].focus();
      }
    },
    upFocus(moduleId){
      if(moduleId<this.moduleList.length){
        Array.from(document.getElementsByClassName("moduleClass"))[moduleId].focus();
      }
    }
  },
  watch: {
    
  },
  beforeRouteLeave (to, from, next) {
    localStorage.setItem('moduleList',JSON.stringify(this.moduleList))
    next();
  }
};
</script>

<style>
.boardSelect {
  margin-top: 5vh;
  width: 100vw;
  text-align: left;
}

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

.moduleSelect {
  position: fixed;
  width: 100vw;
  left: 40vw;
  color: #fff;
}

.moduleSelect span {
  margin-left: 2vw;
}
</style>
