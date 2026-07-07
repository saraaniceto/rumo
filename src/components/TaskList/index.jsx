import { TaskItem } from '../TaskItem'
import './task-list.css'

export function TaskList(){
  const toggleTaskCompleted = (task) => {

  }

    return(
        <section className="task-list-section">
        <h2 className="section-title">Tarefas</h2>

        <ul className="task-list" id="task-list">

          {/* <!-- tarefa selecionada / em andamento --> */}

          {/* <TaskItem /> */}
          

          <li className="task-list__item" data-task-id="1" data-status="active">
            <label className="task-list__checkbox">
              <input type="checkbox" />
              <span className="task-list__checkbox-mark"></span>
            </label>

            <div className="task-list__main">
              <span className="task-list__name">revisar proposta do cliente</span>
              <span className="task-list__meta">
                <span className="task-list__category">trabalho</span>
                <time className="task-list__date" dateTime="2026-07-01">01 jul</time>
              </span>
            </div>

            <div className="task-list__time">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span>00:42:18</span>
            </div>
          </li>

          {/* <!-- tarefa pendente, ainda não iniciada --> */}
           <li className="task-list__item" data-task-id="3" data-status="pending">
            <label className="task-list__checkbox">
              <input type="checkbox" />
              <span className="task-list__checkbox-mark"></span>
            </label>

            <div className="task-list__main">
              <span className="task-list__name">estudar hooks do react</span>
              <span className="task-list__meta">
                <span className="task-list__category" >estudos</span>
                <time className="task-list__date" dateTime="2026-06-30">30 jun</time>
              </span>
            </div>

            <div className="task-list__time">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span>00:00:00</span>
            </div>
          </li>

          {/* <!-- tarefa concluída --> */}
          <li className="task-list__item" data-task-id="4" data-status="completed">
            <label className="task-list__checkbox">
              <input type="checkbox" />
              <span className="task-list__checkbox-mark"></span>
            </label>

            <div className="task-list__main">
              <span className="task-list__name">pagar contas do mês</span>
              <span className="task-list__meta">
                <span className="task-list__category" >pessoal</span>
                <time className="task-list__date" dateTime="2026-06-29">29 jun</time>
              </span>
            </div>

            <div className="task-list__time">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span>01:15:40</span>
            </div>
          </li>

          <li className="task-list__item" data-task-id="5" data-status="completed">
            <label className="task-list__checkbox">
              <input type="checkbox" />
              <span className="task-list__checkbox-mark"></span>
            </label>

            <div className="task-list__main">
              <span className="task-list__name">responder e-mails da manhã</span>
              <span className="task-list__meta">
                <span className="task-list__category">trabalho</span>
                <time className="task-list__date" dateTime="2026-06-29">29 jun</time>
              </span>
            </div>

            <div className="task-list__time">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span>00:28:52</span>
            </div>
          </li>

        </ul>

        {/* estado vazio: exibir quando não houver tarefas (controlado via JS) */}
        <p className="task-list__empty" id="task-list-empty" hidden>
          nenhuma tarefa por aqui ainda. adicione a primeira no formulário ao lado.
        </p>
      </section>
    )
}