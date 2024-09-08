import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { MdMenuOpen } from "react-icons/md";
import { Button } from "@mui/material";
import SearchBox from "../SearchBox";
import { MdOutlineMenu } from "react-icons/md";
import { MdOutlineLightMode } from "react-icons/md";
import { MdDarkMode } from "react-icons/md";
import { IoCartOutline, IoShieldHalfSharp } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import "./Header.css";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Logout from "@mui/icons-material/Logout";
import Divider from "@mui/material/Divider";
import { MyContext } from "../../App";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpenNotificationDrop, setIsOpenNotificationDrop] = useState(false);
  const openMyAcc = Boolean(anchorEl);
  const openNotification = Boolean(isOpenNotificationDrop);
  const context = useContext(MyContext);

  const handleOpenMyAccDrop = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMyAccDrop = () => {
    setAnchorEl(null);
  };

  const handleOpenNotificationDrop = () => {
    setIsOpenNotificationDrop(true);
  };
  const handleCloseNotificationDrop = () => {
    setIsOpenNotificationDrop(false);
  };

  return (
    <>
      <header className="d-flex align-items-center">
        <div className="container-fluid w-100">
          <div className="row d-flex align-items-center">
            <div className="col-sm-2 part1">
              <Link to="/" className="d-flex align-items-center logo">
                <img src={logo} alt="" />
                <span className="ml-2">HOTASH</span>
              </Link>
            </div>
            <div className="col-sm-3 d-flex align-items-center part2 pl-4">
              <Button
                className="rounded-circle mr-3"
                onClick={() =>
                  context.setIsToggleSidebar(!context.isToggleSidebar)
                }
              >
                {context.isToggleSidebar === false ? (
                  <MdMenuOpen />
                ) : (
                  <MdOutlineMenu />
                )}
              </Button>
              <SearchBox />
            </div>

            <div className="col-sm-7 d-flex align-items-center part3 justify-content-end">
              <Button className="rounded-circle mr-3">
                <MdOutlineLightMode></MdOutlineLightMode>
              </Button>
              <Button className="rounded-circle mr-3">
                <IoCartOutline></IoCartOutline>
              </Button>

              <Button className="rounded-circle mr-3">
                <MdOutlineMailOutline></MdOutlineMailOutline>
              </Button>

              <div className="dropdownWrapper position-relative">
                <Button
                  id="btn-faregbell"
                  aria-controls={
                    isOpenNotificationDrop ? "notifications" : undefined
                  }
                  className="rounded-circle mr-3"
                  onClick={handleOpenNotificationDrop}
                  aria-haspopup="true"
                  aria-expanded={isOpenNotificationDrop ? "true" : undefined}
                >
                  <FaRegBell></FaRegBell>
                </Button>
                <Menu
                  anchorEl={isOpenNotificationDrop}
                  className="notifications dropdown_list"
                  id="notifications"
                  open={openNotification}
                  onClose={handleCloseNotificationDrop}
                  aria-labelledby="faregbell"
                  // MenuListProps={{
                  //   "aria-labelledby": "buttonabc",
                  // }}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                >
                  <div className="head pl-3 pb-0">
                    <h4>Orders (12)</h4>
                  </div>
                  <Divider className="mb-1" />
                  <div className="scroll">
                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>

                    <MenuItem onClick={handleCloseNotificationDrop}>
                      <div className="d-flex">
                        <div>
                          <div className="userImg">
                            <span className="rounded-circle">
                              <img
                                src="https://res.cloudinary.com/dhbnnafid/image/upload/v1725441828/samples/smile.jpg"
                                alt=""
                              />
                            </span>
                          </div>
                        </div>

                        <div className="dropdownInfo">
                          <h4>
                            <span>
                              <b>Mahmudul</b>
                              added to his favorite list
                              <b>Leather belt steve madden</b>
                            </span>
                          </h4>
                        </div>
                      </div>
                    </MenuItem>
                  </div>
                  <div className="pl-3 pr-3 w-100 pt-3 pb-1">
                    <Button className="btn-blue w-100">
                      View all notifications
                    </Button>
                  </div>
                </Menu>
              </div>

              <div className="myAccWrapper">
                <Button
                  className="myAcc d-flex align-items-center"
                  onClick={handleOpenMyAccDrop}
                >
                  <div className="userImg">
                    <span className="rounded-circle">
                      <img
                        src="https://miconcoder-hotash.netlify.app/images/avatar/01.webp"
                        alt=""
                      />
                    </span>
                  </div>
                  <div className="userInfo">
                    <h4>Rinku Verma</h4>
                    <p className="mb-0">@rinkuv37</p>
                  </div>
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  id="account-menu"
                  open={openMyAcc}
                  onClose={handleCloseMyAccDrop}
                  onClick={handleCloseMyAccDrop}
                  slotProps={{
                    paper: {
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&::before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    },
                  }}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                >
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <ListItemIcon>
                      <PersonAdd fontSize="small" />
                    </ListItemIcon>
                    My Account
                  </MenuItem>
                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <ListItemIcon>
                      <IoShieldHalfSharp />
                    </ListItemIcon>
                    Reset Password
                  </MenuItem>

                  <MenuItem onClick={handleCloseMyAccDrop}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
