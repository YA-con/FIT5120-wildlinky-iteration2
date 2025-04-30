// src/components/ForestLossChart.jsx
import React from "react";
import Plot from "react-plotly.js";

const ForestLossChart = () => {
  const years = [
    2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    2021, 2022, 2023
  ];
  
  const treeCoverLoss = [
    19521.31116, 22921.20187, 81346.14229, 16721.10918, 23544.02958, 25578.66966,
    85621.83489, 18178.11653, 92238.989, 18647.20475, 21453.85968, 26150.75434,
    48548.23668, 91802.20663, 33450.27241, 70967.67691, 34268.85242, 25195.78852,
    185099.1366, 630691.6459, 28873.83826, 13171.07756, 12346.58327
  ];
  
  const co2Emissions = [
    5462887.375, 6179935.827, 16202652.03, 5711446.549, 7584427.01, 7566099.122,
    19543720.53, 7334996.626, 26181835.08, 7646072.837, 9294762.495, 12194071.21,
    16096484.98, 25122354.2, 11602219.11, 28600666.17, 17572857.09, 11266287.49,
    48319276.83, 180820756.2, 16304282.34, 9721896.613, 8741354.128
  ];
  

  const data = [
    {
      type: "bar",
      x: years,
      y: treeCoverLoss,
      name: "Tree Cover Loss (ha)",
      marker: { color: "#07431E" },
      yaxis: "y1"
    },
    {
      type: "scatter",
      mode: "lines+markers",
      x: years,
      y: co2Emissions,
      name: "CO₂ Emissions (Mg)",
      marker: { color: "firebrick" },
      yaxis: "y2"
    }
  ];

  const layout = {
    title: "Tree Cover Loss & CO₂ Emissions in Victoria (2001–2023)",
    xaxis: {
      title: "Year",
      showgrid: false
    },
    yaxis: {
      title: "Tree Cover Loss (ha)",
      side: "left",
      showgrid: false
    },
    yaxis2: {
      title: "CO₂ Emissions (Mg)",
      overlaying: "y",
      side: "right",
      showgrid: false
    },
    legend: { x: 0.01, y: 0.99 },
    template: "plotly_white",
    plot_bgcolor: "white",
    paper_bgcolor: "white",
    margin: { l: 50, r: 50, t: 60, b: 50 },
    font: {
      family: "Instrument Sans, sans-serif",
      size: 14,
      color: "black"
    }
  };

  return <Plot data={data} layout={layout} style={{ width: "100%" }} />;
};

export default ForestLossChart;
