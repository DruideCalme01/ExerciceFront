import TodoItem from "./TodoItem"

const TodoList = ({tasks, ClearTask, TrueTask}) => {
  return (
    <div className="todo-container">
      <h1>Ma liste de tâches</h1>
      <div className="todo-list">
        {tasks.length === 0 ? (
          <p className="empty-message">Pas de tâches pour l'instant</p>
        ) : (
          tasks.map((task) => (
              <TodoItem
                  key={task.id}
                  task={task}
                  ClearTask={() => ClearTask(task.id)}
                  TrueTask={() => TrueTask(task.id)}
              />
          ))
        )}
      </div>
    </div>
  )
}
export default TodoList