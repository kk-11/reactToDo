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
      taskDone: '',
      styleClass: ''
    }

  }
  handleRemoveTask(id){
    this.props.removeTask(id);
  }
  componentWillMount(){
    let styleClass;
    if (this.props.taskDone == false){
      styleClass = 'task-done';
    } else{
      styleClass = 'task';
    }
    this.setState({ styleClass });
  }

  handleTaskDone(id,taskDone){
    
    this.props.toggleDone(id,taskDone);    
    
     var newState;
     newState = this.state.taskDone ? "task" : "task-done";
      this.setState({
      styleClass: newState,
      taskDone : !this.state.taskDone
      })


   } 
   // <div className={isLoggedIn ? 'currently' : 'not'} >{this.taskContent}</div>   
  render(){
    return(      
        <div className="task fade-in" >  

          <div className={this.state.styleClass}>{this.taskContent}</div>               
          <div className="tick" onClick = {() => this.handleTaskDone(this.taskID,this.taskDone)}>&#10004;
          </div>           
          <div></div>
          <div className="close" onClick = {() => {if(window.confirm('Delete permenantly?')) {this.handleRemoveTask(this.taskID)};}}
          >&#x2716;</div>         
        </div>      
    );
  }
}

Tasks.propTypes = {
  taskContent: PropTypes.string
}

export default Tasks;

