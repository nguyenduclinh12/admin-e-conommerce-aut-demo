import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { createContext, useEffect, useState } from "react";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProductDetails from "./pages/Product/ProductDetails";
import ProductUpload from "./pages/Product/ProductAdd";
import CategoryAdd from "./pages/Category/CategoryAdd";
import Category from "./pages/Category";
// alert
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
// end alert
//loading bar
import LoadingBar from "react-top-loading-bar";
import Product from "./pages/Product";
import CategoryEdit from "./pages/Category/CategoryEdit";
import ProductEdit from "./pages/Product/ProductEdit";
import { fetchDataFromApi } from "./utils/api";
// end loading bar

const MyContext = createContext();
function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isHideSidebarAndHeader, setIsHideSidebarAndHeader] = useState(false);
  const [themeMode, setThemeMode] = useState(true);
  const [catData, setCatData] = useState([]);
  // alert
  const [alertBox, setAlertBox] = useState({
    msg: "",
    error: false,
    open: false,
  });

  // end alert
  // loading Bar
  const [progress, setProgress] = useState(0);
  // end loading bar

  useEffect(() => {
    fetchCategory();
  }, []);

  useEffect(() => {
    if (themeMode === true) {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
      localStorage.setItem("themeMode", "light");
    } else {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
      localStorage.setItem("themeMode", "dark");
    }
  }, [themeMode]);

  // get category list
  const fetchCategory = () => {
    fetchDataFromApi("/api/category").then((res) => {
      setCatData(res);
    });
  };
  // alert
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertBox({
      open: false,
    });
  };
  // end alert

  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
    isLogin,
    setIsLogin,
    isHideSidebarAndHeader,
    setIsHideSidebarAndHeader,
    themeMode,
    setThemeMode,
    // alert
    alertBox,
    setAlertBox,
    // end alert
    // progress bar
    progress,
    setProgress,
    // end prgress bar
    catData,
    setCatData,
  };
  useEffect(() => {}, [isToggleSidebar]);
  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <LoadingBar
          color="#f11946"
          progress={progress}
          onLoaderFinished={() => setProgress(0)}
          className="topLoadingBar"
        />
        {/* alert */}
        <Snackbar
          open={alertBox.open}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={alertBox.error === true ? "error" : "success"}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {alertBox.msg}
          </Alert>
        </Snackbar>
        {/* end alert */}
        {isHideSidebarAndHeader !== true && <Header />}

        <div className="main d-flex">
          {isHideSidebarAndHeader !== true && (
            <div
              className={`sidebarWrapper ${
                isToggleSidebar === true ? "toggle" : ""
              }`}
            >
              <Sidebar />
            </div>
          )}
          <div
            className={`content ${isHideSidebarAndHeader === true && "full"} ${
              isToggleSidebar === true ? "toggle" : ""
            }`}
          >
            <Routes>
              <Route
                path="/"
                exact={true}
                index
                element={<Dashboard />}
              ></Route>
              <Route path="/login" exact={true} element={<Login />}></Route>
              <Route path="/signUp" exact={true} element={<SignUp />}></Route>
              <Route path="/product" exact={true} element={<Product />}></Route>
              <Route
                path="/product/details"
                exact={true}
                element={<ProductDetails />}
              ></Route>
              <Route
                path="/product/upload"
                exact={true}
                element={<ProductUpload />}
              ></Route>
              <Route
                path="/product/edit/:id"
                exact={true}
                element={<ProductEdit />}
              ></Route>
              <Route
                path="/category"
                exact={true}
                element={<Category />}
              ></Route>
              <Route
                path="/category/add"
                exact={true}
                element={<CategoryAdd />}
              ></Route>
              <Route
                path="/category/edit/:id"
                exact={true}
                element={<CategoryEdit />}
              ></Route>
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
