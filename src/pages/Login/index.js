import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import Logo from "../../assets/images/logo.png";
import { MyContext } from "../../App";
import Pattern from "./../../assets/images/pattern.jpg";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import googleIcon from "./../../assets/images/google.png";

const Login = () => {
  const context = useContext(MyContext);
  const [inputIndex, setInputIndex] = useState(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    context.setIsHideSidebarAndHeader(true);
  }, []);
  const focusInput = (index) => {
    setInputIndex(index);
  };
  return (
    <>
      <img src={Pattern} alt="" className="loginPattern" />
      <section className="loginSection">
        <div className="loginBox">
          <div className="logo text-center">
            <img src={Logo} width="60px" alt="" />
            <h5 className="font-weight-bold">Login to Hotash</h5>
          </div>

          <div className="wrapper mt-3 card border">
            <form action="">
              <div
                className={`form-group mb-3 position-relative ${
                  inputIndex === 0 && "focus"
                }`}
              >
                <span className="icon">
                  <MdEmail></MdEmail>
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="enter your email"
                  onFocus={() => focusInput(0)}
                  onBlur={() => setInputIndex(null)}
                />
              </div>
              <div
                className={`form-group mb-3 position-relative ${
                  inputIndex === 1 && "focus"
                }`}
              >
                <span className="icon">
                  <RiLockPasswordFill></RiLockPasswordFill>
                </span>
                <input
                  type={`${isShowPassword === true ? "text" : "password"}`}
                  className="form-control"
                  placeholder="enter your Password"
                  onFocus={() => focusInput(1)}
                  onBlur={() => setInputIndex(null)}
                />
                <span
                  className="toggleShowPassword"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword === true ? <IoMdEyeOff /> : <IoMdEye />}
                </span>
              </div>
              <div className="form-group">
                <Button className="btn-blue btn-lg w-100 btn-big">
                  Sign In
                </Button>
              </div>
              <div className="form-group text-center mb-0">
                <Link className="link" to={"/forgot-password"}>
                  FORGOT PASSWORD
                </Link>
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
          </div>
          <div className="wrapper mt-3 card border p-3">
            <span className="text-center">
              Don not have an account
              <Link to={"/signUp"} className="link color ml-2">
                Register
              </Link>
            </span> 
          </div>
        </div>
      </section>
    </>
  );
};
export default Login;
