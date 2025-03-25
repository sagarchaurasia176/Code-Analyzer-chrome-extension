import { createRoot } from 'react-dom/client'
import App from './App'
// import './App.css'
import '../App.css'

import { GlobalContextFunction } from './context/ContextManager'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
      <GlobalContextFunction>
            <Toaster/>
            <App />
      </GlobalContextFunction>
)