import './task-list.css'

export function TaskList({ children, categories, filters, onSelectCategory }) {

  function selectCategory(selectedChip) {
    const selectedCategories = JSON.parse(localStorage.getItem("filters"))

    const updatedCategories = 
      selectedCategories.includes(selectedChip) ?
      selectedCategories.filter(c => c !== selectedChip) :
      [...selectedCategories, selectedChip]
    
    console.log("todas as cats" + selectedCategories)

    onSelectCategory(updatedCategories)
  }

  return (
    <section>
      <div className="task-list__header">
        <h2>Tarefas</h2>
        <div className="task-list__filters">
          {categories.map(cat => (
            <label>
              <button
                type="button"
                className={`task-list__filter${filters.includes(cat.name) ? ' is-active' : ''}`}
                style={{ '--category-color': cat.color }}
                onClick={() => selectCategory(cat.name)}
              >
              <span className="task-list__meta">
                <span className="task-list__category">{cat.name}</span>
              </span>
              </button>
            </label>
          ))}
        </div>
      </div>

      <ul className="task-list">
        {children}
      </ul>

    </section>
  )
}