<template>
  <el-container class="boartContainer">
    <div v-if="isMacStatus">
      <el-row class="chartPart">
        <el-col :span="6">
          <chart-area :data="pieData"></chart-area>
        </el-col>
        <el-col :span="12">
          <chart-area :data="multiBarData"></chart-area>
        </el-col>
        <el-col :span="6">
          <chart-area :data="barData"></chart-area>
        </el-col>
      </el-row>
      <el-row class="distributionPart">
        <distri-area :data="distributionData"></distri-area>
      </el-row>
    </div>
    <div v-if="!isMacStatus">
      <el-row class="chartPart">
        <el-col :span="6">
          <chart-area :data="cutterPieData"></chart-area>
        </el-col>
        <el-col :span="12">
          <chart-area :data="cutterMultiBarData"></chart-area>
        </el-col>
        <el-col :span="6">
          <chart-area :data="cutterBarData"></chart-area>
        </el-col>
      </el-row>
      <el-row class="distributionPart">
        <cutterDistri-area :data="cutterDistributionData"></cutterDistri-area>
      </el-row>
    </div>
  </el-container>
</template>

<script>
import chartArea from "@/components/Chart.vue";
import distriArea from "@/components/DistriArea.vue";
import cutterDistriArea from "@/components/CutterDistriArea.vue";
import Utils from "../assets/js/util.js";
import interfaceFunc from "../plugins/interfaceFunc.js";

let leftTime = localStorage.getItem("rate")
  ? localStorage.getItem("rate") / 1000
  : 60;
let pieOption = {
  title: {
    text: "机台状态统计",
    left: "right",
    textStyle: {
      fontSize: 14,
      color: "#fff",
    },
  },
  textStyle: {
    fontSize: 10,
  },
  color: ["green", "yellow", "pink", "grey"],
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
    textStyle: {
      fontSize: "12",
      color: "#fff",
    },
    lineStyle: {
      width: 0,
    },
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: "60%",
      center: ["65%", "60%"],
      labelLine: {
        length: 5,
        length2: 5,
      },
      label: {
        fontSize: 12,
        color: "#fff",
      },
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

let multiBarOption = {
  title: {
    text: "机台七日产出达成统计",
    left: "center",
    textStyle: {
      fontSize: 14,
      color: "#fff",
    },
  },
  color: ["blue", "orange", "pink", "grey"],
  xAxis: {
    type: "category",
    data: [],
    axisLabel: {
      show: true,
      textStyle: {
        color: "#fff",
      },
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: false,
    },
  },
  series: [],
  grid: {
    width: 400,
    height: 70,
    top: 30,
  },
  legend: {
    show: true,
    orient: "vertical",
    left: "10%",
    align: "left",
    itemGap: 0,
    textStyle: {
      color: "#fff",
      fontSize: 9,
    },
  },
};

let barOption = {
  title: {
    text: "机台产出达标统计",
    left: "center",
    textStyle: {
      fontSize: 14,
      color: "#fff",
    },
  },
  color: ["green", "pink", "pink", "grey"],
  xAxis: {
    type: "category",
    data: [],
    axisLabel: {
      show: true,
      textStyle: {
        color: "#fff",
      },
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: false,
    },
  },
  grid: {
    width: 200,
    height: 70,
    top: 30,
  },
  series: [
    {
      data: [],
      type: "bar",
      itemStyle: {
        normal: {
          color: function (params) {
            var colorList = [
              "#27727B",
              "#C1232B",
              "#FE8463",
              "#9BCA63",
              "#FAD860",
              "#F3A43B",
              "#60C0DD",
              "#D7504B",
              "#C6E579",
              "#F4E001",
              "#F0805A",
              "#26C0C0",
              "#B5C334",
              "#FCCE10",
              "#E87C25",
            ];
            return colorList[params.dataIndex];
          },
        },
      },
      label: {
        show: true,
        position: "top",
        distance: -10,
        verticalAlign: "middle",
        textStyle: {
          color: "white",
          fontSize: 10,
        },
      },
    },
  ],
};

//刀具寿命
let cutterPieOption = {
  title: {
    text: "刀具寿命统计",
    left: "right",
    textStyle: {
      fontSize: 14,
      color: "#fff",
    },
  },
  textStyle: {
    fontSize: 10,
  },
  color: ["green", "yellow", "pink", "grey"],
  tooltip: {
    trigger: "item",
  },
  legend: {
    orient: "vertical",
    left: "left",
    itemGap: 0,
    textStyle: {
      fontSize: "12",
      color: "#fff",
    },
    lineStyle: {
      width: 0,
    },
  },
  series: [
    {
      name: "",
      type: "pie",
      radius: "60%",
      center: ["65%", "60%"],
      labelLine: {
        length: 5,
        length2: 5,
      },
      label: {
        fontSize: 12,
        color: "#fff",
      },
      data: [],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: "rgba(0, 0, 0, 0.5)",
        },
      },
    },
  ],
};

