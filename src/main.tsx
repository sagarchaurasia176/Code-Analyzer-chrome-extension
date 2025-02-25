import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'


createRoot(document.getElementById('root')!).render(
      <App />
)


// "content_security_policy": {
//       "extension_pages": "script-src 'self' 'wasm-unsafe-eval' 'sha256-yt+SNVxRkIi6H6yb7ndFuZM1esMX9esg3UpRHaTsyVk=' http://localhost:* http://127.0.0.1:*; object-src 'self'"
//     }