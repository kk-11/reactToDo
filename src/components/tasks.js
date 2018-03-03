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
      styleClass: '',
      styleContent: ''  
    }
  } 
  handleRemoveTask(id){
    this.props.removeTask(id);
  }
  componentWillMount(){
    let styleClass;
    let styleContent;
    if (this.props.taskDone == false){
      styleClass = 'task fade-in';
      styleContent = 'noLine'
    } else{
      styleClass = 'task-done fade-in';
      styleContent = 'lineThrough'
    }
    this.setState({ styleClass, styleContent
     });    
  }
  handleTaskDone(id,taskDone){    
    // passes props to app.js and also toggles styleclass state which is the only stately concern of this component
    this.props.toggleDone(id, taskDone);      
    var newState, newContentStyle;
    newState = this.props.taskDone ? "task fade-in" : "task-done fade-in";
    newContentStyle = this.props.taskDone ? "noLine" : "lineThrough";
    console.log(this.props.taskDone, this.props.taskID);
    this.setState({
      styleClass: newState,
      styleContent: newContentStyle
      });    
   }    
  render(){
    return(      
        <div className={this.state.styleClass}>
          <div className={this.state.styleContent}>{this.taskContent}</div>               
          <div className="tick" onClick = {() => this.handleTaskDone(this.props.taskID,this.props.taskDone)}>&#10004;
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

