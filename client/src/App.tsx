import {BrowserRouter, Routes, Route} from 'react-router-dom'
import {lazy, Suspense, useEffect} from 'react'
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import './i18next';
import { useAuth } from './Context';
import { fetchUserPrefferences } from './slices/PreferenceSlice';
import ResetPass from './pages/ResetPass';
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
const ForgotPass = lazy(() => import('./pages/ForgotPass'))
function App() {
const theme = useSelector((state: any) => state.preference.theme);
const color = useSelector((state: any) => state.preference.color);
const lang = useSelector((state: any) => state.preference.lang);

const { user} = useAuth();
  const dispatch = useDispatch();
  const { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [lang]);
  useEffect(() => {
    document.documentElement.classList.remove(
    "theme-green",
    "theme-purple",
    "theme-red"
  );
  if (color !== "blue") {
    document.documentElement.classList.add(`theme-${color}`);
  }
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
  }, [theme, color]);
  useEffect(() => {
    if (user) {
      dispatch(fetchUserPrefferences() as any);
    } 
  }, [user]);
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
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
      </Routes>
    </Suspense>
    </BrowserRouter>
  )
}

export default App
