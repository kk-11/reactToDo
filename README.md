![alt text](https://github.com/kk-11/reactToDo/blob/26f7ce45dddedb48b57232cc19b17547af3fbc0e/Untitled.png)

This is a to-do app made with react and firebase.

Using npm and create-react-app I set up a react development environment

The app is split into 4 components: 
  App.js component ( parent ) 
  tasks.js component
  form.js component
  timedate component
  
App.js is primarily concerned with database manipulation, and maintaining the majority state.

Tasks.js takes the individual tasks and attributes from app.js, and presents them. tasks.js only state concern is the presentation of the tasks; whether done or undone. The buttons also appear here and pass the task ID back to the parent component for updating the database

Form.js takes what the user types and gives this content back to the parent again.

timedate.js is concerned with getting and presenting the time and date, the component maintains it's own state.  

Future additions:

I would like to add firebase authentication first and foremost to this app.
This would give it real functionality, and use.

Furthermore, I would be interested in exploring redux in combination with react to see potential benefits of more involved state management.

While building this, I intended end use to be non-mobile screens, so I would like to redesign with a 'mobile first' approach as well as considering cross browser compatibility which was not a chief concern while developing.

There should be a better presentation of the tasks, with the user being able to e.g. "view all completed", "clear all completed" etc

A more ambitions undertaking would be to add time and date to each task and completion so as to obtain or ascribe meaningful information with each task which could be presented back to the user as e.g. heat map calender

Priority could be added to each task via colour, again this could tie into potential presentation options e.g "show all important"

Add security concerns, ie best practice for hosting DB config. 

Best practices for form control 
