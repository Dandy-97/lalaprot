<template>
  <div>
    <h2>销售统计</h2>
    <div id="myTab"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { getEchartsData } from "@/apis/apis";

export default {
  mounted() {
    // 1. 初始化
    var myCharts = echarts.init(document.getElementById("myTab"));

    // 初始化数据 -> 拿到axios数据以后，才进行渲染！！！
    getEchartsData().then((res) => {
      var titleArr = []; //标题数组
      var valueArr = []; //value数组
 
      var obj = res.data[0];
      for (let key in obj) {
        titleArr.push(key);
        valueArr.push(obj[key]);
      }
      // 2. 拿到配置对象option
      var option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            data: titleArr,
            axisTick: {
              alignWithLabel: true,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            barWidth: "60%",
            data: valueArr,
          },
        ],
      };
      // 3. 把配置对象传入给echarts实例对象，进行表格渲染
      myCharts.setOption(option);
    });
  },
};
</script>

<style lang="less" scoped>
#myTab {
  width: 100%;
  height: 500px;
}
</style>