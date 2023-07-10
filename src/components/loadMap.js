var points = [
  { value: [118.8062, 31.9208], itemStyle: { color: '#4ab2e5' } }
  , { value: [127.9688, 45.368], itemStyle: { color: '#4fb6d2' } }
  , { value: [110.3467, 41.4899], itemStyle: { color: '#52b9c7' } }
  , { value: [125.8154, 44.2584], itemStyle: { color: '#5abead' } }
  , { value: [116.4551, 40.2539], itemStyle: { color: '#f34e2b' } }
  , { value: [123.1238, 42.1216], itemStyle: { color: '#f56321' } }
  , { value: [114.4995, 38.1006], itemStyle: { color: '#f56f1c' } }
  , { value: [117.4219, 39.4189], itemStyle: { color: '#f58414' } }
  , { value: [112.3352, 37.9413], itemStyle: { color: '#f58f0e' } }
  , { value: [109.1162, 34.2004], itemStyle: { color: '#f5a305' } }
  , { value: [103.5901, 36.3043], itemStyle: { color: '#e7ab0b' } }
  , { value: [106.3586, 38.1775], itemStyle: { color: '#dfae10' } }
  , { value: [101.4038, 36.8207], itemStyle: { color: '#d5b314' } }
  , { value: [103.9526, 30.7617], itemStyle: { color: '#c1bb1f' } }
  , { value: [108.384366, 30.439702], itemStyle: { color: '#b9be23' } }
  , { value: [113.0823, 28.2568], itemStyle: { color: '#a6c62c' } }
  , { value: [102.9199, 25.46639], itemStyle: { color: '#96cc34' } }
  , { value: [119.4543, 25.9222] }
]

class BaseMap {
  constructor(echarts, registerMap) {
    this.echarts = echarts;
    this.registerMap = registerMap;
  }


  // 获取对应的json地图数据，然后向echarts注册该区域的地图，最后加载地图信息
  getMapJson(url) {
    return new Promise((resolve, reject) => {
      fetch(url, {
        mode: 'cors'
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            resolve(data)
          } else {
            reject('无法加载该地图');
          }
        })
        .catch(error => console.error(error));
    })
  }

  init(url, mapName, data) {
    this.getMapJson(url).then(json => {
      this.registerMap(mapName, json);
      this.echarts.setOption(this.getOption(data, mapName));
    })
  }

  getOption() {
    throw new Error('请在子类中重写该方法');
  }

}


class LoadMap extends BaseMap {
  constructor(echarts, registerMap) {
    super(echarts, registerMap);
  }

  // 获取 option
  getOption(data, name) {
    return {
      tooltip: {
        show: true,
      },
      visualMap: {
        type: 'continuous',
        text: ['', ''],
        showLabel: true,
        left: 0,
        right: 0,
        min: 0,
        max: 100,
        inRange: {
          color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096',]
        },
        splitNumber: 0
      },
      geo: {
        map: name,
        zoom: 1.1, //当前视角的缩放比例
        aspectScale: 0.86,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: '100%',
        itemStyle: {
          shadowColor: 'rgba(0,243,255,0.6)',
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 1,
          shadowBlur: 15,
        },
        emphasis: {
          areaColor: 'rgba(0,243,255,1)',
        },
        regions: [{
          name: '南海诸岛',
          itemStyle: {
            areaColor: 'rgb(0,243,255)',
            borderColor: 'rgb(0,243,255)',
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            }
          },
          label: {
            show: false,
            color: '#FFFFFF',
            fontSize: 12,
          },
        }],

      },
      series: [{
        type: 'map',
        mapType: name,
        aspectScale: 0.86,
        zoom: 1.1,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: '100%',
        scaleLimit: { //滚轮缩放的极限控制
          min: 1,
          max: 2
        },
        itemStyle: {
          areaColor: 'rgb(10,60,83)',
          borderColor: 'rgba(0,243,255,0.4)',
          borderWidth: 2,
          label: {
            show: true,
          }
        },
        label: {
          show: true,
          color: "#fff"
        },
        emphasis: {
          itemStyle: {
            areaColor: 'rgb(10,60,83)',
          }
        },
        data: data,
      }]
    }
  }
}


class LoadScaMap extends BaseMap {
  constructor(echarts, registerMap) {
    super(echarts, registerMap);
  }

