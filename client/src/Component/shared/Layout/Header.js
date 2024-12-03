import React from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();

  // Logout handler
  const handleLogout = () => {
    localStorage.clear();
    alert("Logged out successfully!");
    navigate("/login");
  };

  return (
    <nav className="bg-red-600 text-white px-4 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Section */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <BiDonateBlood className="text-2xl" />
          <span>Blood Bank App</span>
        </div>

        {/* Navigation Section */}
        <ul className="flex items-center gap-6">
          {/* User Welcome Section */}
          {user && (
            <li className="flex items-center gap-2">
              <BiUserCircle className="text-2xl" />
              <p className="text-sm">
                Welcome,{" "}
                <span className="font-semibold">
                  {user?.name || user?.hospitalName || user?.organisationName}
                </span>
                <span className="ml-2 bg-gray-200 text-red-600 text-xs px-2 py-1 rounded">
                  {user?.role}
                </span>
              </p>
            </li>
          )}

          {/* Conditional Links */}
          {location.pathname === "/" ||
          location.pathname === "/donar" ||
          location.pathname === "/hospital" ? (
            <li>
              <Link
                to="/analytics"
                className="text-sm hover:underline hover:text-gray-300"
              >
                Analytics
              </Link>
            </li>
          ) : (
            <li>
              <Link
                to="/"
                className="text-sm hover:underline hover:text-gray-300"
              >
                Home
              </Link>
            </li>
          )}

          {/* Logout Button */}
          <li>
            <button
              onClick={handleLogout}
              className="bg-white text-red-600 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Header;
