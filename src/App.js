import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import { ProSidebarProvider } from "react-pro-sidebar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AdminLogin from "./components/AdminLogin";
import AdsDetails from "./components/AdsDetails";
import ForgetPassword from "./components/ForgetPassword";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<AdminLogin />}></Route>

          <Route
            path="/home"
            element={
              <ProSidebarProvider>
                <Home />
              </ProSidebarProvider>
            }
          ></Route>
          <Route path="/adsdetails" element={<AdsDetails />}></Route>
          <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
