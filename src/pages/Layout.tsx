import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <Header />
      <div className="min-h-screen xl:px-12 dark:bg-sky-950 dark:text-white">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
