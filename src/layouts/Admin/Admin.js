import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";

import AdminNavbar from "components/Navbars/AdminNavbar.js"; 
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";       
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";
import voraLogo from "assets/img/vora.svg"; 

var ps; // PerfectScrollbar instance for main panel

const Admin = (props) => {
  const [activeColor, setActiveColor] = React.useState("blue");
  const [sidebarOpened, setSidebarOpened] = React.useState(false); // For mobile off-canvas state
  const mainPanelRef = React.useRef(null);
  const notificationAlertRef = React.useRef(null);
  const location = useLocation();
  const [navbarBackgroundColor, setNavbarBackgroundColor] = React.useState("navbar-transparent"); // For sticky navbar bg

  // Scroll to top on route change
  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]);

  React.useEffect(() => {
    document.body.classList.remove("sidebar-mini"); 

    const mainPanel = mainPanelRef.current;
    let scrollHandler = null;

    if (mainPanel) {
      if (navigator.platform.indexOf("Win") > -1) {
        ps = new PerfectScrollbar(mainPanel);
        document.documentElement.classList.add("perfect-scrollbar-on");
        document.documentElement.classList.remove("perfect-scrollbar-off");
      }
      scrollHandler = () => {
        if (mainPanel.scrollTop > 50) {
          setNavbarBackgroundColor("navbar-custom-opaque"); // Custom class for #1E1E24 background
        } else {
          setNavbarBackgroundColor("navbar-transparent");
        }
      };
      mainPanel.addEventListener("scroll", scrollHandler);
    }

    return function cleanup() {
      if (ps) {
        ps.destroy();
        ps = null;
      }
      if (mainPanel && scrollHandler) {
        mainPanel.removeEventListener("scroll", scrollHandler);
      }
      if (navigator.platform.indexOf("Win") > -1) {
         document.documentElement.classList.add("perfect-scrollbar-off");
         document.documentElement.classList.remove("perfect-scrollbar-on");
      }
    };
  }, []);

  // --- Mobile Off-Canvas Sidebar Logic ---
  const toggleSidebar = () => {
    setSidebarOpened(!sidebarOpened);
    document.documentElement.classList.toggle("nav-open");
  };

  const closeSidebar = () => { // Called by Sidebar links
    if (sidebarOpened) {
      setSidebarOpened(false);
      document.documentElement.classList.remove("nav-open");
    }
  };
  // --- End Mobile Logic ---

  const getRoutes = (routes) => { 
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route path={prop.path} element={prop.component} key={key} exact />
        );
      } else {
        return null;
      }
    });
  };

  const getActiveRoute = (routes) => { 
    let activeRoute = "Dashboard"; 
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i];
        if (route.collapse) {
            let collapseActiveRoute = getActiveRoute(route.views);
            if (collapseActiveRoute !== "Dashboard" && window.location.pathname.includes(route.layout + route.path)) {
                return collapseActiveRoute;
            }
        } else {
            if (window.location.pathname === (route.layout + route.path)) {
                return route.name;
            }
        }
    }
    if (window.location.pathname === "/admin/" || window.location.pathname === "/admin/dashboard") {
        const dashboardRoute = routes.find(r => !r.collapse && (r.path === "/dashboard" || r.path === "dashboard"));
        if (dashboardRoute) return dashboardRoute.name;
    }
    return activeRoute;
  };

  const handleActiveClick = (color) => {
    setActiveColor(color);
  };

  return (
    <div className="wrapper">
      <Sidebar
        {...props}
        routes={routes}
        activeColor={activeColor}
        logo={{
          outterLink: "/",
          imgSrc: voraLogo,
        }}
        closeSidebar={closeSidebar} // Important for mobile nav links
      />
      <div className="main-panel" ref={mainPanelRef} data={activeColor}>
        <AdminNavbar
          {...props}
          brandText={getActiveRoute(routes)}
          navbarColor={navbarBackgroundColor}
          sidebarOpened={sidebarOpened}
          toggleSidebar={toggleSidebar}
        />
        <Routes>
          {getRoutes(routes)}
          <Route
            path="/"
            element={<Navigate to="/admin/dashboard" replace />}
          />
        </Routes>
        {location.pathname.indexOf("full-screen-map") === -1 ? <Footer fluid /> : null}
      </div>
      <FixedPlugin
        activeColor={activeColor}
        handleActiveClick={handleActiveClick}
      />
    </div>
  );
};

export default Admin;