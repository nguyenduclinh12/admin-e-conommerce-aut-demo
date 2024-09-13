import { Button } from "@mui/material";
import React, { useState } from "react";
import {
  FaAngleRight,
  FaBell,
  FaCartArrowDown,
  FaProductHunt,
} from "react-icons/fa6";
import "./Sidebar.css";
import { MdDashboard, MdMessage } from "react-icons/md";
import { IoIosSettings, IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { Logout } from "@mui/icons-material";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isToggleSubmenu, setIsToggleSubmenu] = useState(false);
  const isOpenSubmenu = (index) => {
    setActiveTab(index);
    setIsToggleSubmenu(!isToggleSubmenu);
  };
  return (
    <>
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/">
              <Button className={`w-100 ${activeTab === 0 ? "active" : ""}`}>
                <span className="icon">
                  <MdDashboard />
                </span>
                Dashboard
                <span className="arrow">
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>

          <li>
            <Button
              className={`w-100 ${
                activeTab === 1 && isToggleSubmenu === true ? "active" : ""
              }`}
              onClick={() => isOpenSubmenu(1)}
            >
              <span className="icon">
                <FaProductHunt />
              </span>
              Products
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                activeTab === 1 && isToggleSubmenu === true
                  ? "colapse"
                  : "colapsed"
              }`}
            >
              <ul className="submenu">
                <li>
                  <Link to="/product">Product List</Link>
                </li>
                <li>
                  <Link to="/product/new">Product New</Link>
                </li>
                <li>
                  <Link to="#">Product Upload</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Button
              className={`w-100 ${
                activeTab === 2 && isToggleSubmenu === true ? "active" : ""
              }`}
              onClick={() => isOpenSubmenu(2)}
            >
              <span className="icon">
                <FaProductHunt />
              </span>
              Catalogue
              <span className="arrow">
                <FaAngleRight />
              </span>
            </Button>
            <div
              className={`submenuWrapper ${
                activeTab === 2 && isToggleSubmenu === true
                  ? "colapse"
                  : "colapsed"
              }`}
            >
              <ul className="submenu">
                <li>
                  <Link to="/category">Catalogue List</Link>
                </li>
                <li>
                  <Link to="/category/add">Catalogue Create</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
        <br />
        <div className="logoutWrapper">
          <div className="logoutBox">
            <Button variant="contained">
              <IoMdLogOut></IoMdLogOut>
              Logout
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
