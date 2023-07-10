<template>
  <div style="width: 100%; height: 100%;">
    <v-chart class="chart" :option="option" ref="map" @click="handleClick" />
  </div>
</template>

<script setup>
import { provinces } from './mapcode'
import { onMounted } from "vue";
import { getMapJson, getOption } from "./index";
import getLoadMap from './loadMap'
import { use, registerMap, } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart, MapChart, ScatterChart, EffectScatterChart  } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
  GridComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";


const map = ref()

let loadMap = null

const getUrl = (code) => {
  return `https://geo.datav.aliyun.com/areas_v3/bound/${code}_full.json`
}

onMounted(() => {
  loadMap = getLoadMap(map.value, registerMap)
  loadMap.init(getUrl(410000), '河南省', [])
})

const handleClick = (params) => {
  const code = provinces[params.name]
  if (code) {
    loadMap.init(getUrl(code), params.name, [])
  }
}



use([
  CanvasRenderer,
  PieChart,
  MapChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  VisualMapComponent,
  GridComponent,
  ScatterChart,
  EffectScatterChart 
]);

provide(THEME_KEY, "dark");

const option = ref();
</script>

<style >
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>