import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaHome,
  FaBox,
  FaPlus,
  FaMapMarkerAlt,
} from "react-icons/fa";

function Sidebar() {
  const baseStyle = {
    display: "flex",
    alignItems: "center",
    padding: "10px 15px",
    borderRadius: "8px",
    textDecoration: "none",
    color: "white",
    transition: "all 0.3s ease",
  };

  const getLinkStyle = ({ isActive }) => ({
    ...baseStyle,
    background: isActive ? "#0d6efd" : "transparent",
  });

  const handleMouseEnter = (e) => {
    if (!e.currentTarget.classList.contains("active")) {
      e.currentTarget.style.background = "#495057";
    }
    e.currentTarget.style.transform = "translateX(5px)";
  };

  const handleMouseLeave = (e) => {
    if (!e.currentTarget.classList.contains("active")) {
      e.currentTarget.style.background = "transparent";
    }
    e.currentTarget.style.transform = "translateX(0)";
  };

  return (
    <div
      style={{
        width: "220px",
        height: "100vh",
        background: "#343a40",
        color: "white",
      }}
      className="p-3"
    >
      <h4 className="text-center mb-4">Inventory</h4>

      <ul className="nav flex-column">

        <li className="nav-item mb-2">
          <NavLink
            to="/"
            style={getLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaHome className="me-2" />
            Dashboard
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/products"
            style={getLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaBox className="me-2" />
            Products
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/add-product"
            style={getLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaPlus className="me-2" />
            Add Product
          </NavLink>
        </li>

        <li className="nav-item mb-2">
          <NavLink
            to="/locations"
            style={getLinkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <FaMapMarkerAlt className="me-2" />
            Locations
          </NavLink>
        </li>

      </ul>
    </div>
  );
}

export default Sidebar;