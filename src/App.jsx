import { useState } from 'react'
import './App.css'
import { ActiveTask } from './components/ActiveTask'
import { Header } from './components/Header'
import { TaskForm } from './components/TaskForm'
import { TaskList } from './components/TaskList'

function App() {

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
    </div>
  )
}

export default App