let cutterMultiBarOption = {
  title: {
    text: "三日换刀数量统计",
    left: "center",
    textStyle: {
      fontSize: 14,
      color: "#fff",
    },
  },
  color: ["blue", "orange"],
  xAxis: {
    type: "category",
    data: [],
    axisLabel: {
      show: true,
      textStyle: {
        color: "#fff",
      },
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: false,
    },
  },
  series: [],
  grid: {
    width: 400,
    height: 70,
    top: 30,
  },
  legend: {
    show: true,
    orient: "vertical",
    left: "10%",
    align: "left",
    textStyle: {
      color: "#fff",
    },
  },
};

let cutterBarOption = {
  title: {
    text: "今日换刀寿命统计",
    left: "center",
    textStyle: {
      fontSize: 14,
      color: "#fff",
    },
  },
  color: ["green", "pink"],
  xAxis: {
    type: "category",
    data: [],
    axisLabel: {
      show: true,
      textStyle: {
        color: "#fff",
      },
    },
  },
  yAxis: {
    type: "value",
    splitLine: {
      show: false,
    },
  },
  grid: {
    width: 200,
    height: 70,
    top: 30,
  },
  series: [
    {
      data: [],
      type: "bar",
      itemStyle: {
        normal: {
          color: function (params) {
            var colorList = [
              "#27727B",
              "#C1232B",
              "#FE8463",
              "#9BCA63",
              "#FAD860",
              "#F3A43B",
              "#60C0DD",
              "#D7504B",
              "#C6E579",
              "#F4E001",
              "#F0805A",
              "#26C0C0",
              "#B5C334",
              "#FCCE10",
              "#E87C25",
            ];
            return colorList[params.dataIndex];
          },
        },
      },
      label: {
        show: true,
        position: "top",
        distance: -10,
        verticalAlign: "middle",
        textStyle: {
          color: "white",
          fontSize: 10,
        },
      },
    },
  ],
};

