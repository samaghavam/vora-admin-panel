/*!
=========================================================
* Black Dashboard PRO React - v1.2.4
* Modified FixedPlugin for Theme Mode Toggle Only with LocalStorage
=========================================================
*/
import React, { useState, useEffect } from "react";
import { CustomInput } from "reactstrap";

const FixedPlugin = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Initialize switch state:
  // true if dark mode is active, false if light mode (white-content) is active.
  const [isDarkActive, setIsDarkActive] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    // If a theme is stored, use it. Otherwise, check body class (which Admin.js might have set).
    // Default to dark mode if no info at all.
    if (storedTheme) {
      return storedTheme === 'dark';
    }
    return !document.body.classList.contains("white-content");
  });

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleThemeModeToggle = () => {
    const newIsDarkActive = !isDarkActive; // Target state after toggle
    if (newIsDarkActive) {
      document.body.classList.remove("white-content");
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add("white-content");
      localStorage.setItem('theme', 'light');
    }
    setIsDarkActive(newIsDarkActive);
  };

  // Effect to listen for external changes to body class (e.g., dev tools) and update switch
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const currentBodyIsDark = !document.body.classList.contains("white-content");
      if (currentBodyIsDark !== isDarkActive) {
        setIsDarkActive(currentBodyIsDark);
        // Optionally re-sync localStorage here if body is canonical, but toggle should handle it.
        // localStorage.setItem('theme', currentBodyIsDark ? 'dark' : 'light');
      }
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [isDarkActive]);


  return (
    <div className="fixed-plugin">
      <div className={`dropdown ${dropdownOpen ? "show" : ""}`}>
        <a
          href="#pablo"
          onClick={(e) => {
            e.preventDefault();
            toggleDropdown();
          }}
        >
          <i className="fa fa-cog fa-2x" />
        </a>
        <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
          <li className="header-title">DISPLAY MODE</li>
          <li className="adjustments-line">
            <div className="togglebutton switch-change-color mt-3 d-flex align-items-center justify-content-center">
              <span className="label-switch">LIGHT</span>
              <CustomInput
                type="switch"
                id="theme-mode-switch"
                checked={isDarkActive} // Switch is ON when Dark Mode is active
                onChange={handleThemeModeToggle}
                className="mt-n4" // Check visual alignment of this class
                label="" // Add empty label for accessibility / reactstrap
              />
              <span className="label-switch ml-n3">DARK</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FixedPlugin;