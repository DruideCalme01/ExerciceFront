import { useState } from 'react'
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  
  const addTask = (text) => {
    const newTask = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const ClearTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  }

  const trueTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };


  return (
    <div>
      <h1>Ma Todo List</h1>
      <TodoForm AddTask={addTask} />
      <TodoList 
      tasks={tasks} 
      ClearTask={ClearTask} 
      TrueTask={trueTask}
      />
    </div>
  );
}

export default App
