import { Outlet } from "react-router";
import SideBar from "./components/SideBar";
import AdminSideBar from "./components/admin/AdminSideBar";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <div className="flex flex-row">
        <div className="relative" style={{ width: "25%", height: "100vh" }}>
          {(window.location.pathname.includes("admin") && (
            <AdminSideBar></AdminSideBar>
          )) || <SideBar></SideBar>}
        </div>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
