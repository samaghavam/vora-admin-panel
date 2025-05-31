import React from "react";
import classNames from "classnames";

import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavLink,
  Nav,
  Container,
} from "reactstrap";

const AdminNavbar = (props) => {
  const [collapseOpen, setCollapseOpen] = React.useState(false); // For navbar items collapse
  const [localNavbarColor, setLocalNavbarColor] = React.useState("navbar-transparent"); // For mobile navbar items collapse background

  React.useEffect(() => {
    const updateLocalColorOnResize = () => {
      if (window.innerWidth < 993 && collapseOpen) {
        setLocalNavbarColor("bg-white");
      } else {
        setLocalNavbarColor("navbar-transparent");
      }
    };
    window.addEventListener("resize", updateLocalColorOnResize);
    updateLocalColorOnResize(); // Initial check
    return function cleanup() {
      window.removeEventListener("resize", updateLocalColorOnResize);
    };
  }, [collapseOpen]);

  const toggleNavbarCollapse = () => {
    setCollapseOpen(!collapseOpen);
    if (!collapseOpen && window.innerWidth < 993) {
        setLocalNavbarColor("bg-white");
    } else {
        setLocalNavbarColor("navbar-transparent");
    }
  };
  
  let finalNavbarClass = props.navbarColor;
  if (window.innerWidth < 993 && collapseOpen) {
    finalNavbarClass = "bg-white";
  }

  return (
    <>
      <Navbar
        className={classNames(
          "navbar-absolute",
          finalNavbarClass
        )}
        expand="lg"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1030,
        }}
      >
        <Container fluid>
          <div className="navbar-wrapper">
            <div
              className={classNames("navbar-toggle d-inline", {
                toggled: props.sidebarOpened,
              })}
            >
              <button
                className="navbar-toggler"
                type="button"
                onClick={props.toggleSidebar}
              >
                <span className="navbar-toggler-bar bar1" />
                <span className="navbar-toggler-bar bar2" />
                <span className="navbar-toggler-bar bar3" />
              </button>
            </div>
            <NavbarBrand href="#pablo" onClick={(e) => e.preventDefault()}>
              {props.brandText}
            </NavbarBrand>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navigation"
            aria-expanded={collapseOpen}
            aria-label="Toggle navigation"
            onClick={toggleNavbarCollapse}
          >
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
            <span className="navbar-toggler-bar navbar-kebab" />
          </button>
          <Collapse navbar isOpen={collapseOpen} id="navigation">
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav>
                <DropdownToggle
                  caret // This prop from reactstrap might render its own caret.
                        // If a caret still appears and you want it gone, set this to caret={false}
                  color="default"
                  data-toggle="dropdown"
                  nav
                  onClick={(e) => e.preventDefault()}
                >
                  <div className="photo">
                    <img alt="..." src={require("assets/img/mike.jpg")} />
                  </div>
                  {/* The <b className="caret ..."></b> element has been REMOVED from here */}
                  <p className="d-lg-none">Log out</p>
                </DropdownToggle>
                <DropdownMenu className="dropdown-navbar" right tag="ul">
                  <NavLink tag="li" href="#profile">
                    <DropdownItem className="nav-item">Profile</DropdownItem>
                  </NavLink>
                  <NavLink tag="li" href="#settings">
                    <DropdownItem className="nav-item">Settings</DropdownItem>
                  </NavLink>
                  <DropdownItem divider tag="li" />
                  <NavLink tag="li" href="#logout">
                    <DropdownItem className="nav-item">Log out</DropdownItem>
                  </NavLink>
                </DropdownMenu>
              </UncontrolledDropdown>
              <li className="separator d-lg-none" />
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;