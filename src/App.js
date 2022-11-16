import React, { useEffect, useRef, useState } from "react";
import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { nanoid } from "nanoid";
import usePrevious from "./hooks/usePrevious";

const FILTER_MAPS = {
  All: () => true,
  Active: task => !task.completed,
  Completed: task => task.completed
}

const FILTER_NAMES = Object.keys(FILTER_MAPS)

function App(props) {
  const [tasks, setTasks] = useState(props.tasks)
  const [filter, setFilter] = useState('All')
  const taskList = tasks.filter(FILTER_MAPS[filter]).map(task => (
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
  const filterList = FILTER_NAMES.map(name => <FilterButton
    key={name}
    name={name}
    isPressed={name === filter}
    setFilter={setFilter}
  />)
  const listHeadingRef = useRef(null)
  const prevTaskLength = usePrevious(tasks.length)

  function addTask(name) {
    if (name) {
      const newTask = { id: `todo-${nanoid()}`, name, completed: false }
      setTasks([...tasks, newTask])
    }
  }

  function toogleTaskCompleted(id) {
    const updatedTasks = tasks.map(task => {
      if (id === task.id) {
        return { ...task, completed: !task.completed }
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
        return { ...task, name: newName }
      }

      return task
    })

    setTasks(editedTaskList)
  }

  useEffect(() => {
    if (tasks.length - prevTaskLength === -1) {
      listHeadingRef.current.focus()
    }
  }, [tasks.length, prevTaskLength])

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
      <h2 id="list-heading" tabIndex="-1" ref={listHeadingRef}>
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
