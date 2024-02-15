
// SidebarLink.js
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SidebarLink = ({ to, icon, name, isActive, onClick }) => (
  <>
  <br></br>
  <br></br>
  <br></br>
  <Link
    to={to}
    className={`sidebar-link ${isActive ? "active" : ""}`}
    onClick={onClick}
  >
    <FontAwesomeIcon icon={icon} />
    {name}
  </Link></>
);

export default SidebarLink;