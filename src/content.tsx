import React from 'react'
import { createRoot } from 'react-dom/client'
import Content from './components/content'

// Create a container for your React app
const container = document.createElement('div')
container.id = 'LeetcodeContainer'
document.body.append(container)

// create Root of this files okay
createRoot(container).render(
    <Content/>
) 

