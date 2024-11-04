import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './screens/Home.jsx'
import Authentication, {AuthenticationMode} from './screens/Authentication.jsx'
import ErrorPage from './screens/ErrorPage.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import UserProvider from './context/UserProvider.jsx'

const router = createBrowserRouter([
  {
    errorElement: <ErrorPage/>
  },
  {
    path: 'signup',
    element: <Authentication authenticationMode={AuthenticationMode.Register}/>
  },
  {
    path: 'signin',
    element: <Authentication authenticationMode={AuthenticationMode.Login}/>
  },
  {
    element: <ProtectedRoute/>,
    children: [
      {
        path: '',
        element: <Home/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
      <RouterProvider router={router}/>
    </UserProvider>
  </StrictMode>,
)
