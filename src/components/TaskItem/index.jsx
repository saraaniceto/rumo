import './task-item.css'

export function TaskItem( { item, onToggleStatus, onSelectTask } ){


    return (
        <li className="task-list__item" data-task-id={item.id} data-status={item.status} onClick={() => onSelectTask(item)}>
            <label className="task-list__checkbox">
              <input type="checkbox" onChange={() => onToggleStatus(item)}/>
              <span className="task-list__checkbox-mark"></span>
            </label>

            <div className="task-list__main">
              <span className="task-list__name">{item.description}</span>
              <span className="task-list__meta">
                <span className="task-list__category">{item.category}</span>
                <time className="task-list__date" dateTime="2026-07-01">{item.date}</time>
              </span>
            </div>

            <div className="task-list__time">
              <svg viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
                <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
              </svg>
              <span>{item.time}</span>
            </div>
          </li>
    )
}