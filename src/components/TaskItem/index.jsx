import { useState } from "react";
import "./task-item.css";

export function TaskItem({ item, onToggleStatus, onSelectTask, onEditTask, onDeleteTask }) {
  
  const [isEditing, setIsEditing] = useState(false)
  const [description, setDescription] = useState(item.description)

  function formatDate(date) {
    const parsedDate = new Date(date);

    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "short",
    }).format(parsedDate);
  }

  return (
    <li
      className="task-list__row"
      data-task-id={item.id}
      data-status={item.status}
      id="task-item"
    >
      <div className="task-list__item">
        <label className="task-list__checkbox">
          <input
            htmlFor="task-item"
            type="checkbox"
            onChange={() => onToggleStatus(item)}
          />
          <span className="task-list__checkbox-mark"></span>
        </label>

        <div className="task-list__main" onClick={() => onSelectTask(item)}>
          { isEditing ? (
              <>
                <input type="text"
                  id="task-new-description"
                  name="task-new-description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
                <button
                  className="btn-check"
                  onClick={(event) => {
                    event.stopPropagation();
                    onEditTask(item.id, description);
                    setIsEditing(false);
                  }}
                >
                  <svg xmlns="http://w3.org" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </button>      
              </>
          ) : (
            <span className="task-list__name">{item.description}</span>
          )}

          <span className="task-list__meta">
            <span className="task-list__category">{item.category}</span>
            <span className="task-list__date">{formatDate(item.date)}</span>
          </span>
        </div>

        <div className="task-list__time">
          <svg viewBox="0 0 24 24" fill="none">
            <circle
              cx="12"
              cy="12"
              r="9"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path
              d="M12 7V12L15.5 14"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
          <span>{item.time}</span>
        </div>
      </div>

      <div className="task-list__actions">
        <button
          type="button"
          className="btn btn--ghost"
          onClick={() => setIsEditing(true)}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M4 20L4.7 16.6L15.2 6.1C15.6 5.7 16.2 5.7 16.6 6.1L17.9 7.4C18.3 7.8 18.3 8.4 17.9 8.8L7.4 19.3L4 20Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          type="button"
          className="btn btn--ghost btn--danger"
          onClick={() => onDeleteTask(item)}

        >
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M5 7H19" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
            <path d="M9 7V5C9 4.4 9.4 4 10 4H14C14.6 4 15 4.4 15 5V7" stroke="currentColor" strokeWidth="1.6"/>
            <path d="M7 7L7.6 19C7.6 19.6 8.1 20 8.7 20H15.3C15.9 20 16.4 19.6 16.4 19L17 7" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </li>
  );
}
