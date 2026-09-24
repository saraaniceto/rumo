import './task-form.css'

export function TaskForm({ onSubmit, categories }) {
  return (
    <section>
      <h2>Adicionar tarefa</h2>

      <form className="task-form" action={onSubmit}>
        <div className="form-row">
          <label className="form-row__label" htmlFor="task-name">O que precisa ser feito?</label>
          <input
            type="text"
            id="task-name"
            name="task-name"
            className="form-row__input"
            placeholder="ex: Responder e-mails pendentes"
            required
          />
        </div>

        <fieldset className="form-row category-picker">
          <legend className="form-row__label">Categoria</legend>

          {categories.map((category, index) => (
            <label
              key={category.id}
              htmlFor={category.id}
              className={`category-picker__option category-picker__option--${category.id}`}
              style={{ '--category-color': category.color }}
            >
              <input
                type="radio"
                id={category.id}
                name="task-category"
                value={category.name}
                className="category-picker__radio"
                defaultChecked={index === 0}
              />
              <span className="category-picker__swatch"></span>
              {category.name}
            </label>
          ))}
        </fieldset>


        <button type="submit" className="btn btn--primary task-form__submit">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Adicionar tarefa
        </button>
      </form>
    </section>
  )
}