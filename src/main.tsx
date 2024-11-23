import { createRoot } from 'react-dom/client'
import 'normalize.css'
import './styles/imports.scss'
import { Home } from './pages/home'

createRoot(document.getElementById('root')!).render(
  <Home />
)
