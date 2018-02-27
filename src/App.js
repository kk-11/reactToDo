import React, { Component } from 'react';
import Tasks from './components/tasks';
import Form from './components/form';
import TimeDate from './components/timedate';
import {DB_CONFIG} from './config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.addTask = this.addTask.bind(this);    
    this.toggleDone = this.toggleDone.bind(this);
    this.removeTask = this.removeTask.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('tasks');
    this.state = {
      tasks: [], 
      taskDone: true    
    }
  }  
  componentWillMount(){
   const oldTasks = this.state.tasks;

   
   


    this.database.on('child_added', snap => {
        oldTasks.unshift({
        id: snap.key,
        taskContent : snap.val().taskContent,
        taskDone: snap.val().taskDone        
      })
      this.setState({
        tasks : oldTasks

      })
    })
    this.database.on('child_removed', snap => {
      for(var i=0; i < oldTasks.length;i++){
        if (oldTasks[i].id === snap.key){
          oldTasks.splice(i,1);
        }
      }
      this.setState({
        tasks : oldTasks
      })
    })
  }
  

  addTask(task){
    this.database.push().set(
      {taskContent:task,       
       taskDone: false});
  }
 
  removeTask(taskID){
    this.database.child(taskID).remove();
  } 
  toggleDone(taskID, taskDone){   
    const bool = this.state.taskDone;
    console.log(bool);

    this.database.child(taskID).update({
      taskDone: bool
    });
     this.setState({
        taskDone : !bool
      });

  
  }
  render() {
    return (
      <div className="wrapper">
        <h1>To Do : </h1>
          <div className="taskContainter">
            <div className="taskHeader"></div>
              <div className="taskbox">
                {
                  this.state.tasks.map((tasks) => {
                    return(
                      <Tasks 
                        taskContent={tasks.taskContent} 
                        taskID={tasks.id} 
                        key={tasks.id}
                        taskDone={tasks.taskDone}
                        removeTask = {this.removeTask}                         
                        toggleDone={this.toggleDone}/>
                    )
                  })
                }
              </div>
            <div className="inputField">
              <Form addTask = {this.addTask} />
            </div>
          </div>
        <TimeDate />
      </div>
    );
  }
}

export default App;
