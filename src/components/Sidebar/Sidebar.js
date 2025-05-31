import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import PerfectScrollbar from "perfect-scrollbar";
import { Nav, Collapse } from "reactstrap";

var ps;

const Sidebar = (props) => {
  const [state, setState] = React.useState({});
  const sidebarRef = React.useRef(null);
  const location = useLocation();

  React.useEffect(() => {
    if (props.routes && Array.isArray(props.routes)) {
        setState(getCollapseStates(props.routes));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        ps = null;
      }
    };
  }, []);

  const getCollapseStates = (routes) => {
    let initialState = {};
    routes.forEach((prop) => {
      if (prop.collapse && prop.state) {
        initialState = {
          ...initialState,
          [prop.state]: getCollapseInitialState(prop.views),
          ...getCollapseStates(prop.views),
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
      // If hideInSidebar is true, don't render this link (unless it's a collapse parent)
      if (prop.hideInSidebar && !prop.collapse) {
        return null;
      }
      if (prop.redirect) {
        return null;
      }
      if (prop.collapse) {
        var st = {};
        st[prop.state] = !state[prop.state];
        return (
          <li
            className={getCollapseInitialState(prop.views) ? "active" : ""}
            key={key}
          >
            <a
              href="#pablo"
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
      // Only render if not explicitly hidden and has a name (standard links)
      if (prop.name) { 
        return (
          <li className={activeRoute(prop.layout + prop.path)} key={key}>
            <NavLink 
              to={prop.layout + prop.path} 
              onClick={props.closeSidebar}
              className={navLink => (navLink.isActive ? "active" : "")}
            >
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
      }
      return null; // Don't render if no name or other conditions not met
    });
  };

  const activeRoute = (routeName) => {
    return location.pathname.startsWith(routeName) && routeName !== "/" ? "active" : "";
  };

  const { activeColor, logo } = props;
  let logoNormalDisplay = null;

  if (logo && logo.imgSrc) {
    const imageElement = <img src={logo.imgSrc} alt="Vora Logo" style={{ maxHeight: "45px" }} />;
    if (logo.outterLink) {
      logoNormalDisplay = (
        <a
          href={logo.outterLink}
          className="simple-text logo-normal"
          target="_blank"
          rel="noopener noreferrer"
          onClick={props.closeSidebar}
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
        {logoNormalDisplay && (
          <div
            className="logo"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "15px 0px",
              height: "auto",
              minHeight: "70px",
            }}
          >
            {logoNormalDisplay}
          </div>
        )}
        <Nav>{props.routes && Array.isArray(props.routes) && createLinks(props.routes)}</Nav>
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
      innerLink: PropTypes.string,
      outterLink: PropTypes.string,
      imgSrc: PropTypes.string.isRequired,
    }),
  ]),
  closeSidebar: PropTypes.func,
};

export default Sidebar;
