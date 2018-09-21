import moment from 'moment';
import { select, event,hsl, axisBottom, axisLeft, scaleLinear } from 'd3';


export const handleMouseOver = function(d, i) {
 select(this).transition().duration(500).attr('opacity', 1);
 handleMouseOverCircle(d,i);			
};

export const handleMouseOut = function(d, i) {
 select(this).transition().duration(500).attr('opacity', .5);
 handleMouseOutCircle(d,i);
};

export const handleMouseOverCircle = function(d, i) {
 select(this).transition().duration(500).attr('r', 10);
 const tooltip = select('.tooltip')
 tooltip.transition()		
   .duration(200)
   .delay(200)		
   .style('opacity', .9);		
 tooltip.html(
   `<p><strong>${d.id}</strong></p>
   <p>Mileage: ${d.currentMileage}/${d.endMileage}km</p>
   <p>Start Mileage: ${d.startMileage}km</p>
   <p>Start Date: ${moment(d.startDate).format('DD.MM.YYYY')}</p>
   <p>End Date: ${moment(d.endDate).format('DD.MM.YYYY')}</p>
`)	
   .style('left', (event.pageX + 20) + 'px')		
   .style('top', (event.pageY - 50) + 'px');			
};

export const handleMouseOutCircle = function(d, i) {
  select(this).transition().duration(500).attr('r', 4);
 const tooltip = select('.tooltip')
 tooltip.transition()		
   .duration(500)		
   .style('opacity', 0);	
};

