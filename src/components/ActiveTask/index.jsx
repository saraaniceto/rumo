import './active-task.css'

export function ActiveTask() {
    return(
        <section className="active-task" id="active-task">
        <div className="active-task__top">
          <span className="active-task__category">trabalho</span>
          <h2 className="active-task__name">revisar proposta do cliente</h2>
        </div>

        <div className="timer" id="timer" data-timer-state="running">
          <div className="timer__display">
            <span className="timer__time">00:42:18</span>
            <span className="timer__label">em andamento</span>
          </div>

          <div className="timer__controls">
            <button type="button" className="timer__btn timer__btn--pause" id="timer-pause">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor"/>
                <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor"/>
              </svg>
              pausar
            </button>
            <button type="button" className="timer__btn timer__btn--stop" id="timer-stop">
              <svg viewBox="0 0 24 24" fill="none">
                <rect x="6" y="6" width="12" height="12" rx="2" fill="currentColor"/>
              </svg>
              encerrar
            </button>
          </div>
        </div>

        <div className="active-task__description">
          <label className="active-task__description-label" htmlFor="task-description">descrição</label>
          <textarea
            id="task-description"
            className="active-task__description-field"
            placeholder="adicione detalhes sobre essa tarefa. essa descrição não aparece na lista."
            rows="3"
          >revisar a seção de escopo e ajustar o cronograma antes de enviar pro cliente.</textarea>
        </div>

        <div className="active-task__actions">
          <button type="button" className="btn btn--ghost" id="edit-task">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M4 20L4.7 16.6L15.2 6.1C15.6 5.7 16.2 5.7 16.6 6.1L17.9 7.4C18.3 7.8 18.3 8.4 17.9 8.8L7.4 19.3L4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            editar
          </button>
          <button type="button" className="btn btn--ghost btn--danger" id="delete-task">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M5 7H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              <path d="M9 7V5C9 4.4 9.4 4 10 4H14C14.6 4 15 4.4 15 5V7" stroke="currentColor" strokeWidth="1.6"/>
              <path d="M7 7L7.6 19C7.6 19.6 8.1 20 8.7 20H15.3C15.9 20 16.4 19.6 16.4 19L17 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
            </svg>
            excluir
          </button>
        </div>
      </section>
    )
}