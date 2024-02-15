import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-sky-950 text-white px-4 md:px-12">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
