import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import Analyze from './pages/Analyzer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">AuthentiCode</h1>
          <nav className="flex gap-6">
            <Link to="/" className="text-foreground/70 hover:text-foreground transition-colors">Home</Link>
            <Link to="/analyze" className="text-foreground/70 hover:text-foreground transition-colors">Analyze</Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyze" element={<Analyze />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
