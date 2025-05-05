import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../components/inicio/Menu";
import { Footer } from "../page/Footer";

export function Layout({ children }) {
  return (
    <div>
      <div className="menu">
        <Header />
      </div>
      <div className="body">
        <Outlet />
      </div>
      {/* <div className="body">{children}</div> */}
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
