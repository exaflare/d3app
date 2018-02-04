import React  from 'react';
import {scaleOrdinal,scaleBand,scaleLinear} from 'd3-scale'
import {max} from 'd3-array'
import './GroupBarChart.css';
var yindex =0;

const margin = {
  top: 20,
  right: 20,
  bottom: 30,
  left: 40
};
const numberWithCommas = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const height = 700 - margin.top - margin.bottom;
const width = 700 - margin.left - margin.right;
const x0 = scaleBand()
  .rangeRound([0, width])
  .paddingInner(0.1);
const x1 = scaleBand()
  .padding(0.05);
var y = scaleLinear()
  .rangeRound([height, 0]);

const z = scaleOrdinal()
  .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
  const GroupBarChart = ({ states }) => {
  var keys = [];      
      for(var ii =0;ii<=Object.keys(states).length-1;ii++){
        keys.push(states[ii].label) 
      }
      x1.domain(keys).rangeRound([0, x0.bandwidth()]);
    
    return (
   <svg width = {width} height = {height}> 
    <g transform={`translate(0, -20)`}>
    <g>
    <g transform = "translate(5,0)" >
    {
    states.map(function (data,i) {
        x0.domain(states.map(function(d) { return d.State; }));
        y.domain([0, max(states, function(d) {  return max(keys, function(key) { return d.value; }); })]).nice();
        return (
              <rect key={i} x={x1(keys[i])} y={y(data.value)} width={x1.bandwidth()} height={height-y(data.value)} fill={z(i)}  >
              <title>{numberWithCommas(data.value)}</title>
              </rect>
            );
        })
    }
    </g>
    </g>
    <g fontFamily="sans-serif" fontSize="10" textAnchor="end">       
    {
      
    keys.map(function (data,i) {
      
      if(i*20 === 0){
         yindex = 20;  
      }else{
         yindex =i*20;
      }
    return (
    <g key={i} transform={`translate(-50,${yindex})`}>
    <rect x={width+25} width="19" height="19" fill={z(i)}></rect>
    <text x={width+25} y="9.5" dy="0.32em">{data} &nbsp;</text>
    </g>
    )})
  }
    </g>
    </g>
    </svg>
    );
  }

export default GroupBarChart; 