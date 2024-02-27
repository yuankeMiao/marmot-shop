/*
By adding this component to the top od routers, every time whe nthe app loads a new page,
it will scroll to the top of the page
reference: https://www.matthewhoelter.com/2022/04/02/how-to-scroll-to-top-on-route-change-with-react-router-dom-v6.html
*/


import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
    });
  }, [pathname]);
  return null;
}

export default ScrollToTop;
