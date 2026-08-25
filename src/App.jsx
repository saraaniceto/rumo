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

/* {
      id: "1",
      status: "pending",
      description: "organizar arquivos do projeto",
      category: "trabalho",
      date: "01 jul",
      time: "00:00:00",
    },
    {
      id: "2",
      status: "pending",
      description: "revisar proposta do cliente",
      category: "trabalho",
      date: "01 jul",
      time: "00:42:18",
    },
    {
      id: "3",
      status: "pending",
      description: "estudar hooks do react",
      category: "estudos",
      date: "30 jun",
      time: "00:00:00",
    },
    {
      id: "4",
      status: "pending",
      description: "pagar contas do mês",
      category: "pessoal",
      date: "29 jun",
      time: "01:15:40",
    },
    {
      id: "5",
      status: "pending",
      description: "responder e-mails da manhã",
      category: "trabalho",
      date: "01 jul",
      time: "00:00:00",
    } */

function App() {
  const [tasks, setTasks] = useState([]);

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

  const [activeTaskId, setActiveTaskId] = useState(null);

  const selectActiveTask = (task) => {
    if (activeTaskId == task.id) {
      setActiveTaskId(null);
    } else {
      setActiveTaskId(task.id);
    }
  };

  const addToDo = (formData) => {
    const description = formData.get("task-name")
    const category = formData.get("task-category")
   
    setTasks((prevState) => {
      const task = {
        id: prevState.length + 1,
        status: "pending",
        description,
        category,
        date: new Date().toISOString(),
        time: "00:00:00",
      };
      return [...prevState, task];
    })

  };

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <section className="app-forms">
          <ActiveTask />
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
