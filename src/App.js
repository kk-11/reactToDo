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
    // the constructor constructs what is returned in the render function
    super(props);
    this.addTask = this.addTask.bind(this);    
    this.toggleDone = this.toggleDone.bind(this);
    this.removeTask = this.removeTask.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('tasks');
    this.state = {
      tasks: [], 
      taskDone: ''     
    }
  }  
  componentWillMount(){
    // componentWillMount loads/sets state before the page loads
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
    });
    this.database.on('child_removed', snap => {
      for(var i=0; i < oldTasks.length;i++){
        if (oldTasks[i].id === snap.key){
          oldTasks.splice(i,1);
        }
      }
      this.setState({
        tasks : oldTasks
      })
    });
  }
  addTask(task){
    // addTask() pushes new tasks to the DB
    // set default to FALSE, task is undone..
    // (task) is passed from form.js where it is set as newTask
  this.database.push().set(
      {taskContent: task,       
       taskDone: false});
  } 
  removeTask(taskID){
    this.database.child(taskID).remove();
  } 
  toggleDone(taskID, taskDone){  
    // toggleDone takes the task ID and and the taskDone boolean from tasks.js
    //
    const oldTasks = this.state.tasks;
    var bool = '';
    this.database.child(taskID).on("value", function(snapshot) {
      bool = snapshot.val().taskDone;
    });
    //THE ISSUE IS HERE, I SHOULDNT REFER TO THE TASKDONE IN STATE BUT THE TASKDONE IN THE TASKS ARRAY
    // AND THEN UPDATE THE ARRAY
    this.database.child(taskID).update({
      taskDone: !bool
    });
    //need to read value from DB to set state
     this.setState({
        tasks : oldTasks
      });  
     console.log(bool);
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
