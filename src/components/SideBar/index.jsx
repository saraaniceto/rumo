import "./side-bar.css";
import { useEffect } from "react";
import { useRef } from "react";

export function SideBar({ isOpen, onClose }) {
    //Monitora se a barra lateral está aberta ou não
    useEffect(() => {
        if (isOpen){
            openSideBar()
        } else {
            closeSideBar()
        }
    }, [isOpen])

    // Referência da barra lateral
    const sidebarRef = useRef(null)

    const openSideBar = () => {
        sidebarRef.current.classList.add('is-open')
    }

    const closeSideBar = () => {
        sidebarRef.current.classList.remove('is-open')
    }


    return (
    <aside ref={sidebarRef} className="sidebar" id="sidebar">
      <div className="sidebar__header">
        <h2 className="sidebar__title">categorias</h2>
        <button
          type="button"
          className="sidebar__close"
          id="sidebar-close"
          onClick={onClose}
        >
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M6 6L18 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <p className="sidebar__hint">
        crie até 3 categorias pra organizar suas tarefas. dê um nome e escolha
        uma cor pra cada uma.
      </p>

      <form className="category-form" id="category-form">
        <div className="category-form__item">
          <span className="category-form__index">01</span>
          <div className="category-form__fields">
            <label className="category-form__label" htmlFor="category-name-1">
              nome da categoria
            </label>
            <input
              type="text"
              id="category-name-1"
              name="category-name-1"
              className="category-form__name"
              value="trabalho"
              maxLength="20"
              placeholder="ex: trabalho"
            />
          </div>
          <label className="category-form__color" htmlFor="category-color-1">
            <input
              type="color"
              id="category-color-1"
              name="category-color-1"
              value="#A08D17"
            />
          </label>
        </div>

        <div className="category-form__item">
          <span className="category-form__index">02</span>
          <div className="category-form__fields">
            <label className="category-form__label" htmlFor="category-name-2">
              nome da categoria
            </label>
            <input
              type="text"
              id="category-name-2"
              name="category-name-2"
              className="category-form__name"
              value="pessoal"
              maxLength="20"
              placeholder="ex: pessoal"
            />
          </div>
          <label className="category-form__color" htmlFor="category-color-2">
            <input
              type="color"
              id="category-color-2"
              name="category-color-2"
              value="#7C93D9"
            />
          </label>
        </div>

        <div className="category-form__item">
          <span className="category-form__index">03</span>
          <div className="category-form__fields">
            <label className="category-form__label" htmlFor="category-name-3">
              nome da categoria
            </label>
            <input
              type="text"
              id="category-name-3"
              name="category-name-3"
              className="category-form__name"
              value="estudos"
              maxLength="20"
              placeholder="ex: estudos"
            />
          </div>
          <label className="category-form__color" htmlFor="category-color-3">
            <input
              type="color"
              id="category-color-3"
              name="category-color-3"
              value="#FF6C39"
            />
          </label>
        </div>

        <button
          type="submit"
          className="btn btn--secondary category-form__submit"
        >
          salvar categorias
        </button>
      </form>
    </aside>
  );
}
