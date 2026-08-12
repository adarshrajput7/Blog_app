import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import Blogs from './components/Blogs'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './components/Profile'
import YourBlog from './components/YourBlog'
import CreateBlog from './components/CreateBlog'
import Comments from './components/Comments'
import Dashboard from './components/Dashboard'
import UpdateBlog from './components/UpdateBlog'
import BlogView from './components/BlogView'

const App = () => {

  const router = createBrowserRouter([
    { path: '/', element: <><Navbar /><Home /></> },
    { path: '/about', element: <><Navbar /><About /></> },
    { path: '/blogs', element: <><Navbar /><Blogs /></> },
    { path: '/login', element: <><Navbar /><Login /></> },
    { path: '/blog/:blogId', element: <><Navbar /><BlogView /></> },
    { path: '/signup', element: <><Navbar /><Signup /></> },
    {
  path: '/dashboard',
  element: <><Navbar/><Dashboard /></>,
  children: [
    { path: 'profile', element: <Profile/> },        
    { path: 'your-blog', element: <YourBlog/> },     
    { path: 'write-blog', element: <CreateBlog/> },  
    { path: 'comments', element: <Comments/> },       
    { path: 'write-blog/:blogId', element: <UpdateBlog/> }       
  ]
}

  ])

  return (
    // <div className="flex flex-col h-full overflow-y-auto">
    <div className="flex flex-col h-full overflow-y-auto custom-scrollbar scroll-smooth">
      <RouterProvider router={router} />
    </div>
  )
}

export default App
