import React, { useContext, useEffect, useState } from "react";
import "./SignUp.css";
import Logo from "../../assets/images/logo.png";
import { MyContext } from "../../App";
import Pattern from "./../../assets/images/pattern.jpg";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff, IoMdHome } from "react-icons/io";
import { Button, Checkbox, FormControlLabel } from "@mui/material";
import { Link } from "react-router-dom";
import googleIcon from "./../../assets/images/google.png";
import { FaUserCircle } from "react-icons/fa";
import { IoShieldCheckmarkSharp } from "react-icons/io5";

const SignUp = () => {
  const context = useContext(MyContext);
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);

  useEffect(() => {
    context.setIsHideSidebarAndHeader(true);
    window.scrollTo(0, 0);
  }, []);
  const focusInput = (index) => {
    setInputIndex(index);
  };
  return (
    <>
      <img src={Pattern} alt="" className="loginPattern" />
      <section className="loginSection signUpSection">
        <div className="row">
          <div className="col-md-8 d-flex align-items-center justify-content-center flex-column part1">
            <h1>
              BEST UX/UI FASHION{" "}
              <span className="text-sky">ECOMMERCE DASHBOARD</span> & ADMIN
              PANEL
            </h1>
            <p>
              Take your MongoDB skills to the next level with technical
              deep-dives, hands-on labs, expert advice, and more! Take your
              MongoDB skills to the next level with technical deep-dives,
              hands-on labs, expert advice, and more! Take your MongoDB skills
              to the next level with technical deep-dives, hands-on labs, expert
              advice, and more! Take your MongoDB skills to the next level with
              technical deep-dives, hands-on labs, expert advice, and more!
            </p>
            <div className="w-100 mt-4">
              <Link to={"/"}>
                <Button className="btn-blue btn-lg btn-big">
                  <IoMdHome></IoMdHome>Go To Home
                </Button>
              </Link>
            </div>
          </div>
          <div className="col-md-4 pr-0">
            <div className="loginBox">
              <div className="logo text-center">
                <img src={Logo} width="60px" alt="" />
                <h5 className="font-weight-bold">Login to Hotash</h5>
              </div>

              <div className="wrapper mt-3 card border">
                <form action="">
                  <div
                    className={`form-group position-relative ${
                      inputIndex === 0 && "focus"
                    }`}
                  >
                    <span className="icon">
                      <FaUserCircle></FaUserCircle>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter your name"
                      onFocus={() => focusInput(0)}
                      onBlur={() => setInputIndex(null)}
                      autoFocus
                    />
                  </div>
                  <div
                    className={`form-group position-relative ${
                      inputIndex === 1 && "focus"
                    }`}
                  >
                    <span className="icon">
                      <MdEmail></MdEmail>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="enter your email"
                      onFocus={() => focusInput(1)}
                      onBlur={() => setInputIndex(null)}
                    />
                  </div>
                  {/* end email input */}
                  {/* password input */}
                  <div
                    className={`form-group position-relative ${
                      inputIndex === 2 && "focus"
                    }`}
                  >
                    <span className="icon">
                      <RiLockPasswordFill></RiLockPasswordFill>
                    </span>
                    <input
                      type={`${isShowPassword === true ? "text" : "password"}`}
                      className="form-control"
                      placeholder="enter your Password"
                      onFocus={() => focusInput(2)}
                      onBlur={() => setInputIndex(null)}
                    />
                    <span
                      className="toggleShowPassword"
                      onClick={() => setIsShowPassword(!isShowPassword)}
                    >
                      {isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />}
                    </span>
                  </div>
                  {/* end password input */}
                  {/* confirm password */}
                  <div
                    className={`form-group position-relative ${
                      inputIndex === 3 && "focus"
                    }`}
                  >
                    <span className="icon">
                      <IoShieldCheckmarkSharp></IoShieldCheckmarkSharp>
                    </span>
                    <input
                      type={`${
                        isShowConfirmPassword === true ? "text" : "password"
                      }`}
                      className="form-control"
                      placeholder="Confirm your Password"
                      onFocus={() => focusInput(3)}
                      onBlur={() => setInputIndex(null)}
                    />
                    <span
                      className="toggleShowPassword"
                      onClick={() =>
                        setIsShowConfirmPassword(!isShowConfirmPassword)
                      }
                    >
                      {isShowConfirmPassword === true ? (
                        <IoMdEyeOff />
                      ) : (
                        <IoMdEye />
                      )}
                    </span>
                  </div>
                  {/* end confirm password */}

                  <FormControlLabel
                    control={<Checkbox />}
                    label="Iagree to the all terms & Condiotions"
                  ></FormControlLabel>

                  <div className="form-group">
                    <Button className="btn-blue btn-lg w-100 btn-big">
                      Sign Up
                    </Button>
                  </div>
                  <div className="form-group text-center mb-0">
                    <div className="d-flex align-items-center justify-content-center or mt-3 mb-3">
                      <span className="line"></span>
                      <span className="txt">or</span>
                      <span className="line"></span>
                    </div>
                    <Button
                      className="w-100 btn-lg btn-big loginWithGoogle"
                      variant="outlined"
                    >
                      <img src={googleIcon} width="25px" alt="" />
                      &nbsp; Sign In With Google
                    </Button>
                  </div>
                </form>
                <span className="text-center d-block mt-2 ">
                  You have an account
                  <Link to={"/login"} className="link color ml-2">
                    Sign In
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
