import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {lazy, Suspense} from 'react'
const Home = lazy(() => import('./pages/home')) 
const Login = lazy(() => import('./pages/Login'))
const Register = lazy(() => import('./pages/Register')) 
const Dashboard = lazy(() => import('./pages/dashboard'))
const Overview = lazy(() => import('./pages/Overview'))
const Settings = lazy(() => import('./pages/Settings'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Transactions = lazy(() => import('./pages/Transactions'))
const Budget = lazy(() => import('./pages/Budget'))
const Help = lazy(() => import('./pages/Help'))
const Loader = lazy(() => import('./components/Loader'))
function App() {
  return (
    <BrowserRouter>
    <Suspense fallback={<Loader />} >
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
    </Suspense>
    </BrowserRouter>
  )
}

export default App
