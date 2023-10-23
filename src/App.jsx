import React from 'react'
import ReactDOM from 'react-dom/client'
import {createHashRouter, RouterProvider} from 'react-router-dom'
import {Login} from './Pages/Login.jsx'
import {Home} from './Pages/Home.jsx'
import './App.css'


function App() {
  const router = createHashRouter([
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/home',
        element: <Home />
      }
    ])

    ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
      {/* <App /> */}
  </React.StrictMode>,
)
} 

export default App
