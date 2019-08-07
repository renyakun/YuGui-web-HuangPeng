/* eslint-disable*/
import React from 'react';
import echarts from 'echarts';
import './BdpMap.less';
import { base } from './city';

export { base };

const chinaJson = require('echarts/map/json/china.json');
echarts.registerMap('china', chinaJson);
class BdpMap extends React.Component {
  state = {
    myChart: '',
  };
  inits = () => {
    const { mapStyle } = this.props;
    const option = {
      geo: {
        map: 'china',
        roam: true,
        label: {
          emphasis: {
            show: false,
          },
        },
        itemStyle: {
          normal: {
            borderColor: mapStyle && mapStyle.borderColor ? mapStyle.borderColor : '#404a59', // 可设置
            borderWidth: 1.5,
            areaColor: mapStyle && mapStyle.areaColor ? mapStyle.areaColor : '#323c48',
          },
          emphasis: {
            areaColor: mapStyle && mapStyle.areaColor ? mapStyle.areaColor : '#323c48', // 可设置
            // borderWidth: 5,
            // areaColor: '#32cd32',
            label: {
              shadowColor: 'green', // 默认透明
              // shadowBlur: 10,
              show: true,
            },
          },
        },
      },
      tooltip : {
          trigger: 'item',
          formatter:function(params, ticket, callback){
            if(params.seriesType=="lines") {
              return `${params.data.fromName}>${params.data.toName}, ${params.data.count}`;
            }
          }
      },
      series: [],
    };
    return option;
  };
  convertData = data => {
    // const $vm = this;
    const res = [];
    data.forEach(v => {
      const arr = base[v];
      res.push({
        name: v,
        value: arr.concat(v.value),
      });
    });
    return res;
  };
  draw = () => {
    const geoCoordMap = base;
    const { flyData, lineStyle } = this.props;
    const planePath =
      'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    let flyLine = [];
    const flyGeo = {};
    if (flyData) {
      flyLine = flyData.map(v => {
        const geoFrom = geoCoordMap[v.fromName];
        const geoTo = geoCoordMap[v.toName];
        flyGeo[v.fromName] = v.value;
        flyGeo[v.toName] = v.value;
        const obj = Object.create(v);
        obj.fromName = v.fromName;
        obj.toName = v.toName;
        obj.coords = [geoFrom || [0, 0], geoTo || [0, 0]];
        obj.count = v.count;
        return obj;
      });
    }
    const series = [
      {
        name: '飞行轨迹',
        type: 'lines',
        zlevel: 2,
        symbolSize: 10,
        effect: {
          show: true,
          period: 6,
          trailLength: 0,
          symbol: planePath,
          symbolSize: 15,
        },
        lineStyle: {
          normal: {
            color: lineStyle && lineStyle.color ? lineStyle.color : '#a6c84c',
            width: lineStyle && lineStyle.width ? lineStyle.width : 1,
            opacity: lineStyle && lineStyle.opacity ? lineStyle.opacity : '0.5',
            curveness: 0.2,
          },
        },
        data: flyLine,
      },
      {
        name: '飞机飞行',
        type: 'effectScatter',
        coordinateSystem: 'geo',
        data: Object.keys(flyGeo).map(v => {
          const obj = {};
          obj.name = v;
          obj.value = geoCoordMap[v];
          return obj;
        }),
        symbolSize: 8,
        rippleEffect: {
          scale: 5,
          brushType: 'stroke',
        },
        label: {
          normal: {
            show: true,
            formatter: '{b}',
            position: 'right',
          },
        },
        itemStyle: {
          normal: {
            color: '#f5dc04',
            shadowBlur: 20,
            shadowColor: '#333',
          },
        },
      },
    ];
    return {
      series,
    };
  };
  componentWillReceiveProps() {
    const { myChart } = this.state;
    if (myChart) {
      myChart.setOption(this.draw());
    }
  }
  componentDidMount() {
    // const {myChart} = this.state;
    const { map } = this.refs;
    const myChart = echarts.init(map);
    window.onresize = () =>
      (() => {
        myChart.resize();
      })();
    myChart.setOption(this.inits());
    myChart.setOption(this.draw());
    this.setState({
      myChart,
    });
  }
  render() {
    // const {myChart} = this.state;
    // if(myChart) myChart.resize();
    return <div className="bdp-map" ref="map" />;
  }
}
export default BdpMap;