  // 获取 option
  getOption(data, name) {
    return {
      tooltip: {
        show: true,
        formatter: function (params) {
          if (params.data) return params.name + '：' + params.data['value']
        },
      },
      grid: {
        left: 0,
        right: 0,
      },
      visualMap: {
        type: 'continuous',
        text: ['', ''],
        showLabel: true,
        left: 0,
        right: 0,
        min: 0,
        max: 100,
        inRange: {
          color: ['#edfbfb', '#b7d6f3', '#40a9ed', '#3598c1', '#215096',]
        },
        splitNumber: 0
      },
      geo: {
        map: name,
        zoom: 1.1, //当前视角的缩放比例
        aspectScale: 0.86,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: '100%',
        itemStyle: {
          shadowColor: 'rgba(0,243,255,0.6)',
          shadowOffsetX: 0,
          shadowOffsetY: 15,
          opacity: 1,
          shadowBlur: 15,
        },
        emphasis: {
          areaColor: 'rgba(0,243,255,1)',
        },
        regions: [{
          name: '南海诸岛',
          itemStyle: {
            areaColor: 'rgb(0,243,255)',
            borderColor: 'rgb(0,243,255)',
            opacity: 0,
            label: {
              show: false,
              color: "#009cc9",
            }
          },
          label: {
            show: false,
            color: '#FFFFFF',
            fontSize: 12,
          },
        }],

      },
      series: [{
        type: 'map',
        mapType: name,
        aspectScale: 0.86,
        zoom: 1.1,
        layoutCenter: ["50%", "50%"], //地图位置
        layoutSize: '100%',
        scaleLimit: { //滚轮缩放的极限控制
          min: 1,
          max: 2
        },
        itemStyle: {
          areaColor: 'rgb(10,60,83)',
          borderColor: 'rgba(0,243,255,0.4)',
          borderWidth: 2,
          label: {
            show: true,
          }
        },
        label: {
          show: true,
          color: "#fff"
        },
        emphasis: {
          itemStyle: {
            areaColor: 'rgb(10,60,83)',
          }
        },
        data: data,
      },
      {
        type: 'effectScatter',
        coordinateSystem: 'geo',
        showEffectOn: 'render',
        zlevel: 1,
        rippleEffect: {
          period: 15,
          scale: 4,
          brushType: 'fill'
        },
        hoverAnimation: true,
        label: {
          normal: {
            formatter: '{b}',
            position: 'right',
            offset: [15, 0],
            color: '#1DE9B6',
            show: true
          },
        },
        itemStyle: {
          normal: {
            color: '#1DE9B6',
            shadowBlur: 10,
            shadowColor: '#333'
          }
        },
        symbolSize: 12,
        data: points
      },]
    }
  }

}

export default function getLoadMap(echarts, registerMap, type = 'normal') {
  if (type === 'normal') {
    return new LoadMap(echarts, registerMap)
  }

  return new LoadScaMap(echarts, registerMap)
}

export const getUrl = (code) => {
  return `https://big-data-bucket.obs.cn-north-4.myhuaweicloud.com/Regional%20coordinates/${code}_full.json?AccessKeyId=CTUCZIKR90RF73BVW7OY&Expires=1688788032&x-obs-security-token=gQpjbi1ub3J0aC00iJgccHrJbj6wG82ls8veEGCvYKTFc3kDa1if8fWheSmfWdHcZjo7VoJ3X_rHhz3TLX2MR0MGVXvO4ebWYHO-GRZYT5aR6_gvm-7pcqIcf52r45yi7JYLBG9-b03xRgivf2MaPs21NwQX2ktpUnKAsqFDOYm0KE3cYQN_PAMYDrhdBthKlRGh7kYU7FfRH7T-PJsnWXIKTvqjzdn-u7dpT2nLHqUcMzZ0-9TsO9UxCI9gRebTMSw03HtDSZRGkDymzScbJ2vCJcuBa2nv3FMX0qiiEXt0AySKdL_bK46hPMacRKvOQ2Dvt2eQjTBlGLBeXcaKs_HO6_DBYNrHdO24XzTBDRa7U0B-yH2L6xNzK6cOvMP2NG9F4YwICgOGBO8ECV7iqg2I2LG5GH2M7sQFEjUf3xB0CXHHkDm4zmwDrTAQmEQ-NHI5sNlj12qmgkLqebG_q4aHRm2xQp6LkqLy1-cLXnDdOa6BECZayRINlrM3c5GkzOZ2_B44YyE8ftfB0mm8A_n9Xs5OFO1JyV3jRTko-JC8phXuM1Pu1hQ-1qqYlzBIp320zNL8OKhSskk2eNQfe_HhX-SHUR-eyOcAx2UJk_4CtGddC6oef1zpdFqNQgxfwfZood3O6BRHWa5-7MEqLBnL1UVAqy_0bHp30ZOvK3Lf6Lru9IjYC5QPQ9_LLAP5QB--pOR7tHfnAKVRM9EYgTHubXxGjxOUD4zwcizNR6eQxGjsm7EBbeePIwrPC1-hq6VcsmbTkESbFsS5-PL_hcCksS8NO57Z0WfME7xm-d5Oy0GgnxTY37QgyAUKup2vgxRopmxjRU-HTGoxvD9GNcsI9oEzKX_iAdyK3P0%3D&Signature=1GOsLjgpa7QLk/u4VbJf9d4kqoQ%3D`
}
