import { useRoutes, BrowserRouter} from 'react-router-dom'
import {Login} from './Pages/Login.jsx'
import {Home} from './Pages/Home.jsx'
import { Records } from './Pages/Records.jsx'
import { Certificate } from './Pages/Certificate.jsx'
import { Indicators } from './Pages/Indicators.jsx'
import { Navbar } from './Components/Navbar/index.jsx'
import './App.css'


function AppRoutes() {
  const router = useRoutes([
      {
        path: '/',
        element: <Login />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/records',
        element: <Records />
      },
      {
        path: '/certificates',
        element: <Certificate />
      },
      {
        path: '/indicators',
        element: <Indicators />
      }
    ])
    return router
  }

  function App(){
    return(
      <BrowserRouter>
      <Navbar />
      <AppRoutes />
      
      </BrowserRouter>
    )
  }


export default App
