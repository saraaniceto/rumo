import { TaskItem } from '../TaskItem'
import './task-list.css'

export function TaskList({ children }){

    return(
        <section className="task-list-section">
        <h2 className="section-title">Tarefas</h2>

        <ul className="task-list" id="task-list">
        {children}
        </ul>

        {/* estado vazio: exibir quando não houver tarefas (controlado via JS) */}
        <p className="task-list__empty" id="task-list-empty" hidden>
          nenhuma tarefa por aqui ainda. adicione a primeira no formulário ao lado.
        </p>
      </section>
    )
}