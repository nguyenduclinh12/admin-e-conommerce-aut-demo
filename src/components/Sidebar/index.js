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
  console.log(activeTab);
  console.log(isToggleSubmenu);
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
                  <Link to="#">Product List</Link>
                </li>
                <li>
                  <Link to="#">Product View</Link>
                </li>
                <li>
                  <Link to="#">Product Upload</Link>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <Link to="/">
              <Button
                className={`w-100 ${activeTab === 2 && isToggleSubmenu === true ? "active" : ""}`}
                onClick={() => isOpenSubmenu(2)}
              >
                <span className="icon">
                  <FaCartArrowDown />
                </span>
                Orders
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
                    <Link to="#">Order List</Link>
                  </li>
                  <li>
                    <Link to="#">Order View</Link>
                  </li>
                  <li>
                    <Link to="#">Order Upload</Link>
                  </li>
                </ul>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button className={`w-100 ${activeTab === 3 ? "active" : ""}`}>
                <span className="icon">
                  <MdMessage />
                </span>
                Messages
                <span className="arrow">
                  <FaAngleRight />
                </span>
              </Button>
              
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button className={`w-100 ${activeTab === 4 ? "active" : ""}`}>
                <span className="icon">
                  <FaBell />
                </span>
                notifications
                <span className="arrow">
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>
          <li>
            <Link to="/">
              <Button className={`w-100 ${activeTab === 5 ? "active" : ""}`}>
                <span className="icon">
                  <IoIosSettings />
                </span>
                Settings
                <span className="arrow">
                  <FaAngleRight />
                </span>
              </Button>
            </Link>
          </li>
        </ul>
        <br />
        <div className="logoutWrapper">
          <div className="logoutBox">
            <Button variant="contained">
              <IoMdLogOut>Logout</IoMdLogOut>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
