import './task-list.css'

export function TaskList({ children }){

    return(
        <section>
        <h2>Tarefas</h2>

        <ul className="task-list">
        {children}
        </ul>

        {/* estado vazio: exibir quando não houver tarefas (controlado via JS) */}
        <p className="task-list__empty" id="task-list-empty" hidden>
          nenhuma tarefa por aqui ainda. adicione a primeira no formulário ao lado.
        </p>
      </section>
    )
}