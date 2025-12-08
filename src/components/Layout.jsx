import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import './Layout.css';

export default function Layout() {
  return (
    <div className="layout">

      <Navbar />

      {/* Page Body */}
      <div className="page-body">

        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Sidebar</h2>
          <p>Links or menu here</p>
        </aside>

        {/* Main page content */}
        <main className="content">
          <Outlet />
        </main>

      </div>

      <Footer />

    </div>
  );
}
