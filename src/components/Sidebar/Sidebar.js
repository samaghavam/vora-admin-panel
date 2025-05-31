import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import { Nav, Collapse } from "reactstrap";

var ps;

const Sidebar = (props) => {
  const [state, setState] = React.useState({});
  const sidebarRef = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    setState(getCollapseStates(props.routes));
  }, [props.routes]);

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      if (sidebarRef.current) {
         ps = new PerfectScrollbar(sidebarRef.current, {
          suppressScrollX: true,
          suppressScrollY: false,
        });
      }
    }
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1 && ps) {
        ps.destroy();
      }
    };
  }, []);

  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.forEach((prop) => { // Changed map to forEach as it's not returning for an array
      if (prop.collapse) {
        initialState = {
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
          ...initialState,
        };
      }
    });
    return initialState;
  };

  const getCollapseInitialState = (routes) => {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse && getCollapseInitialState(routes[i].views)) {
        return true;
      } else if (window.location.pathname.includes(routes[i].layout + routes[i].path)) {
        return true;
      }
    }
    return false;
  };

  const createLinks = (routes) => {
    const { rtlActive } = props;
    return routes.map((prop, key) => {
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop["state"]] = !state[prop.state];
        return (
          <li
            className={getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#pablo" // Should be a valid link or use button role for accessibility
              data-toggle="collapse"
              aria-expanded={state[prop.state]}
              onClick={(e) => {
                e.preventDefault();
                setState((prevState) => ({ ...prevState, ...st }));
              }}
            >
              {prop.icon !== undefined ? (
                <>
                  <i className={prop.icon} />
                  <p>
                    {rtlActive ? prop.rtlName : prop.name}
                    <b className="caret" />
                  </p>
                </>
              ) : (
                <>
                  <span className="sidebar-mini-icon">
                    {rtlActive ? prop.rtlMini : prop.mini}
                  </span>
                  <span className="sidebar-normal">
                    {rtlActive ? prop.rtlName : prop.name}
                    <b className="caret" />
                  </span>
                </>
              )}
            </a>
            <Collapse isOpen={state[prop.state]}>
              <ul className="nav">{createLinks(prop.views)}</ul>
            </Collapse>
          </li>
        );
      }
      return (
        <li className={activeRoute(prop.layout + prop.path)} key={key}>
          <NavLink to={prop.layout + prop.path} onClick={props.closeSidebar}>
            {prop.icon !== undefined ? (
              <>
                <i className={prop.icon} />
                <p>{rtlActive ? prop.rtlName : prop.name}</p>
              </>
            ) : (
              <>
                <span className="sidebar-mini-icon">
                  {rtlActive ? prop.rtlMini : prop.mini}
                </span>
                <span className="sidebar-normal">
                  {rtlActive ? prop.rtlName : prop.name}
                </span>
              </>
            )}
          </NavLink>
        </li>
      );
    });
  };

  const activeRoute = (routeName) => {
    return location.pathname.includes(routeName) ? "active" : "";
  };

  const { activeColor, logo } = props;
  let logoNormalDisplay = null;

  if (logo && logo.imgSrc) { // Ensure logo and imgSrc are defined
    const imageElement = <img src={logo.imgSrc} alt="Vora Logo" style={{ maxHeight: "45px" /* Adjust as needed */}} />; // Added example style

    if (logo.outterLink) {
      logoNormalDisplay = (
        <a
          href={logo.outterLink}
          className="simple-text logo-normal"
          target="_blank"
          rel="noopener noreferrer"
          onClick={props.closeSidebar} // Added closeSidebar here as well for consistency
        >
          {imageElement}
        </a>
      );
    } else if (logo.innerLink) {
      logoNormalDisplay = (
        <NavLink
          to={logo.innerLink}
          className="simple-text logo-normal"
          onClick={props.closeSidebar}
        >
          {imageElement}
        </NavLink>
      );
    }
  }

  return (
    <div className="sidebar" data={activeColor}>
      <div className="sidebar-wrapper" ref={sidebarRef}>
        {logoNormalDisplay && ( // Check if logoNormalDisplay is not null
          <div
            className="logo"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px 0px", // Adjust padding as needed for vertical centering
              height: "auto", // Let content define height, or set a fixed one
              minHeight: "70px", // Example min-height from themes
            }}
          >
            {logoNormalDisplay}
          </div>
        )}
        <Nav>{props.routes && createLinks(props.routes)}</Nav> {/* Check props.routes exists */}
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  activeColor: PropTypes.oneOf(["primary", "blue", "green", "orange", "red"]),
  rtlActive: PropTypes.bool,
  routes: PropTypes.array.isRequired,
  logo: PropTypes.oneOfType([
    PropTypes.shape({
      innerLink: PropTypes.string, // Made optional if only outterLink is used
      outterLink: PropTypes.string, // Made optional if only innerLink is used
      imgSrc: PropTypes.string.isRequired,
    }),
  ]),
  closeSidebar: PropTypes.func,
};

export default Sidebar;