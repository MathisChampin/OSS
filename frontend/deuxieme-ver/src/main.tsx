import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import './index.css'
import Navbar from './components/Navbar'
import App from './App'
import Footer from './components/Footer'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <div className="app-container">
      <BrowserRouter>
        <Navbar />
        <App />
      </BrowserRouter>
      <Footer />
    </div>
  </StrictMode>,
)
