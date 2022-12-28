import { React, useState } from "react";
import "../styles/login.css";
import Logo from "../assets/images/logo.png";
import { confirmAlert } from "react-confirm-alert";
import { Link } from "react-router-dom";
import { base_url } from "../constants/constants";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = (event) => {
    if (username === "" || password === "") {
      confirmAlert({
        title: "Error",
        message: "Please fill all the fields",
        buttons: [
          {
            label: "OK",
          },
        ],
      });
    } else {
      Axios.post(base_url + "/api/auth/login", {
        username: username,
        password: password,
      }).then((response) => {
        if (response.data.message === "Not-Found") {
          confirmAlert({
            title: "Error",
            message: "Invalid credentials",
            buttons: [
              {
                label: "OK",
              },
            ],
          });
        } else if (
          username === response.data[0].username &&
          password === response.data[0].password
        ) {
          confirmAlert({
            title: "Success",
            message: "Logged in successfully",
            buttons: [
              {
                label: "OK",

                onClick: () => {
                  navigate("/home", {
                    state: { username: username, password: password },
                  });
                },
              },
            ],
          });
        }
      });
    }
    event.preventDefault();
  };

  return (
    <div className="l-body">
      <div className="a-navbar">
        <div className="logo_title">
          <img className="logo" src={Logo} alt="Logo-Pic" />
          <h2 className="web_name">Luggage Rental</h2>
          <h4 className="tag_line">acquire a space you require</h4>
        </div>
      </div>
      <div className="l-container">
        <h2>Sign In</h2>
        <div className="content">
          <form>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Username</span>
                <input
                  type="name"
                  placeholder="Enter username"
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="input-box">
                <span className="details">Password</span>
                <input
                  type="password"
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Link to="/forgetpassword">Forget Password?</Link>
            </div>
            <div className="button">
              <input type="button" value="Login" onClick={loginUser} />
            </div>
          </form>
        </div>
      </div>
      <br />
      <br />
    </div>
  );
}
