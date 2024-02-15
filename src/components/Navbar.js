// Navbar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { faHome, faList, faCog, faUser, faSignOut, faFileCirclePlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import Home from "../Pages/Home";
import Sidebar from "./Sidebar";
import ViewRecipes from "../Pages/ViewRecipes";
import MyProfile from "./MyProfile";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const location = useLocation();
  const [showSideBar, setShowSideBar] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false); // New state variable
  const [cookies, setCookies, removeCookie] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const links = [
    {
      name: "Home  ",
      path: "/",
      icon: faHome,
      component: Home
    },
    {
      name: "ViewRecipes",
      path: "/viewrecipes",
      icon: faList,
      component: ViewRecipes
    },
    {
      name: "MyProfile",
      path: "/profile",
      icon: faUser,
      dropdown: true,
      items: [
        { name: "User Profile", path: "/userprofile", icon: faUser },
        { name: "Add Recipes", path: "/addrecipes", icon: faFileCirclePlus },
        { name: "Favorites", path: "/favorites", icon: faHeart },
        { name: "Settings", path: "/settings", icon: faCog },
      ],
      component: MyProfile
    }
  ];

  useEffect(() => {
    setIsLoggedIn(!!cookies.access_token);
  }, [cookies.access_token]);

  const handleLogout = () => {
    removeCookie("access_token");
    window.localStorage.removeItem("userID");
    setIsLoggedIn(false);
    navigate("/logout");
  };

  const closeSidebarAndDropdown = () => {
    setShowSideBar(false);
    setShowProfileDropdown(false); // Close the profile dropdown when closing the sidebar
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <>
      <div className="Navbar container">
        <Link to="/home" className="logo" onClick={closeSidebarAndDropdown}>
          <span>S</span>imply<span>S</span>avors
        </Link>
        <div className="nav-links">
          {links.map((link) => (
            <React.Fragment key={link.name}>
              {link.name === "MyProfile" && !isLoggedIn ? null : (
                <React.Fragment>
                  {link.name === "MyProfile" && link.dropdown ? (
                    <div className="my-profile-dropdown">
                      <Link
                        to={link.path}
                        className={`sidebar-pro ${showProfileDropdown ? "active" : ""}`}
                        onClick={toggleProfileDropdown}
                      >
                        {link.name}
                      </Link>
                      {showProfileDropdown && (
                        <div className="sidebar-link">
                          {link.items.map((sublink) => (
                            <Link
                              key={sublink.name}
                              to={sublink.path}
                              className={location.pathname === sublink.path ? "active" : ""}
                              onClick={() => {
                                closeSidebarAndDropdown();
                              }}
                            >
                              {sublink.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      className={location.pathname === link.path ? "active" : ""}
                      to={link.path}
                      onClick={() => {
                        closeSidebarAndDropdown();
                        if (link.dropdown) {
                          setShowProfileDropdown(false); // Close the profile dropdown when navigating to another page
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          ))}
          {isLoggedIn ? (
            <Link to="/logout" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
            <Link to="/login">Login/Register</Link>
          )}
        </div>
        <div
          onClick={() => setShowSideBar(true)}
          className={showSideBar ? "sidebar-btn active" : "sidebar-btn"}
        >
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>
      <div className="eee">
      {showSideBar && (
        <Sidebar
          close={closeSidebarAndDropdown}
          links={links}
          location={location}
          showProfileDropdown={showProfileDropdown}
          setShowProfileDropdown={setShowProfileDropdown}
          isLoggedIn={isLoggedIn}
          setLoggedIn={setIsLoggedIn}
        />
      )}</div>

    </>
  );
};

export default Navbar;
