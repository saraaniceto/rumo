import './task-list.css'
import { TaskItem } from "../TaskItem";

export function TaskList({
  tasks,
  categories,
  filters,
  onSelectCategory,
  onToggleStatus,
  onSelectTask,
  onEditTask,
  onDeleteTask,
  activeTaskId
 }) {

  function selectCategory(selectedChip) {
    const selectedCategories = JSON.parse(localStorage.getItem("filters"))

    const updatedCategories =
      selectedCategories.includes(selectedChip) ?
        selectedCategories.filter(c => c !== selectedChip) :
        [...selectedCategories, selectedChip]

    onSelectCategory(updatedCategories)
  }

  const filteredTasks = tasks.filter(t => filters.includes(t.category));


  return (
    <section>
      <div className="task-list__header">
        <h2>Tarefas</h2>
        <div className="task-list__filters">
          {categories.map(cat => (
            <label key={cat.id}>
              <button
                type="button"
                className={`task-list__filter${filters.includes(cat.id) ? ' is-active' : ''}`}
                style={{ '--category-color': cat.color }}
                onClick={() => selectCategory(cat.id)}
              >
                <span className="task-list__meta">
                  <span className="task-list__category">{cat.name}</span>
                </span>
              </button>
            </label>
          ))}
        </div>

        {filteredTasks.length === 0 ? (
          <div className="task-list__empty">
            <p className="task-list__empty-title">
              {tasks.length === 0 ? "Nenhuma tarefa cadastrada" : "Nenhuma tarefa corresponde aos filtros"}
            </p>
            <span className="task-list__empty-hint">
              {tasks.length === 0 ? "Adicione uma tarefa para começar" : "Altere os filtros para ver suas tarefas"}
            </span>
          </div>
        ) : (
          <ul className="task-list">
            {filteredTasks.map(task => (
              <TaskItem
                  key={task.id}
                  item={task}
                  isActive={activeTaskId === task.id}
                  onToggleStatus={onToggleStatus}
                  onSelectTask={onSelectTask}
                  onEditTask={onEditTask}
                  onDeleteTask={onDeleteTask}
                  categories={categories}
                />
            ))}
          </ul>
       )}
      </div>

    </section>
  )
}