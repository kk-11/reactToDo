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
  componentWillMount(id, taskDone){
    
    if(taskDone == false){this.setState({styleClass: 'task'})}else{this.setState({styleClass: 'task-done'})}
  }

  handleTaskDone(id,taskDone){
     console.log(taskDone);
    this.props.toggleDone(id,taskDone);    
    if(taskDone = true){this.setState({styleClass: 'task'})}else{this.setState({styleClass: 'task-done'})};
     this.setState({
        taskDone : !this.state.taskDone
      })
   } 
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

