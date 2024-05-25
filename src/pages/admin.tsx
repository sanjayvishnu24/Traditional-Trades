
import { Outlet } from 'react-router';
import AdminSideBar from '../components/admin/AdminSideBar';

const Admin = () => {
  
  return <>
    <div className="flex flex-row">
      <div className="relative" style={{ width: "25%", height: "100vh" }}>
        
        <AdminSideBar></AdminSideBar>
      </div>
         <Outlet></Outlet>
    </div>
  </>  
}

export default Admin