export default {
  name: "Dashboard",
  created() {
    this.factory = localStorage.getItem("factory")
      ? localStorage.getItem("factory")
      : "";
    this.department = localStorage.getItem("department")
      ? localStorage.getItem("department")
      : null;
    this.workshop = localStorage.getItem("workshop")
      ? localStorage.getItem("workshop")
      : null;
    this.project = localStorage.getItem("project")
      ? localStorage.getItem("project")
      : null;
    this.rateTotal = localStorage.getItem("rate")
      ? localStorage.getItem("rate") / 1000
      : 60; //每种看板Process切换的总时间
    this.factory ? null : this.$message.error("请先选择工厂！");
    !localStorage.getItem("moduleList") &&
    typeof localStorage.getItem("moduleList") != "undefined"
      ? this.$message.error("请先选择看板")
      : JSON.parse(localStorage.getItem("moduleList")).forEach((element) => {
          element.checked ? this.boardArray.push(element.module) : null;
        });
    //不选择夹次则默认传入所有的夹次，否则取选中的夹次
    this.processArray = localStorage.getItem("process")
      ? localStorage.getItem("process").split(",")
      : [];
    if (this.processArray.length == 0) {
      let res = this.$store.state.configData;
      this.processArray = interfaceFunc.getProcessType(this.factory, res);
      if (this.processArray.length == 0) {
        this.$message.error("选中的工厂无夹次，请选择别的工厂！");
      }
    }
    //title值匹配及调用接口处理逻辑
    let boardTitleArray = [];
    if (this.boardArray.length > 0 && this.processArray.length > 0) {
      this.boardArray.forEach((element) => {
        this.processArray.forEach((el) => {
          boardTitleArray.push({
            boardName: element,
            processName: el,
          });
        });
      });
      let macParamArray = [];
      boardTitleArray.forEach((el) => {
        el.boardName === "状态产出看板" ? macParamArray.push(el) : null;
      }, macParamArray);
      let propParamArray = [];
      boardTitleArray.forEach((el) => {
        el.boardName === "刀具寿命看板" ? propParamArray.push(el) : null;
      });
      macParamArray.length > 0
        ? (this.isMacStatus = true)
        : (this.isMacStatus = false);
      this.boardTitleArray[0].paramArray = macParamArray;
      this.boardTitleArray[1].paramArray = propParamArray;
      this.isMacStatus ? (this.pageIndex = 0) : (this.pageIndex = 1);
      this.$store.commit(
        "setTitle",
        this.boardTitleArray[this.pageIndex].paramArray[0].boardName +
          "-" +
          this.boardTitleArray[this.pageIndex].paramArray[0].processName
      );
      this.boardArray.includes("状态产出看板")
        ? (this.isMacStatus = true)
        : (this.isMacStatus = false);
      this.isMacStatus
        ? this.getStatusAndOutputData(
            this.factory,
            this.department,
            this.workshop,
            this.project,
            this.boardTitleArray[this.pageIndex].paramArray[0].processName
          )
        : this.getPropLiftData(
            this.factory,
            this.department,
            this.workshop,
            this.project,
            this.boardTitleArray[this.pageIndex].paramArray[0].processName
          );
    }
  },
  components: {
    chartArea,
    distriArea,
    cutterDistriArea,
  },
  data() {
    return {
      pieData: pieOption,
      multiBarData: multiBarOption,
      barData: barOption,
      distributionData: [],
      isMacStatus: true, //看板切换flag
      cutterPieData: cutterPieOption,
      cutterMultiBarData: cutterMultiBarOption,
      cutterBarData: cutterBarOption,
      cutterDistributionData: [],
      boardArray: [],
      processArray: [],
      boardTitleArray: [
        { boardId: 0, paramArray: [] },
        { boardId: 1, paramArray: [] },
      ],
      pageIndex: 0, //boardIndex
      processPage: 1,
      factory:"",
      department:null,
      workshop:null,
      project:null,
      rateTotal:60
    };
  },
  mounted() {
    var that = this;
    that.timer = setInterval(that.leftTimer, 1000);
    Utils.$on("rateRefresh", function (refreshRate) {
      that.rateRefresh(refreshRate);
    });
  },
  computed: {
    // isMacStatus(){
    //   return this.$store.state.isMacStatus;
    // }
  },
  watch: {},
  methods: {
    rateRefresh(refreshRate) {
      leftTime = refreshRate;
    },
    leftTimer() {
      if (leftTime > 0) {
        leftTime--;
        //每种看板的夹次切换逻辑
        if (
          this.processPage !=
            this.boardTitleArray[this.pageIndex].paramArray.length &&
          leftTime <=
            this.rateTotal -
              (this.rateTotal /
                this.boardTitleArray[this.pageIndex].paramArray.length) *
                this.processPage
        ) {
          this.$store.commit(
            "setTitle",
            this.boardTitleArray[this.pageIndex].paramArray[this.processPage]
              .boardName +
              "-" +
              this.boardTitleArray[this.pageIndex].paramArray[this.processPage]
                .processName
          );
          this.isMacStatus
            ? this.getStatusAndOutputData(
                this.factory,
                this.department,
                this.workshop,
                this.project,
                this.boardTitleArray[this.pageIndex].paramArray[
                  this.processPage
                ].processName
              )
            : this.getPropLiftData(
                this.factory,
                this.department,
                this.workshop,
                this.project,
                this.boardTitleArray[this.pageIndex].paramArray[
                  this.processPage
                ].processName
              );
          this.processPage++;
        }
      } else {
        this.processPage = 1;
        leftTime = localStorage.getItem("rate")
          ? localStorage.getItem("rate") / 1000
          : 60;
        if (this.boardArray.length > 1) {
          this.isMacStatus = !this.isMacStatus;
          this.pageIndex = this.isMacStatus ? 0 : 1;
        }
        this.$store.commit(
          "setTitle",
          this.boardTitleArray[this.pageIndex].paramArray[0].boardName +
            "-" +
            this.boardTitleArray[this.pageIndex].paramArray[0].processName
        );
        this.isMacStatus
          ? this.getStatusAndOutputData(
              this.factory,
              this.department,
              this.workshop,
              this.project,
              this.boardTitleArray[this.pageIndex].paramArray[0].processName
            )
          : this.getPropLiftData(
              this.factory,
              this.department,
              this.workshop,
              this.project,
              this.boardTitleArray[this.pageIndex].paramArray[0].processName
            );
      }
      Utils.$emit("getLefttime", leftTime);
    },
    getStatusAndOutputData(factory, department, workshop, project, process) {
      this.$http.axios
        .post(
          `${this.$http.pre_url}board4MachineStatusAndOutputData&withNoPwd=1&factory=${factory}&department=${department}&workshop=${workshop}&projectName=${project}&processType=${process}`
        )
        .then((res) => {
          //机台状态统计
          let machineStateList = res.machineStateList[0].data;
          this.pieData.series[0].data = res.machineStateList[0].data.map(
            (el) => {
              return {
                name: el.name,
                value: el.y,
              };
            }
          );
          this.pieData.series[0].label.formatter = function (param) {
            param.name = Number(param.percent).toFixed(0) + "%";
            return param.name;
          };
          this.pieData.legend.formatter = function (params) {
            if (machineStateList.length > 0) {
              switch (params) {
                case "正常":
                  params = params + ":" + machineStateList[0].y;
                  break;
                case "待机":
                  params = params + ":" + machineStateList[1].y;
                  break;
                case "调机":
                  params = params + ":" + machineStateList[2].y;
                  break;
                case "离线":
                  params = params + ":" + machineStateList[3].y;
                  break;
                default:
                  params = "";
              }
              return params;
            }
          };
          //机台七日产出达成
          this.multiBarData.xAxis.data = [];
          this.multiBarData.series = [];
          this.multiBarData.xAxis.data = res.colChart1Categories;
          this.multiBarData.series = res.colChart1Series.map((el) => {
            return {
              type: "bar",
              data: el.data,
              name: el.name,
              label: {
                show: true,
                rotate: 70,
                position: "top",
                distance: 0,
                verticalAlign: "middle",
                textStyle: {
                  color: "white",
                  fontSize: 10,
                },
              },
            };
          });
          //机台产出达标统计
          this.barData.xAxis.data = [];
          this.barData.series[0].data = [];
          this.barData.xAxis.data.push(res.colChart2Series[0].name);
          this.barData.xAxis.data.push(res.colChart2Series[1].name);
          this.barData.series[0].data.push(res.colChart2Series[0].data[0]);
          this.barData.series[0].data.push(res.colChart2Series[1].data[0]);
          //机台排布图
          let machineDataList = res.machineDataList.map((el) => {
            return Object.assign(
              {},
              { rowName: el.location.split("-")[0] },
              { locIndex: el.location.split("-")[el.location.split("-").length-1] },
              el
            );
          });
          this.distributionData = res.leftBar.map((barIndex) => {
            let machineDataRow = [];
            machineDataList.map((el) => {
              if (barIndex == el.rowName) {
                machineDataRow.push(el);
              }
            });
            return Object.assign(
              {},
              { rowName: barIndex },
              {
                // machineDataRow: machineDataRow.map((item, index) => {
                //   item.index = index;
                //   if ((index + 1) % 39 == 0) {
                //     item = {};
                //     index++;
                //   }
                //   return item;
                // }),
                machineDataRow: machineDataRow
              }
            );
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPropLiftData(factory, department, workshop, project, process) {
      //刀具寿命
      // var cutterFormData = new FormData();
      // cutterFormData.append("workshop", "");
      this.$http.axios
        .post(
          `${this.$http.pre_url}board4MachinePropLiftData&withNoPwd=1&factory=${factory}&department=${department}&workshop=${workshop}&projectName=${project}&processType=${process}`
        )
        .then((res) => {
          //刀具寿命统计
          let propLifeStateList = res.propLifeStateList[0].data;
          this.cutterPieData.series[0].data = res.propLifeStateList[0].data.map(
            (el) => {
              return {
                name: el.name,
                value: el.y,
              };
            }
          );
          this.cutterPieData.series[0].label.formatter = function (param) {
            param.name = Number(param.percent).toFixed(0) + "%";
            return param.name;
          };
          this.cutterPieData.legend.formatter = function (params) {
            if (propLifeStateList.length > 0) {
              switch (params) {
                case "正常":
                  params = params + ":" + propLifeStateList[0].y;
                  break;
                case "寿命预警":
                  params = params + ":" + propLifeStateList[1].y;
                  break;
                case "寿命到期":
                  params = params + ":" + propLifeStateList[2].y;
                  break;
                case "离线":
                  params = params + ":" + propLifeStateList[3].y;
                  break;
                default:
                  params = "";
              }
              return params;
            }
          };
          //几日换刀数量统计
          this.cutterMultiBarData.xAxis.data = [];
          this.cutterMultiBarData.series = [];
          this.cutterMultiBarData.xAxis.data = res.clipChangePnChartCategories;
          this.cutterMultiBarData.series =
            res.clipChangePnChartSeries[0].series.map((el) => {
              return {
                type: "bar",
                data: el.data,
                name: el.name,
                label: {
                  show: true,
                  rotate: 70,
                  position: "top",
                  distance: 0,
                  verticalAlign: "middle",
                  textStyle: {
                    color: "white",
                    fontSize: 10,
                  },
                },
              };
            });
          //换刀寿命统计
          this.cutterBarData.xAxis.data = [];
          this.cutterBarData.series[0].data = [];
          this.cutterBarData.xAxis.data.push(res.clipChangePnFitSeries[0].name);
          this.cutterBarData.xAxis.data.push(res.clipChangePnFitSeries[1].name);
          this.cutterBarData.series[0].data.push(
            res.clipChangePnFitSeries[0].data[0]
          );
          this.cutterBarData.series[0].data.push(
            res.clipChangePnFitSeries[1].data[0]
          );
          //刀具寿命排布图
          let cutterMachineDataList = res.machineDataList.map((el) => {
            return Object.assign(
              {},
              { rowName: el.location.split("-")[0] },
              { locIndex: el.location.split("-")[el.location.split("-").length-1] },
              el
            );
          });
          this.cutterDistributionData = res.leftBar.map((barIndex) => {
            let machineDataRow = [];
            cutterMachineDataList.map((el) => {
              if (barIndex == el.rowName) {
                machineDataRow.push(el);
              }
            });
            return Object.assign(
              {},
              { rowName: barIndex },
              {
                // machineDataRow: machineDataRow.map((item, index) => {
                //   item.index = index;
                //   if ((index + 1) % 39 == 0) {
                //     item = {
                //       horizontalAxis: 41,
                //       index: index,
                //       locIndex: "",
                //       location: "",
                //       propLife: [
                //         { color: "", name: "", state: "", surplusLife: "" },
                //         { color: "", name: "", state: "", surplusLife: "" },
                //       ],
                //       rowName: "",
                //       useState: "",
                //       verticalAxis: "",
                //     };
                //     index++;
                //   }
                //   return item;
                // }),
                machineDataRow: machineDataRow
              }
            );
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style scoped>
.boartContainer {
  display: block;
}
.chartPart {
  height: 26vh;
  width: 100vw;
}
.chartPart div {
  min-width: 200px;
  min-height: 120px;
}
#container {
  width: 100%;
  height: 100%;
}
.distributionPart {
  height: 55vh;
  width: 100vw;
}
</style>
