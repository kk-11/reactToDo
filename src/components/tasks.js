import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './tasks.css';

class Tasks extends Component {

  constructor(props){
    super(props);

    this.taskContent = props.taskContent;
    this.taskID = props.taskID;
    this.taskDone = props.taskDone;
    

    this.handleRemoveTask = this.handleRemoveTask.bind(this);
    this.handleTaskDone = this.handleTaskDone.bind(this);

    this.state = {      
      styleClass: ''
    }
  }
  handleRemoveTask(id){
    this.props.removeTask(id);
  }
  componentWillMount(){
    let styleClass;
    if (this.props.taskDone == true){
      styleClass = 'task-done fade-in';
    } else{
      styleClass = 'task fade-in';
    }
    this.setState({ styleClass });
  }
  handleTaskDone(id,taskDone){    
    //  there are also issues here, there are two taskDone
    this.props.toggleDone(id,taskDone);     
    var newState;

    newState = this.state.taskDone ? "task fade-in" : "task-done fade";

    this.setState({
      styleClass: newState,
      taskDone : !this.state.taskDone
      })
   }    
  render(){
    return(      
        <div className={this.state.styleClass}>
          <div>{this.taskContent}</div>               
          <div className="tick" onClick = {() => this.handleTaskDone(this.taskID,this.props.taskDone)}>&#10004;
          </div>           
          <div></div>
          <div className="close" onClick = {() => {if(window.confirm('Delete permenantly?')) {this.handleRemoveTask(this.taskID)};}}
          >&#x2716;</div>         
        </div>      
    );
  }
}
Tasks.propTypes = {
  taskContent: PropTypes.string,
  taskDone: PropTypes.bool
}
export default Tasks;

