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
          {/* If user role is organization */}
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

          {/* If user role is admin */}
          {user?.role === "admin" && (
            <>
              <div
                className={`menu-item ${location.pathname === "/donar-list" && "active"}`}
                key={"Inventory"}
              >
                <i className="fa-solid fa-warehouse"></i>
                <Link to={"/donar-list"}>Donar List</Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/hospital-list" && "active"
                }`}
                key={"Donar"}
              >
                <i className="fa-solid fa-hand-holding-medical"></i>
                <Link to={"/hospital-list"}>Hospital List</Link>
              </div>

              <div
                className={`menu-item ${
                  location.pathname === "/org-list" && "active"
                }`}
                key={"Hospital"}
              >
                <i className="fa-solid fa-hospital"></i>
                <Link to={"/org-list"}>Organization List</Link>
              </div>
            </>
          )}

          {(user?.role === "donar" || user?.role === "hospital") && (
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
          {user?.role === "hospital" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/consumer" && "active"
                }`}
                key={"Organization"}
              >
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to={"/consumer"}>Consumer</Link>
              </div>
            </>
          )}
          {user?.role === "donar" && (
            <>
              <div
                className={`menu-item ${
                  location.pathname === "/donation" && "active"
                }`}
                key={"Organization"}
              >
                <i className="fa-sharp fa-solid fa-building-ngo"></i>
                <Link to={"/donation"}>Donation</Link>
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