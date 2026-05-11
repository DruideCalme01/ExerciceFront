function TodoItem({ task, ClearTask, TrueTask}) {
  return (
    <li style={{display:"flex", alignItems:"center", margin:"10px"}}>
        <input
            type="checkbox" checked={task.completed} onChange={TrueTask}
            style={{marginRight:"10px"}}
        />
        <span 
            style={{color: task.completed ? 'green' : 'red', marginRight:"10px", flex:1}}>
            {task.text}
        </span>
        <button onClick={ClearTask}>Supprimer</button>
    </li>
  )
}
export default TodoItem