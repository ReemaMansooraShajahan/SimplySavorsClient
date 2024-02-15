// Sidebar.js
import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import SidebarLink from "./SidebarLink";
import { useCookies } from "react-cookie";

// Sidebar.js

// ... (imports)

const Sidebar = ({ close, links, location, isLoggedIn, setIsLoggedIn }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const toggleProfileDropdown = (event) => {
    event.preventDefault();
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const closeProfileDropdown = () => {
    setProfileDropdownOpen(false);
  };

  const handleLogout = () => {
    removeCookie("access_token");
    window.localStorage.removeItem("userID");
    navigate("/logout");
    close();
  };

  return (
    <div className="sec">
      <div className="sec-links">
        {links.map((link) => (
          <React.Fragment key={link.name}>
            {link.name === "MyProfile" && !isLoggedIn ? null : (
              <React.Fragment>
                {link.name === "MyProfile" && link.dropdown ? (
                  <div className="sec-links">
                    <br></br>
                    <Link
                      to="#"
                      onClick={(event) => {
                        toggleProfileDropdown(event);
                      }}
                      className={`sidebar-link ${profileDropdownOpen ? "active" : ""}`}
                    >
                      <FontAwesomeIcon icon={faUserCircle} /> My Profile
                    </Link>
                    {profileDropdownOpen && (
                      <div className="sec-l">
                        {link.items.map((sublink) => (
                          <SidebarLink
                            key={sublink.name}
                            to={sublink.path}
                            icon={sublink.icon}
                            name={sublink.name}
                            isActive={location.pathname === sublink.path}
                            onClick={() => {
                              closeProfileDropdown();
                              close();
                            }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <SidebarLink
                    to={link.path}
                    icon={link.icon}
                    name={link.name}
                    isActive={location.pathname === link.path}
                    onClick={() => {
                      closeProfileDropdown();
                      close();
                    }}
                  />
                )}
              </React.Fragment>
            )}
          </React.Fragment>
        ))}

        <SidebarLink
          to={isLoggedIn ? "/logout" : "/login"}
          icon={isLoggedIn ? faSignOut : faUserCircle}
          name={isLoggedIn ? "Logout" : "Login/Register"}
          isActive={location.pathname === (isLoggedIn ? "/logout" : "/login")}
          onClick={() => {
            if (isLoggedIn) {
              handleLogout();
            } else {
              close();
            }
          }}
        />
      </div>
    </div>
  );
};

export default Sidebar;
