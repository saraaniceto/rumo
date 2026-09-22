import "./side-bar.css";
import { useEffect } from "react";
import { useRef } from "react";

export function SideBar({ isOpen, onClose, onSaveCategories, categories }) {
  // Referência da barra lateral
  const sidebarRef = useRef(null)
  const formRef = useRef(null)

  //Monitora se a barra lateral está aberta ou não
  useEffect(() => {
    if (isOpen) {
      openSideBar()
    } else {
      closeSideBar()
      formRef.current?.reset()
    }
  }, [isOpen])


  const openSideBar = () => {
    sidebarRef.current.classList.add('is-open')
  }

  const closeSideBar = () => {
    sidebarRef.current.classList.remove('is-open')
  }

  //Pega os dados do formulário
  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const updatedCategories = [
      {
        id: "category-1",
        name: formData.get("category-name-1"),
        color: formData.get("category-color-1"),
      },
      {
        id: "category-2",
        name: formData.get("category-name-2"),
        color: formData.get("category-color-2"),
      },
      {
        id: "category-3",
        name: formData.get("category-name-3"),
        color: formData.get("category-color-3"),
      },
    ];

    onSaveCategories(updatedCategories);
    onClose();
  }



  return (
    <aside ref={sidebarRef} className="sidebar" id="sidebar">
      <div className="sidebar__header">
        <h2 className="sidebar__title">Categorias</h2>
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
        Crie até 3 categorias pra organizar suas tarefas. dê um nome e escolha
        uma cor pra cada uma.
      </p>

      <form
        ref={formRef}
        className="category-form"
        id="category-form"
        onSubmit={handleSubmit}
        key={JSON.stringify(categories)}
        >
        <div className="category-form__item">
          <label className="category-form__color" htmlFor="category-color-1">
            <input
              type="color"
              id="category-color-1"
              name="category-color-1"
              defaultValue={categories[0].color || "#A08D17"}
            />
          </label>
          <div className="category-form__fields">
            <label className="category-form__label" htmlFor="category-name-1">
            </label>
            <input
              type="text"
              id="category-name-1"
              name="category-name-1"
              className="category-form__name"
              defaultValue={categories[0]?.name || "Importante"}
              maxLength="20"
              placeholder="ex: trabalho"
            />
          </div>
        </div>

        <div className="category-form__item">
          <label className="category-form__color" htmlFor="category-color-2">
            <input
              type="color"
              id="category-color-2"
              name="category-color-2"
 defaultValue={categories[1]?.color || "#FF6C39"}            />
          </label>
          <div className="category-form__fields">
            <label className="category-form__label" htmlFor="category-name-2">
            </label>
            <input
              type="text"
              id="category-name-2"
              name="category-name-2"
              className="category-form__name"
              defaultValue={categories[1]?.name || "Urgente"}
              maxLength="20"
              placeholder="ex: pessoal"
            />
          </div>
        </div>

        <div className="category-form__item">
          <label className="category-form__color" htmlFor="category-color-3">
            <input
              type="color"
              id="category-color-3"
              name="category-color-3"
              defaultValue={categories[2]?.color || "#A08D17"}

            />
          </label>
          <div className="category-form__fields">
            <label className="category-form__label" htmlFor="category-name-3">
            </label>
            <input
              type="text"
              id="category-name-3"
              name="category-name-3"
              className="category-form__name"
              defaultValue={categories[2]?.name || "Circunstancial"}
              maxLength="20"
              placeholder="ex: estudos"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn btn--secondary category-form__submit"
        >
          Salvar
        </button>
      </form>
    </aside>
  );
}
