import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../style/Layout.css";

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  const getActiveClass = (path) => location.pathname === path ? "active" : "";

  const organisationMenu = [
    { to: "/", icon: "fa-solid fa-warehouse", label: "Inventory" },
    { to: "/donar", icon: "fa-solid fa-hand-holding-medical", label: "Donar" },
    { to: "/hospital", icon: "fa-solid fa-hospital", label: "Hospital" },
  ];

  const adminMenu = [
    { to: "/donar-list", icon: "fa-solid fa-warehouse", label: "Donar List" },
    { to: "/hospital-list", icon: "fa-solid fa-hand-holding-medical", label: "Hospital List" },
    { to: "/org-list", icon: "fa-solid fa-hospital", label: "Organisation List" },
  ];

  const commonMenu = [
    { to: "/orgnaisation", icon: "fa-sharp fa-solid fa-building-ngo", label: "Orgnaisation" },
    { to: "/consumer", icon: "fa-sharp fa-solid fa-building-ngo", label: "Consumer" },
    { to: "/donation", icon: "fa-sharp fa-solid fa-building-ngo", label: "Donation" },
  ];

  const renderMenuItems = (menuItems) => {
    return menuItems.map((item) => (
      <div className={`menu-item ${getActiveClass(item.to)}`} key={item.to}>
        <i className={item.icon}></i>
        <Link to={item.to}>{item.label}</Link>
      </div>
    ));
  };

  return (
    <div>
      <div className="sidebar">
        <div className="menu">
          {user?.role === "organisation" && renderMenuItems(organisationMenu)}
          {user?.role === "admin" && renderMenuItems(adminMenu)}
          {(user?.role === "donar" || user?.role === "hospital") && renderMenuItems(commonMenu)}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
