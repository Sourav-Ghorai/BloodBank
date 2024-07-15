import React from "react";
import Header from "./Header";

function Layout({ children }) {
  return (
    <>
      <div className="header">
        <Header />
      </div>
      <div className="row">
        <div className="col-3">Sidebar</div>
        <div className="col-9">{children}</div>
      </div>
    </>
  );
}

export default Layout;
