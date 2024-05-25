import { faUsers ,faBagShopping,faUser,faStore} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 
import { NavLink } from "react-router-dom";




const SideBar = () => {

    
    const navs = [
      {
        name: "Customers",
        icon: <FontAwesomeIcon icon={faUsers} />,
        link: "../",
      },
      {
        name: "Product",
        icon: <FontAwesomeIcon icon={faBagShopping} />,
        link: "products",
      },
      {
        name: "orders",
        icon: <FontAwesomeIcon icon={faStore} />,
        link: "orders",
      },
      {
        name: "Account",
        icon: <FontAwesomeIcon icon={faUser} />,
        link: "account",
      },
      {
        name: "Chat",
        icon: <FontAwesomeIcon icon={faUser} />,
        link: "messages",
      },
      {
        name: "Logout",
        icon: <FontAwesomeIcon icon={faUser} />,
        link: "logout"
      },
    ];
  const navstyle="m-3 px-2 py-2.5 relative hover:bg-violet-600 active:bg-violet-600 rounded-md flex items-center";
  return (
  
    <div
      className="fixed flex flex-col gap-0 bg-black text-slate-300"
      style={{ width: "20%",height:"inherit"}}
    >
      <div>
        <p className="text-2xl py-10 px-2">
          Traditional <sup> Trades</sup>
        </p>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
      </div>
      {navs.map((nav) => {
        return (
          <NavLink to={nav.link} className={({isActive})=>isActive?`${navstyle} bg-violet-600`:navstyle}     >
            {nav.icon}
            <p
              className="text-xl font-normal-sans ml-2 absolute left-7"
              style={{ display: "inline-block" }}
            >
              {nav.name}
            </p>
          </NavLink>
        );
      })}
      <div className="h-1/5"></div>
    </div>
  );
}

export default SideBar