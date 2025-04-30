import React, { useState, useEffect } from 'react';
import ReactECharts from 'echarts-for-react';

const LineChart = ({ values }) => {
  const [option, setOption] = useState({
    title: {
      text: '',
      left: 0
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {},
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '10%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Population',
        type: 'line',
        stack: 'Number',
        data: []
      }
    ]
  });

  useEffect(() => {
    if (!values?.length) return;
    
    const xAxis = values.map(item => item.year);
    const seriesData = values.map(item => item.total);

    setOption(prev => ({
      ...prev,
      xAxis: {
        ...prev.xAxis,
        data: xAxis
      },
      series: [
        {
          ...prev.series[0],
          data: seriesData
        }
      ]
    }));
  }, [values]);

  return <ReactECharts option={option} style={{ height: "100%" }} />;
};

export default LineChart;