import TodoItem from "./TodoItem"

function TodoList({tasks, ClearTask, TrueTask}) {
  return (
    <div>
      <h1>Ma liste de tâches</h1>
      <ul>
        {tasks.map((task) => (
            <TodoItem
                task={task}
                ClearTask={() => ClearTask(task.id)}
                TrueTask={() => TrueTask(task.id)}
            />
        ))}
      </ul>
    </div>
  )
}
export default TodoList