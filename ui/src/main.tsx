import React from 'react'
import ReactDOM from 'react-dom/client'
import './global.css'
import { RouterProvider, createHashRouter } from 'react-router-dom'
import Home from './routes/Home'
import LikedJokes from './routes/Liked'

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/liked',
    element: <LikedJokes />,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
