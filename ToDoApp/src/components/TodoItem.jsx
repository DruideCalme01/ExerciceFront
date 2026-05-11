function TodoItem({ task, ClearTask, TrueTask}) {
  return (
    <li className="todo-item">
        <input
            type="checkbox" 
            checked={task.completed} 
            onChange={TrueTask}
            className="todo-checkbox"
        />
        <span className={`todo-text ${task.completed ? 'completed' : ''}`}>
            {task.text}
        </span>
        <button onClick={ClearTask} className="btn-delete">Supprimer</button>
    </li>
  )
}
export default TodoItem