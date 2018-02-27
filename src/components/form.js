import React, { Component } from 'react';
import './form.css';

class Form extends Component {
  constructor(props){
    super(props);
    this.state = {
      newTask : ''
    };
    this.handleUserInput = this.handleUserInput.bind(this)
    this.publish = this.publish.bind(this)
  }
  handleUserInput(e){
    if (e.key === 'Enter') {     
    };
    this.setState({
      newTask: e.target.value,
      })
  }
  publish(){
    this.props.addTask(this.state.newTask);
    this.setState({
      newTask: ''      
    })
  }
  render() {
    return (
      <div className="input">
        <input 
        placeholder="Write a note..."
        maxLength="30"
        value = {this.state.newTask}
        onChange = {this.handleUserInput}
        onKeyPress={event => {
                if (event.key === 'Enter') {
                  this.publish()
                }
              }}
        />        
      </div>
    );
  }
}

export default Form;
