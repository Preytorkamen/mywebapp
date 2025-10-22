import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  return (
    <>
      <div className="dashboard">
        <header className="navbar">
          <h1>React Project Manager</h1>
          <nav>
            <ul>
              <li>Dashboard</li>
              <li>Projects</li>
              <li>Teams</li>
              <li>Settings</li>
            </ul>
          </nav>
        </header>

        <main className="main-content">
          <aside className="sidebar">
            <ul>
              <li>Dashboard</li>
              <li>Tickets</li>
              <li>Billing</li>
              <li>Other</li>
            </ul>
          </aside>
        </main>
      </div>
    </>
  )
}

export default App
