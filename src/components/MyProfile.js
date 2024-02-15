import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function MyProfile({ links }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();

  // Close the dropdown when the location changes
  useEffect(() => {
    setDropdownOpen(false);
  }, [location.pathname]);

  const toggleDropdown = () => {
    setDropdownOpen((prevOpen) => !prevOpen);
  };

  const closeDropdown = () => {
    setDropdownOpen(false);
  };

  return (
    <div className={`my-profile-dropdown ${dropdownOpen ? 'active' : ''}`}>
      <Link to="/profile" onClick={toggleDropdown} className={dropdownOpen ? "active" : ""}>
        My Profile
      </Link>
      {dropdownOpen && (
        <div className="dropdown-content">
          {links.map((link) => (
            <Link
              to={link.path}
              key={link.name}
              className={`dropdown-item ${location.pathname === link.path ? "active" : ""}`}
              onClick={closeDropdown}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}



