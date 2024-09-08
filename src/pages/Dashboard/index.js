import React, { useState } from "react";
import DashboardBox from "./components/DashboardBox";
import "./Dashboard.css";
import { FaPencilAlt, FaUserCircle } from "react-icons/fa";
import { IoMdCart } from "react-icons/io";
import { MdDelete, MdShoppingBag } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoIosTimer } from "react-icons/io";
import { Button } from "@mui/material";
import { HiDotsVertical } from "react-icons/hi";
import { Chart } from "react-google-charts";

import InputLabel from "@mui/material/InputLabel";
// import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { FaEye } from "react-icons/fa6";
import Pagination from "@mui/material/Pagination";

export const data = [
  ["Task", "Hours per Day"],
  ["Work", 11],
  ["Eat", 2],
  ["Commute", 2],
  ["Watch TV", 2],
  ["Sleep", 7],
];

export const options = {
  backgroundColor: "transparent",
  chartArea: { width: "100%", height: "100%" },
};

const Dashboard = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showBy, setShowBy] = useState("");
  const [catBy, setCatBy] = useState("");
  const open = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className="right-content w-100">
        <div className="row dashboardBoxWrapperRow">
          <div className="col-md-8">
            <div className="dashboardBoxWrapper d-flex">
              <DashboardBox
                color={["#1da256", "#48d483"]}
                icon={<FaUserCircle />}
                grow={true}
              />
              <DashboardBox
                color={["#c012e2", "#eb64fe"]}
                icon={<IoMdCart />}
              />
              <DashboardBox
                color={["#2c78e5", "#60aff5"]}
                icon={<MdShoppingBag />}
              />
              <DashboardBox
                color={["#e1950e", "#f3cd29"]}
                icon={<GiStarsStack />}
              />
            </div>
          </div>
          <div className="col-md-4 pl-0">
            <div className="box graphBox">
              <div className="d-flex align-items-center w-100 bottomEle">
                <h6 className="text-white mb-0 mt-0">Total Sales</h6>
                <div className="ml-auto">
                  <Button className="ml-auto toggleIcon" onClick={handleClick}>
                    <HiDotsVertical></HiDotsVertical>
                  </Button>
                  <Menu
                    className="dropdown_menu"
                    id=""
                    MenuListProps={{
                      "aria-labelledby": "long-button",
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    slotProps={{
                      paper: {
                        style: {
                          maxHeight: ITEM_HEIGHT * 4.5,
                          width: "20ch",
                        },
                      },
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer /> Last Day
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer />
                      Last Week
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer />
                      Last Month
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                      <IoIosTimer />
                      Last Year
                    </MenuItem>
                  </Menu>
                </div>
              </div>

              <h3 className="text-white font-weight-bold">13,787,681.00</h3>
              <p>13,578.90 in last month</p>
              <Chart
                chartType="PieChart"
                data={data}
                options={options}
                width={"100%"}
                height={"170px"}
              />
            </div>
          </div>
        </div>

        <div className="card shadow border-0 p-3 mt-4">
          <h3>Best Selling Products</h3>
          <div className="row cardFilters mt-3">
            <div className="col-md-3">
              <h4>SHOW BY</h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={showBy}
                  onChange={(e) => setShowBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
            <div className="col-md-3">
              <h4>CATEGORY BY </h4>
              <FormControl size="small" className="w-100">
                <Select
                  value={catBy}
                  onChange={(e) => setCatBy(e.target.value)}
                  displayEmpty
                  inputProps={{ "aria-label": "Without label" }}
                  labelId="demo-select-small-label"
                  className="w-100"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>

          <div className="table-responsive mt-3">
            <table className="table table-bordered v-align">
              <thead className="thead-dark">
                <tr>
                  <th>UID</th>
                  <th style={{ width: "300px" }}>PRODUCT</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th>PRICE</th>
                  <th>STOCK</th>
                  <th>RATING</th>
                  <th>ORDER</th>
                  <th>SALES</th>
                  <th>ACTION</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>#1</td>
                  <td>
                    <div className="d-flex align-items-center productBox">
                      <div className="imgWrapper">
                        <div className="img">
                          <img
                            src="https://res-console.cloudinary.com/dhbnnafid/media_explorer_thumbnails/d09f316e783d7cca150b20f579fd8fb8/detailed"
                            alt=""
                            className="w-100"
                          />
                        </div>
                      </div>
                      <div className="info pl-0">
                        <h6>Tops and skirt set for Female</h6>
                        <p>
                          Women's exclusive summer tops and skirt set for female
                          tops and skirt set
                        </p>
                      </div>
                    </div>
                  </td>
                  <td>Womans</td>
                  <td>Richman</td>
                  <td style={{ width: "70px" }}>
                    <del className="old">$21.00</del>
                    <span className="new text-danger">$21.00</span>
                  </td>
                  <td>30</td>
                  <td>4.9(16)</td>
                  <td>380</td>
                  <td>$38k</td>
                  <td>
                    <div className="actions d-flex align-items-center">
                      <Button className="secondary" color="secondary">
                        <FaEye></FaEye>
                      </Button>
                      <Button className="success" color="success">
                        <FaPencilAlt></FaPencilAlt>
                      </Button>
                      <Button className="error" color="error">
                        <MdDelete></MdDelete>
                      </Button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="d-flex tableFooter">
              <p>
                showing<b>12</b> of <b>60</b> results
              </p>
              <Pagination
                count={10}
                color="primary"
                className="pagination"
                showFirstButton
                showLastButton
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
