/*!
=========================================================
* Admin Layout - LocalStorage Theme & Sticky Navbar
=========================================================
*/
import React from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import PerfectScrollbar from "perfect-scrollbar";
import NotificationAlert from "react-notification-alert";

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js"; // Your modified FixedPlugin

import routes from "routes.js";
import voraLogo from "assets/img/vora.svg";

var ps;

const Admin = (props) => {
  const [activeColor, setActiveColor] = React.useState("primary"); // Sidebar color fixed to primary
  const [sidebarOpened, setSidebarOpened] = React.useState(false);
  const mainPanelRef = React.useRef(null);
  const notificationAlertRef = React.useRef(null);
  const location = useLocation();
  const [navbarBackgroundColor, setNavbarBackgroundColor] = React.useState("navbar-transparent");

  // Effect for initial theme load from localStorage and scroll to top
  React.useEffect(() => {
    // --- Initial Theme Setup ---
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'light') {
      document.body.classList.add("white-content");
    } else if (storedTheme === 'dark') {
      document.body.classList.remove("white-content");
    } else {
      // Default to dark theme if nothing is stored, and save it
      document.body.classList.remove("white-content");
      localStorage.setItem('theme', 'dark');
    }
    // --- End Initial Theme Setup ---

    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    if (mainPanelRef.current) {
      mainPanelRef.current.scrollTop = 0;
    }
  }, [location]); // location dependency for scroll to top

  // Effect for PerfectScrollbar, sidebar-mini removal, and navbar scroll background
  React.useEffect(() => {
    document.body.classList.remove("sidebar-mini"); // Ensures sidebar is not in mini-mode

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
          setNavbarBackgroundColor("navbar-custom-opaque");
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
  }, []); // Empty dependency array for mount/unmount logic

  const toggleSidebar = () => {
    setSidebarOpened(!sidebarOpened);
    document.documentElement.classList.toggle("nav-open");
  };

  const closeSidebar = () => {
    if (sidebarOpened) {
      setSidebarOpened(false);
      document.documentElement.classList.remove("nav-open");
    }
  };

  const getRoutes = (routes) => { /* ... (your existing getRoutes function) ... */
    return routes.map((prop, key) => {
      if (prop.collapse) { return getRoutes(prop.views); }
      if (prop.layout === "/admin") {
        return (<Route path={prop.path} element={prop.component} key={key} exact />);
      } else { return null; }
    });
  };

  const getActiveRoute = (routes) => { /* ... (your existing getActiveRoute function, ensure it has a good default) ... */
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

  return (
    <div className="wrapper">
      <div className="rna-container">
        <NotificationAlert ref={notificationAlertRef} />
      </div>
      <Sidebar
        {...props}
        routes={routes}
        activeColor={activeColor} // Will always be "primary"
        logo={{ outterLink: "/", imgSrc: voraLogo }}
        closeSidebar={closeSidebar}
      />
      <div className="main-panel" ref={mainPanelRef} data={activeColor}>
        <AdminNavbar
          {...props}
          brandText={getActiveRoute(routes)}
          navbarColor={navbarBackgroundColor}
          sidebarOpened={sidebarOpened}
          toggleSidebar={toggleSidebar}
          location={location}
        />
        <Routes>
          {getRoutes(routes)}
          <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        </Routes>
        {location.pathname.indexOf("full-screen-map") === -1 ? <Footer fluid /> : null}
      </div>
      <FixedPlugin /> {/* FixedPlugin now manages its own theme state with localStorage */}
    </div>
  );
};

export default Admin;