import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { api } from './lib/api';

import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Navbar from './components/Navbar'; 
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import './App.css'

function App() {
  const [tasks, setTasks] = useState([]);
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      api.get('/todos').then(setTasks).catch(err => console.error("Erreur lors du chargement des tâches :", err));
    } else {
      setTasks([]);
    } 

  }, [user]);


  const addTask = async (text) => {
    try {
      const newTask = await api.post('/todos', { text });
      setTasks([...tasks, newTask]);
    } catch (err) {
      alert("Erreur lors de l'ajout");
    }
  };

  const ClearTask = async (id) => {
    try {
      await api.delete(`/todos/${id}`);
      setTasks(tasks.filter(task => task.id !== id));
    } catch (err) {
      alert("Erreur lors de la suppression");
    }
  };

  const trueTask = async (id) => {
    const taskToToggle = tasks.find(t => t.id === id);
    try {
      const updatedTask = await api.put(`/todos/${id}`, { 
        completed: !taskToToggle.completed 
      });
      setTasks(tasks.map(task => task.id === id ? updatedTask : task));
    } catch (err) {
      alert("Erreur lors de la modification");
    }
  };


  return (
    <div className='container'>
    <Navbar /> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <TodoForm AddTask={addTask} />
            <TodoList tasks={tasks} ClearTask={ClearTask} TrueTask={trueTask} />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
}

export default App
