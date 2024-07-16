import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { userMenu } from './Menus/userMenu';
import "../../../Styles/Layout.css";

function Sidebar() {
   const location = useLocation();
  return (
    <div>
      <div className='sidebar'>
         <div className='menu'>
            {userMenu.map((menu) => {
               const isActive = location.pathname === menu.path;
               return (
                  <div className={`menu-item ${isActive && 'active'}`}>
                     <i className={menu.icon}></i>
                     <Link to={menu.path}>{menu.name}</Link>
                  </div>
               )
            })}
         </div>
      </div>
    </div>
  )
}

export default Sidebar