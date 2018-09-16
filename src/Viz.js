import React, { Component } from 'react';
import { select } from 'd3';

class Viz extends Component {

componentDidMount() {
 this.setupViz();
}

setupViz() {
 const svg = select('svg');
 svg.append('rect')
 .attr('fill', 'blue')
 .attr('x', 20)
 .attr('y', 20)
 .attr('width', 200)
 .attr('height', 200)
}

drawCircle() {

}

drawLine() {

}

drawAxes() {
 
}

 render() {
  return (
   <div>
    <svg width="500" height="500"></svg>
   </div>
  );
 }
}

export default Viz;