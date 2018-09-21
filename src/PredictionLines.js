import React, { Component } from 'react';
import { select, event,hsl, axisBottom, axisLeft, scaleLinear } from 'd3';
import PropTypes from 'prop-types';
import moment from 'moment';
import { handleMouseOut, handleMouseOutCircle, handleMouseOver, handleMouseOverCircle } from './Handlers';
import { Util } from './Util';


const PADDING = 20;
const PADDING_2 = PADDING * 2;

class PredictionLines extends Component {
 constructor(props) {
  super(props);
  this.state = {
   size: props.size,
   data: props.data,
   color: props.color,
   circleRadius: 4,
   thickness: props.thickness,
   yAxisText: props.yAxisText,
   xAxisText: props.xAxisText,
  }
 }

componentDidMount() {
 this.doViz();
}

doViz() {
 const { data, size, color, thickness, circleRadius, xAxisText, yAxisText } = this.state;
 const primaryColor = hsl(color);
 const darkerColor = primaryColor.darker(1);

 // percentage of how much of the maximum mileage is already reached
 // const yMin = min(data, d => d.currentMileage / d.endMileage);
 // const yMax = max(data, d => d.currentMileage / d.endMileage);
 
 // const xMin = min(data, d => Util.timeProgress(d));
 // const xMax = max(data, d => Util.timeProgress(d));
 
 const svg = select('svg');
 
 const xScaleAxis = scaleLinear().domain([0, 100]).range([PADDING, size.width - 80 ]).clamp(true);
 const yScaleAxis = scaleLinear().domain([100, 0]).range([PADDING, size.height - PADDING_2]).clamp(true);
 
 const xScale = scaleLinear().domain([0, 100]).range([PADDING, size.width - PADDING / 2]).clamp(true);
 const yScale = scaleLinear().domain([100, 0]).range([PADDING, size.height - PADDING_2]).clamp(true);
 
 const xAxis = axisBottom().scale(xScaleAxis);
 const yAxis = axisLeft().scale(yScaleAxis);

 // rendering
 svg.append('g').attr('transform', `translate(60, ${size.height - PADDING_2})`).call(xAxis);
 svg.append('g').attr('transform', 'translate(80, 0)').call(yAxis);

  // tooltip
  const tooltip = select('body').append('div')	
    .attr('class', 'tooltip')				
    .style('opacity', 0);


 // axes description
 svg.append('text')
 .attr('text-anchor', 'middle')
 .style('font-size', 12)
 .attr('transform', `translate(${PADDING_2}, ${size.height / 2})rotate(-90)`)
 .text(yAxisText);

svg.append('text')
 .attr('text-anchor', 'middle')
 .style('font-size', 12)
 .attr('transform', `translate(${size.width / 2}, ${size.height - 5})`)
 .text(xAxisText);

 const lines = svg.selectAll('line').data(data, d => d);
 const circles = svg.selectAll('circles').data(data, d => d);
 const zero = { x: 80, y: size.height - PADDING_2 };

 lines.enter()
  .append('line')
  .attr('x1', zero.x)
  .attr('y1', d => yScale((d.startMileage / d.endMileage) * 100))
  .attr('x2', d => xScale(Util.timeProgress(d) * 100))
  .attr('y2', d => yScale((d.currentMileage / d.endMileage) * 100))
  .attr('stroke', primaryColor)
  .attr('opacity', .5)
  .attr('stroke-width', thickness)
  .on('mouseover', handleMouseOver)
  .on('mouseout', handleMouseOut);


  // forecast lines
  lines.enter()
  .append('line')
  .attr('x1', d => xScale(Util.timeProgress(d) * 100))
  .attr('y1', d => yScale((d.currentMileage / d.endMileage) * 100))
  .attr('x2', d => xScale(100))
  .attr('y2', d => yScale(
   Util.slopeToPoint(
    ((d.currentMileage / d.endMileage) - (d.startMileage / d.endMileage)) / Util.timeProgress(d),
    (d.startMileage / d.endMileage)
  )))
  .attr('stroke', 'black')
  .attr('opacity', .2)
  .attr('stroke-width', thickness / 2);

  circles.enter()
   .append('circle')
   .attr('cx', d => xScale(Util.timeProgress(d) * 100))
   .attr('cy', d => yScale((d.currentMileage / d.endMileage) * 100))
   .attr('r', circleRadius)
   .attr('fill', darkerColor)

   .on('mouseover', handleMouseOverCircle)
   .on('mouseout', handleMouseOutCircle);
  
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
 xAxisText: PropTypes.string,
 yAxisText: PropTypes.string,
};

export default PredictionLines;