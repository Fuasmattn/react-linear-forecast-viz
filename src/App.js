import React, { Component } from 'react';
import './App.css';
import PredictionLines from './PredictionLines';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : [{
        id: 'HSJKS 123XY',
        startDate: new Date('05 October 2018 14:48 UTC'),
        endDate: new Date('29 October 2018 14:48 UTC'),
        startMileage: 2000,
        endMileage: 10000,
        currentMileage: 6000,
        today:  new Date('17 October 2018 14:48 UTC')
      },
      {
        id: 'ISOA 829XY',
        startDate: new Date('07 October 2018 14:48 UTC'),
        endDate: new Date('23 October 2018 14:48 UTC'),
        startMileage: 3000,
        endMileage: 12000,
        currentMileage: 5500,
        today:  new Date('18 October 2018 11:48 UTC')
      },
      {
        id: 'OUSA 231GH',
        startDate: new Date('07 October 2018 14:48 UTC'),
        endDate: new Date('23 October 2018 14:48 UTC'),
        startMileage: 1000,
        endMileage: 15000,
        currentMileage: 14000,
        today: new Date('22 October 2018 14:48 UTC')
      },
      {
        id: 'SSKO 933JD',
        startDate: new Date('02 October 2018 14:48 UTC'),
        endDate: new Date('05 October 2018 14:48 UTC'),
        startMileage: 1000,
        endMileage: 15000,
        currentMileage: 2000,
        today: new Date('03 October 2018 14:48 UTC')
      }
    ]
    }
  }
  render() {
    return (
      <div className="App">
        <PredictionLines 
          data={this.state.data}
          size={{width: 800, height: 400}}
          color={'#0000cc'}
          thickness={3}
          circleRadius={0}
          xAxisText='Time progression (%)'
          yAxisText='Mileage progression (%)'
        ></PredictionLines>
     
      </div>
    );
  }
}

export default App;
