import { Outlet, useLocation } from "react-router";
import Navbar from "../Components/Navbar/Navbar";
import Footer from "../Components/Footer/Footer";
import ScrollToTop from "../Components/ScrollToTop/ScrollToTop";
import { useEffect } from "react";

const MainLayOut = () => {
     const location = useLocation();

  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: "page_view",
      page_path: location.pathname,
    });
  }, [location]);
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <Navbar />
      </div>
      <div>
        <ScrollToTop />
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MainLayOut;
