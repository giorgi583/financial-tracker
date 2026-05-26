import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {lazy, Suspense, useEffect, useState} from 'react'
import { useTranslation } from 'react-i18next';
import './i18next';
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
const Profile = lazy(() => import('./pages/Profile'))
function App() {
  const [theme, setTheme] = useState<{mode: string, color: string}>({mode: localStorage.getItem('mode') || 'light', color: localStorage.getItem('color') || 'blue'});
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const language = localStorage.getItem('language') || 'en';
    i18n.changeLanguage(language);

    document.documentElement.classList.remove(
    "theme-green",
    "theme-purple",
    "theme-red"
  );

  if (theme.color !== "blue") {
    document.documentElement.classList.add(`theme-${theme.color}`);
  }
  if (theme.mode === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  }, []);
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
          <Route path="settings" element={<Settings settTheme={setTheme} theme={theme} />} />
          <Route path="help" element={<Help />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Suspense>
    </BrowserRouter>
  )
}

export default App
