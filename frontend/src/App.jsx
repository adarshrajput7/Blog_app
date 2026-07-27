import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Blogs from './components/Blogs'
import Login from './pages/Login'
import Signup from './pages/Signup'

const App = () => {

  const router = createBrowserRouter([
    {path:'/', element:<><Navbar/><Home/></>},
    {path:'/about', element:<><Navbar/><About/></>},
    {path:'/blogs', element:<><Navbar/><Blogs/></>},
    {path:'/login', element:<><Navbar/><Login/></>},
    {path:'/signup', element:<><Navbar/><Signup/></>}
  ])

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
