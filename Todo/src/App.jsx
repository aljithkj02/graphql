import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home, Login, Register } from './pages'
import { Layout } from './components'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/login',
    element: <Login />
  }
])

function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
