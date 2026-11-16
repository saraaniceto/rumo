import "./App.css";
import { useState, useEffect } from "react";
import { ActiveTask } from "./components/ActiveTask";
import { Header } from "./components/Header";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { SideBar } from "./components/SideBar";
import { FabButton } from "./components/FabButton";
import { IconMenu } from "./components/icons";

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
  const [categories, setCategories] = useState(
    savedCategories ? JSON.parse(savedCategories) : DEFAULT_CATEGORIES,
  );

  const updateCategories = (categories) => {
    setCategories(categories);
  };

  useEffect(() => {
    localStorage.setItem("categories", JSON.stringify(categories));
  }, [categories]);

  const defaultSelection = categories.map((cat) => cat.id);
  const activeFilters = localStorage.getItem("filters");
  const [filters, setFilters] = useState(
    activeFilters ? JSON.parse(activeFilters) : defaultSelection,
  );

  const updateFilters = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  useEffect(() => {
    localStorage.setItem("filters", JSON.stringify(filters));
  }, [filters]);

  const taskList = localStorage.getItem("tasks");

  const [tasks, setTasks] = useState(
    taskList && taskList.length > 0 ? JSON.parse(taskList) : [],
  );

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTaskStatus = (task) => {
    setTasks((prevTasks) => {
      return prevTasks.map((t) => {
        if (t.id === task.id) {
          const newTaskStatus =
            t.status === "completed" ? "pending" : "completed";
          return { ...t, status: newTaskStatus };
        }
        return t;
      });
    });
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
        time: 0,
      };
      return [...prevState, task];
    });
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const editTask = (taskId, description) => {
    setTasks((prevState) =>
      prevState.map((task) =>
        task.id === taskId ? { ...task, description } : task,
      ),
    );
  };

  const removeTask = (taskIdToRemove) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskIdToRemove);
    setTasks(updatedTasks);

    if (activeTaskId === taskIdToRemove) {
      setActiveTaskId(null);
    }
  };

  //TIMER

  const activeTimer = JSON.parse(localStorage.getItem("timer"));
  const [initialTime, setInitialTime] = useState(() => {
    activeTimer &&
    activeTimer.isRunning &&
    Date.now() - activeTimer.initialTime < 300000
      ? activeTimer.initialTime
      : null;
  });

  const [isRunning, setIsRunning] = useState(initialTime ? true : false);

  const [activeTaskId, setActiveTaskId] = useState(
    initialTime ? activeTimer.activeTaskId : null,
  );

  const selectActiveTask = (task) => {
    if (task.id === activeTaskId) {
      setActiveTaskId(null);
    } else {
      setActiveTaskId(task.id);
    }

    if (isRunning) {
      handlePlayTimer();
    }
  };

  const currentActiveTask =
    tasks.find((task) => task.id === activeTaskId) || null;

  //ATUALIZAR O TEMPO NO OBJETO TAREFA
  const updateTime = (taskId, time) => {
    setTasks((prevState) =>
      prevState.map((task) => (task.id === taskId ? { ...task, time } : task)),
    );
  };

  //INICIAR O TIMER
  const handlePlayTimer = () => {
    const currentTime = Date.now();
    if (!isRunning) {
      setIsRunning(true);
      setInitialTime(currentTime);
      localStorage.setItem(
        "timer",
        JSON.stringify({
          isRunning: true,
          initialTime: currentTime,
          activeTaskId: currentActiveTask.id,
        }),
      );
    } else {
      setIsRunning(false);
      setInitialTime(null);
      const elapsedTime = currentTime - initialTime;
      const updatedTime = currentActiveTask.time + elapsedTime;
      updateTime(currentActiveTask.id, updatedTime);
      localStorage.removeItem("timer");
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <section className="app-forms">
          <ActiveTask
            activeTask={currentActiveTask}
            categories={categories}
            isRunning={isRunning}
            initialTime={initialTime}
            onPlayTimer={handlePlayTimer}
          />
          <TaskForm onSubmit={addToDo} categories={categories} />
        </section>
        <TaskList
          tasks={tasks}
          categories={categories}
          filters={filters}
          activeTaskId={activeTaskId}
          onSelectCategory={updateFilters}
          onToggleStatus={toggleTaskStatus}
          onSelectTask={selectActiveTask}
          onEditTask={editTask}
          onDeleteTask={removeTask}
        />
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
