import './active-task.css'
import { Timer } from '../Timer';

export function ActiveTask({ activeTask, categories, onUpdateTime }) {

  if (!activeTask) {
    return (
      <section className="active-task" id="active-task">
        <div className="active-task__top">
          <h2 className="active-task__name">Nenhuma tarefa ativa</h2>
        </div>
        <p className="active-task__hint">Selecione ou adicione uma tarefa para iniciar.</p>
      </section>
    );
  }

  const categoryColor = categories?.find(
    (cat) => cat.id === activeTask.category
  )?.color || "var(--color-tangerine)";

  const categoryName = categories?.find(
    (cat) => cat.id === activeTask.category
  )?.name || "Sem categoria";


  return (
    <section className="active-task" id="active-task">
      <div className="active-task__top">
        <span className="active-task__category" style={{ backgroundColor: categoryColor }}>{categoryName}</span>
        <h2 className="active-task__name">{activeTask.description}</h2>

        <div className="active-task__actions">

          {/* <button type="button" className="btn btn--ghost" id="edit-task">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 20L4.7 16.6L15.2 6.1C15.6 5.7 16.2 5.7 16.6 6.1L17.9 7.4C18.3 7.8 18.3 8.4 17.9 8.8L7.4 19.3L4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            
          </button>
          <button type="button" className="btn btn--ghost btn--danger" id="delete-task">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 7H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M9 7V5C9 4.4 9.4 4 10 4H14C14.6 4 15 4.4 15 5V7" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M7 7L7.6 19C7.6 19.6 8.1 20 8.7 20H15.3C15.9 20 16.4 19.6 16.4 19L17 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
          </button> */}

        </div>
      </div>

      <Timer activeTask={activeTask} onUpdateTime={onUpdateTime}/>

      {/* <div className="active-task__description">
          <label className="active-task__description-label" htmlFor="task-description">descrição</label>
          <textarea
            id="task-description"
            className="active-task__description-field"
            placeholder="adicione detalhes sobre essa tarefa. essa descrição não aparece na lista."
            rows="3"
          >revisar a seção de escopo e ajustar o cronograma antes de enviar pro cliente.</textarea>
        </div> */}
    </section>
  )
}