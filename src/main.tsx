import { createRoot } from 'react-dom/client'
import 'normalize.css'
import { Home } from './pages/home'

createRoot(document.getElementById('root')!).render(
  <Home />
)
