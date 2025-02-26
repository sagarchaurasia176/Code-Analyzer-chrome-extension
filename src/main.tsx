import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
// import { GloblaContextFunction } from './context/ContextManager'
// import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')!).render(
      // <GloblaContextFunction>
            // <Toaster/>
            <App />
      // </GloblaContextFunction>
)