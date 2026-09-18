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

  const STORAGE_KEY = "tasks"
  const taskList = localStorage.getItem(STORAGE_KEY);

  const [tasks, setTasks] = useState( taskList ? JSON.parse(taskList) : [{
        id: 1,
        status: "pending",
        description: "Empty State",
        category: "trabalho",
        date: new Date().toISOString(),
        time: "00:00:00",
      }]);

  const [showSideBar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

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
      setActiveTaskId(updatedTasks.length > 0 ? updatedTasks[0].id : null);
    }
  };

  const currentActiveTask = tasks.find((task) => task.id === activeTaskId) || null;

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <section className="app-forms">
          <ActiveTask activeTask={currentActiveTask} />
          <TaskForm onSubmit={addToDo} />
        </section>
        <TaskList>
          {tasks.map(function (task) {
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
              />
            );
          })}
        </TaskList>
      </main>
      <aside>
        <FabButton onClick={toggleSideBar}>
          <IconMenu />
        </FabButton>
        <SideBar isOpen={showSideBar} onClose={toggleSideBar} />
      </aside>
    </div>
  );
}

export default App;
