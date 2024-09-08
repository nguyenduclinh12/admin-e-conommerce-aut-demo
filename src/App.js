import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { createContext, useEffect, useState } from "react";

const MyContext = createContext();
function App() {
  const [isToggleSidebar, setIsToggleSidebar] = useState(false);
  const values = {
    isToggleSidebar,
    setIsToggleSidebar,
  };
  useEffect(() => {
    // alert(isToggleSidebar);
  }, [isToggleSidebar]);
  return (
    <BrowserRouter>
      <MyContext.Provider value={values}>
        <Header />

        <div className="main d-flex">
          <div
            className={`sidebarWrapper ${
              isToggleSidebar === true ? "toggle" : ""
            }`}
          >
            <Sidebar />
          </div>
          <div
            className={`content ${isToggleSidebar === true ? "toggle" : ""}`}
          >
            <Routes>
              <Route to="/" exact={true} index element={<Dashboard />}></Route>
            </Routes>
          </div>
        </div>
      </MyContext.Provider>
    </BrowserRouter>
  );
}

export default App;
export { MyContext };
