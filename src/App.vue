<script setup>
import { onMounted } from 'vue';
import HelloWorld from './components/HelloWorld.vue'
import loadScript from './load-script'
// onMounted(() => {
//   loadScript('https://api.map.baidu.com/api?v=3.0&ak=YdV86UHS5z2bhGYesTEOEA8SLGgiF1rw&callback=_initBaiduMap').then(() => {
//     var map = new BMap.Map("map-container");
//     var point = new BMap.Point(116.404, 39.915);
//     map.centerAndZoom(point, 15);
//     setTimeout(() => {
//       map.setMapStyleV2({
//         styleId: 'debda8b2803eb06b64a2d3a9b6af2da8'
//       });
//     }, 1000);
//   })
//   // console.log(map);
//   // map.centerAndZoom('上海');
//   // map.setMapStyleV2({
//   //   styleId: 'debda8b2803eb06b64a2d3a9b6af2da8'
//   // });
// })
</script>

<template>
  <div class="relative" style="width: 670px; height: 442px; overflow: hidden;">
    <HelloWorld />
    <!-- <div id="map-container" style="width: 100%; height: 100%; position: absolute;"></div> -->
  </div>
</template>
