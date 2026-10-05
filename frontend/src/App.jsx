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
import SearchList from './components/SearchList'
import Card from './components/Card'
import Footer from './components/Footer'

const App = () => {

  const router = createBrowserRouter([
    { path: '/', element: <><Navbar /><Home /><Footer/></> },
    { path: '/about', element: <><Navbar /><About /><Footer/></> },
    { path: '/blogs', element: <><Navbar /><Blogs /><Footer/></> },
    { path: '/search', element: <><Navbar /><SearchList /><Footer/></> },
    { path: '/login', element: <><Navbar /><Login /><Footer/></> },
    { path: '/blog/:blogId', element: <><Navbar /><BlogView /><Footer/></> },
    { path: '/signup', element: <><Navbar /><Signup /><Footer/></> },
    {
  path: '/dashboard',
  element: <><Navbar/><Dashboard /><Footer/></>,
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
      <Card/>
    </div>
  )
}

export default App
