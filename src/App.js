import React, { Component } from 'react';
import './App.css';
import Viz from './Viz';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      data : [{
        id: 0,
        startDate: new Date('05 October 2018 14:48 UTC'),
        endDate: new Date('29 October 2018 14:48 UTC'),
        startMileage: 2000,
        endMileage: 10000,
        currentMileage: 1500,
        today:  new Date('17 October 2018 14:48 UTC')
      },
      {
        id: 1,
        startDate: new Date('07 October 2018 14:48 UTC'),
        endDate: new Date('23 October 2018 14:48 UTC'),
        startMileage: 3000,
        endMileage: 12000,
        currentMileage: 5500,
        today:  new Date('18 October 2018 11:48 UTC')
      },
      {
        id: 2,
        startDate: new Date('07 October 2018 14:48 UTC'),
        endDate: new Date('23 October 2018 14:48 UTC'),
        startMileage: 1000,
        endMileage: 15000,
        currentMileage: 14000,
        today: new Date('22 October 2018 14:48 UTC')
      }
    ]
    }
  }
  render() {
    return (
      <div className="App">
        <Viz data={this.state.data} size={{width: 800, height: 400}}></Viz>
     
      </div>
    );
  }
}

export default App;
