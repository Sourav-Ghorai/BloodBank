import React from "react";
import { BiSolidDonateBlood } from "react-icons/bi";
import { LuUserCircle } from "react-icons/lu";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle logout function
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
    toast.success("Logged out successfully");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand h1">
        <BiSolidDonateBlood color="red" size="30px" /> Blood Bank
      </div>
      <ul className="navbar-nav flex-row">
        {user ? (
          <>
            <li className="nav-item mx-3">
              <p className="nav-link m-0">
                <LuUserCircle size="25px" /> Welcome{" "}
                {user?.name || user?.hospitalName || user?.organizationName}!{" "}
                <span className="badge bg-secondary">{user?.role}</span>
              </p>
            </li>
            {location.pathname === "/" ||
            location.pathname === "/donar" ||
            location.pathname === "/hospital" ? (
              <li className="nav-item mx-3">
                <Link to={"/analytics"} className="nav-link m-0">
                  Analytics
                </Link>
              </li>
            ) : (
              <li className="nav-item mx-3">
                <Link to={"/"} className="nav-link m-0">
                  Home
                </Link>
              </li>
            )}
            <li className="nav-item mx-3">
              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          <li className="nav-item mx-3">
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Header;
