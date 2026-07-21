import "./App.css";
import { useState } from "react";
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

  const [tasks, setTasks] = useState([
    {
      id: "1",
      status: "pending",
      description: "organizar arquivos do projeto",
      category: "trabalho",
      date: "01 jul",
      time: "00:00:00",
    },
    {
      id: "2",
      status: "active",
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
      status: "completed",
      description: "pagar contas do mês",
      category: "pessoal",
      date: "29 jun",
      time: "01:15:40",
    },
    {
      id: "5",
      status: "completed",
      description: "responder e-mails da manhã",
      category: "trabalho",
      date: "01 jul",
      time: "00:00:00",
    },
  ]);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  const toggleTaskStatus = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.id === task.id) {
          const newTaskStatus =
            task.status === "completed" ? "pending" : "completed";
          return { ...t, status: newTaskStatus };
        }
        return t;
      }),
    );
  };

  const selectActiveTask = (task) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => {
        if (t.status === 'active') {
          return {...t, status: 'pending'}
        }
        if (t.id === task.id) {
          return { ...t, status: 'active' };
        }
        return t;
      }),
    );
  };

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <section className="app-forms">
          <ActiveTask />
          <TaskForm />
        </section>
        <TaskList>
          {tasks.map(function (task) {
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
