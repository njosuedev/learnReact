import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ style }) {
  return (
    <div className="layout" style={style}>
      <Navbar />

      <main className="content">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
