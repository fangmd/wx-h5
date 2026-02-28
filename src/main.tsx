import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/assets/css/tw.css'
import '@/assets/css/global.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import './plugins'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
