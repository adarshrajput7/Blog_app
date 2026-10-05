import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"


const Dashboard = () => {
  return (
    // <div className="flex">
    //       <SideBar />
    //       <div>
    //           <Outlet/>
    //       </div>
    // </div>


    <div className="min-h-screen overflow-hidden">
      <SideBar />

      <main className="min-h-screen overflow-y-auto lg:ml-72">
        <Outlet />
      </main>
    </div>

  )
}

export default Dashboard
