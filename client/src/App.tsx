import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/dashboard'
import Overview from './pages/Overview'
import Settings from './pages/Settings'
import Analytics from './pages/Analytics'
import Transactions from './pages/Transactions'
import Budget from './pages/Budget'
import Help from './pages/Help'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} >
          <Route index element={<Overview />} />
          <Route path="overview" element={<Overview />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="budget" element={<Budget />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="settings" element={<Settings />} />
          <Route path="help" element={<Help />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
