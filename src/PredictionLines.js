import React, { Component } from 'react';
import { select, axisBottom, axisLeft, scaleLinear } from 'd3';
import { Util } from './Util';
import PropTypes from 'prop-types';

const PADDING = 20;

class PredictionLines extends Component {
 constructor(props) {
  super(props);
  this.state = {
   size: props.size,
   data: props.data,
   color: props.color,
   circleRadius: props.circleRadius,
   thickness: props.thickness,
   yAxisText: props.yAxisText,
   xAxisText: props.xAxisText,
  }
 }

componentDidMount() {
 this.setupViz();
}

setupViz() {
 const { data, size, color, thickness, circleRadius, xAxisText, yAxisText } = this.state;

 // percentage of how much of the maximum mileage is already reached
 // const yMin = min(data, d => d.currentMileage / d.endMileage);
 // const yMax = max(data, d => d.currentMileage / d.endMileage);
 
 // const xMin = min(data, d => Util.timeProgress(d));
 // const xMax = max(data, d => Util.timeProgress(d));
 
 const svg = select('svg');
 
 const xScaleAxis = scaleLinear().domain([0, 100]).range([PADDING, size.width - 80 ]).clamp(true);
 const yScaleAxis = scaleLinear().domain([100, 0]).range([PADDING, size.height - PADDING * 2]).clamp(true);
 
 const xScale = scaleLinear().domain([0, 100]).range([PADDING, size.width - PADDING / 2]).clamp(true);
 const yScale = scaleLinear().domain([100, 0]).range([PADDING, size.height - PADDING * 2]).clamp(true);
 
 const xAxis = axisBottom().scale(xScaleAxis);
 const yAxis = axisLeft().scale(yScaleAxis);

 // rendering
 svg.append('g').attr('transform', `translate(60, ${size.height - PADDING * 2})`).call(xAxis);
 svg.append('g').attr('transform', 'translate(80, 0)').call(yAxis);

 // axes description
 svg.append('text')
 .attr('text-anchor', 'middle')
 .attr('transform', `translate(20, ${size.height / 2})rotate(-90)`)
 .text(yAxisText);

svg.append('text')
 .attr('text-anchor', 'middle')
 .attr('transform', `translate(${size.width / 2}, ${size.height - 5})`)
 .text(xAxisText);

 const lines = svg.selectAll('line').data(data, d => d);
 const circles = svg.selectAll('circles').data(data, d => d);
 const zero = { x: 80, y: size.height - PADDING * 2 };

 lines.enter()
  .append('line')
  .attr('x1', zero.x)
  .attr('y1', d => yScale((d.startMileage / d.endMileage) * 100))
  .attr('x2', d => xScale(Util.timeProgress(d) * 100))
  .attr('y2', d => yScale((d.currentMileage / d.endMileage) * 100))
  .attr('stroke', color)
  .attr('stroke-width', thickness);


  // forecast lines
  lines.enter()
  .append('line')
  .attr('x1', d => xScale(Util.timeProgress(d) * 100))
  .attr('y1', d => yScale((d.currentMileage / d.endMileage) * 100))
  .attr('x2', d => xScale(100))
  .attr('y2', d => yScale(
   this.slopeToPoint(
    ((d.currentMileage / d.endMileage) - (d.startMileage / d.endMileage)) / Util.timeProgress(d),
    (d.startMileage / d.endMileage)
  )))
  .attr('stroke', 'black')
  .attr('opacity', .2)
  .attr('stroke-width', thickness);

  circles.enter()
   .append('circle')
   .attr('cx', d => xScale(Util.timeProgress(d) * 100))
   .attr('cy', d => yScale((d.currentMileage / d.endMileage) * 100))
   .attr('r', circleRadius)
   .attr('fill', color)
  
}

slopeToPoint = (slope, startMileage) => {
console.log(slope, startMileage)
 return (slope + startMileage) * 100;
}

 render() {
  const { width, height } = this.state.size;
  return (
   <div>
    <svg width={width} height={height}></svg>
   </div>
  );
 }
}

PredictionLines.propTypes = {
 data: PropTypes.array,
 size: PropTypes.object,
 color: PropTypes.string,
 thickness: PropTypes.number,
 circleRadius: PropTypes.number,
 xAxisText: PropTypes.string,
 yAxisText: PropTypes.string,
};

export default PredictionLines;