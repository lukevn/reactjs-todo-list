import React, { useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";

function App(props) {
  const [tasks, setTasks] = useState(props.tasks)
  const taskList = tasks.map(task => (
    <Todo
      id={task.id}
      key={task.id}
      name={task.name}
      completed={task.completed}
      toogleTaskCompleted={toogleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ))
  const taskListSize = taskList.length
  const taskNoun = taskListSize === 1 ? 'task' : 'tasks'
  const headingText = `${taskListSize} ${taskNoun} remaining`
  
  
  function addTask(name) {
    if (name) {
      const newTask = { id: `todo-${nanoid()}`, name, completed: false }
      setTasks([...tasks, newTask])
    }
  }

  function toogleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return {...task, completed: !task.completed}
      }

      return task
    })

    setTasks(updatedTasks)
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter(task => id !== task.id)

    setTasks(remainingTasks)
  }

  function editTask(id, newName) {
    const editedTaskList = tasks.map(task => {
      if (id === task.id) {
        return {...task, name: newName}
      }

      return task
    })

    setTasks(editedTaskList)
  }
  
  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">
        {headingText}
      </h2>
      <ul
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}


export default App;
