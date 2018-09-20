import React, { Component } from 'react';
import { select, min, max, axisBottom, axisLeft, scaleLinear } from 'd3';
import moment from 'moment';
class Viz extends Component {
 constructor(props) {
  super(props);
  this.state = {
   size: props.size,
   data: props.data,
   dataExtent: { min: 0, max: 0 },
  }
 }

componentDidMount() {
 this.setupViz();
}

getLineData(d) {
 return { time: 0.4, mileage: 0.5 }
}


setupViz() {
 const { data, size } = this.state;
 // setup
 const timeProgress = d => 1 -
 moment.duration(moment(d.endDate).diff(moment(d.today)))
 / moment.duration(moment(d.endDate).diff(moment(d.startDate)));

 // percentage of how much of the maximum mileage is already reached
 const yMin = min(data, d => d.currentMileage / d.endMileage);
 const yMax = max(data, d => d.currentMileage / d.endMileage);

 const xMin = min(data, d => timeProgress(d));
 const xMax = max(data, d => timeProgress(d));


 const svg = select('svg');

 const xScale = scaleLinear().domain([0, 100]).range([20, size.width - 20 ]);
 const yScale = scaleLinear().domain([100, 0]).range([20, size.height - 20]).clamp(true);

 const xAxis = axisBottom().scale(xScale);
 const yAxis = axisLeft().scale(yScale);

 // rendering
 svg.append('g').attr('transform', `translate(10, ${size.height - 20})`).call(xAxis);
 svg.append('g').attr('transform', 'translate(30, 0)').call(yAxis);

 const lines = svg.selectAll('line').data(data, d => d);
 const zero = { x: 30, y: size.height - 20 };

 lines.enter()
  .append('line')
  .attr('x1', zero.x)
  .attr('y1', zero.y)
  .attr('x2', d => xScale(timeProgress(d) * 100))
  .attr('y2', d => yScale((d.currentMileage / d.endMileage) * 100))
  .attr('stroke', 'black')
  .attr('stroke-width', 1)



}

drawCircle() {

}

drawLine() {

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

export default Viz;