import React, { Component } from 'react';


import './timedate.css';

class TimeDate extends Component {

  constructor(props){
    super(props);
    var today = new Date(),
            date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
            time = today.getHours() + ':' + ('0' + today.getMinutes()).slice(-2);
        this.state = {
            date: date,
            time: time
        };      
     
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  componentWillUnmount(){
    clearInterval(this.timerID);
  }
  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
  tick(){
  var today = new Date();
    this.setState({
      date : today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear(),
      time : today.getHours() + ':' + ('0' + today.getMinutes()).slice(-2)
    });
  }
  render() {
    return (
      <div className="TimeDate">     
        <div className="date">{this.state.date}</div>
        <div className="time">{this.state.time}</div>
      </div>
    );
  }
}

export default TimeDate;
