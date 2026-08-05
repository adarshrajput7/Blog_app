import { Outlet } from "react-router-dom"
import SideBar from "./SideBar"


const Dashboard = () => {
  return (
    <div className="flex">
          <SideBar />
          <div>
              <Outlet/>
          </div>
    </div>
  )
}

export default Dashboard
