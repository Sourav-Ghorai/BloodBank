import React from 'react'
import { Link, useLocation } from 'react-router-dom'
// import { userMenu } from './Menus/userMenu';
import "../../../Styles/Layout.css";
import { useSelector } from 'react-redux';

function Sidebar() {
   const location = useLocation();
   const {user} = useSelector(state => state.auth)
  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {user?.role === "organization" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/" && "active"}`}
                key={"Inventory"}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to={"/"}>Inventory</Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/donar" && "active"
                }`}
                key={"Donar"}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to={"/donar"}>Donar</Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/hospital" && "active"
                }`}
                key={"Hospital"}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to={"/hospital"}>Hospital</Link>
              </div>
            </>
          )}

          {user?.role === "donar" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/organization" && "active"
                }`}
                key={"Organization"}
              >
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to={"/organization"}>Organization</Link>
              </div>
            </>
          )}

          {/* {userMenu.map((menu) => {
               const isActive = location.pathname === menu.path;
               return (
                  <div className={`menu-item ${isActive && 'active'}`} key={menu.name}>
                     <i className={menu.icon}></i>
                     <Link to={menu.path}>{menu.name}</Link>
                  </div>
               )
            })} */}
        </div>
      </div>
    </div>
  );
}

export default Sidebar