import "./App.css";
import { useState, useEffect } from "react";
import { ActiveTask } from "./components/ActiveTask";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { SideBar } from "./components/SideBar";
import { FabButton } from "./components/FabButton";
import { IconMenu } from "./components/icons";
import { TaskItem } from "./components/TaskItem";

function App() {

  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const DEFAULT_CATEGORIES = [
    { id: "1", name: "Importante", color: "#7C93D9" },
    { id: "2", name: "Urgente", color: "#FF6C39" },
    { id: "3", name: "Circunstancial", color: "#A08D17" },
  ];

  const savedCategories = localStorage.getItem("categories");
  const [categories, setCategories] = useState(savedCategories ? JSON.parse(savedCategories) : DEFAULT_CATEGORIES);

  const updateCategories = (categories) => {
    setCategories(categories)
  }

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);


  const defaultSelection = categories.map(cat => cat.name)
  const activeFilters = localStorage.getItem("filters")
  const [filters, setFilters] = useState(activeFilters ? JSON.parse(activeFilters) : defaultSelection)

  const updateFilters = (selectedFilters) => {
    setFilters(selectedFilters)
  }

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);


  const STORAGE_KEY = "tasks"
  const taskList = localStorage.getItem(STORAGE_KEY);

  const [tasks, setTasks] = useState(taskList && taskList.length > 0 ? JSON.parse(taskList) : []);

  const toggleTaskStatus = (task) => {
    setTasks((prevTasks) => {
      return prevTasks.map((t) => {
        if (t.id === task.id) {
          const newTaskStatus =
            task.status === "completed" ? "pending" : "completed";
          return { ...t, status: newTaskStatus };
        }
        return t;
      });
    });
  };

  const [activeTaskId, setActiveTaskId] = useState(1);

  const selectActiveTask = (task) => {
    setActiveTaskId(task.id);
  };


  const addToDo = (formData) => {
    const description = formData.get("task-name");
    const category = formData.get("task-category");

    setTasks((prevState) => {
      const task = {
        id: Date.now(),
        status: "pending",
        description,
        category,
        date: new Date().toISOString(),
        time: "00:00:00",
      };
      return [...prevState, task];
    });
  };

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);


  const editTask = (taskId, description) => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === taskId ? { ...task, description } : task
      )
    );
  };

  const removeTask = (taskIdToRemove) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskIdToRemove);
    setTasks(updatedTasks);

    if (activeTaskId === taskIdToRemove) {
      setActiveTaskId(null);
    }
  };

  const currentActiveTask = tasks.find((task) => task.id === activeTaskId) || null;

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <section className="app-forms">
          <ActiveTask
            activeTask={currentActiveTask}
            categories={categories} />
          <TaskForm
            onSubmit={addToDo}
            categories={categories} />
        </section>
        <TaskList
          categories={categories}
          filters={filters}
          onSelectCategory={updateFilters}
          >
          {tasks
          .filter(t => filters.includes(t.category))
          .map(function (task) {
            if (task.id == activeTaskId) {
              task = { ...task, status: "active" };
            }

            return (
              <TaskItem
                key={task.id}
                item={task}
                onToggleStatus={toggleTaskStatus}
                onSelectTask={selectActiveTask}
                onEditTask={editTask}
                onDeleteTask={removeTask}
                categories={categories}
              />
            );
          })}
        </TaskList>
      </main>
      <aside>
        <FabButton onClick={toggleSideBar}>
          <IconMenu />
        </FabButton>
        <SideBar
          isOpen={showSideBar}
          onClose={toggleSideBar}
          onSaveCategories={updateCategories}
          categories={categories}
        />
      </aside>
    </div>
  );
}

export default App;
