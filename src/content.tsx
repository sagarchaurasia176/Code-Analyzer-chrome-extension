import React from 'react'
import { createRoot } from 'react-dom/client'
import Content from './components/content'
// import { GloblaContextFunction } from './context/ContextManager'
// import { Toaster } from 'react-hot-toast'
// Create a container for your React app
const container = document.createElement('div')
container.id = 'LeetcodeContainer'
document.body.append(container)

// create Root of this files okay here we are creating the root of the react app
createRoot(container).render(
    // <GloblaContextFunction>
        // <Toaster/>
        <Content/>
    // </GloblaContextFunction>
) 

