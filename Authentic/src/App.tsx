import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Analyze from './pages/Analyzer'
import './App.css'

function App() {
  return (
    <div className="b">
      <header className="topbar">
        <h1>Authenticode</h1>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/analyze">Analyze</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
