import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './store';
import { Provider } from 'react-redux';
import { AuthProvider } from './Context.tsx';
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
    <AuthProvider>
    <Toaster />
      <App />
    </AuthProvider>
    </Provider>
  </StrictMode>,
)
