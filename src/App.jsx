import './App.css'
import { useState } from 'react'
import { ActiveTask } from './components/ActiveTask'
import { Header } from './components/Header'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'
import { SideBar } from './components/SideBar'
import { FabButton } from './components/FabButton'
import { IconMenu } from './components/icons'

function App() {

  const [showSideBar, setShowSideBar] = useState(false)

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar)
  }

  return (
    <div className="app">
    <Header />
    <main className="app-main">
      <section className="app-forms">
      <ActiveTask />
      <TaskForm />
      </section>
      <TaskList />
    </main>
    <aside>
      <FabButton onClick={toggleSideBar}>
        <IconMenu />
      </FabButton>
      <SideBar isOpen={showSideBar} onClose={toggleSideBar} />
    </aside>
    </div>
  )
}

export default App
