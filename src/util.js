import moment from 'moment';

const timeProgress = d => Math.max(0, 1 -
 moment.duration(moment(d.endDate).diff(moment(d.today)))
 / moment.duration(moment(d.endDate).diff(moment(d.startDate))));

const slopeToPoint = (slope, startMileage) => (slope + startMileage) * 100;

export const Util = {
 timeProgress,
 slopeToPoint,
}