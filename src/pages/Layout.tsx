import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrolltoTopButton from "../components/utils/ScrolltoTopButton";

function Layout() {
  return (
    <>
    <ScrolltoTopButton />
      <Header />
      <div className="max-w-screen-2xl mx-auto min-h-screen pt-20 xl:px-12">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;
