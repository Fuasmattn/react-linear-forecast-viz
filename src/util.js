import moment from 'moment';

const radians = degrees => degrees * Math.PI / 180;

const predictPoint = (deltaY, deltaX) => {
 const alpha = Math.atan2(deltaY, deltaX); // radians
 const beta = radians(90);
 const gamma = radians(180) - beta - alpha
 const a = Math.abs((100 * Math.sin(alpha)) / Math.sin(gamma));
 return a;
}

const timeProgress = d => Math.max(0, 1 -
 moment.duration(moment(d.endDate).diff(moment(d.today)))
 / moment.duration(moment(d.endDate).diff(moment(d.startDate))));

export const Util = {
 radians,
 predictPoint,
 timeProgress
}