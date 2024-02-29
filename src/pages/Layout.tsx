import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout() {
  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 xl:px-12 dark:bg-black dark:text-gray-100 transition-all duration-700">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
