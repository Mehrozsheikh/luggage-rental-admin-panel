import { React, useState } from "react";
import "../styles/login.css";
import { confirmAlert } from "react-confirm-alert";
import { base_url } from "../constants/constants";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/account_styles.css";
import Navbar from "./Navbar";

export default function Account(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const navigate = useNavigate();

  const updateProfile = (event) => {
    if (username === "" || password === "" || oldPassword === "") {
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
        username: props.name,
        password: oldPassword,
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
          props.name === response.data[0].username &&
          oldPassword === response.data[0].password
        ) {
          Axios.post(base_url + "/api/admin/update", {
            username: username,
            password: password,
            oldPassword: oldPassword,
          }).then((response) => {
            confirmAlert({
              title: "Success",
              message: "Updated successfully, please login again",
              buttons: [
                {
                  label: "OK",
                  onClick: () => {
                    navigate("/");
                  },
                },
              ],
            });
          });
        }
      });
    }
    event.preventDefault();
  };

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
        if (response.data.message === "Invalid credentials") {
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
    <div>
      <Navbar name={props.name} />
      <div className="page-body">
        <div className="ac-container">
          <h2>Update Profile</h2>
          <div className="ac-content">
            <form>
              <div className="ac-user-details">
                <div className="ac-input-box">
                  <input
                    type="name"
                    placeholder="Enter new username"
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="ac-input-box">
                  <input
                    type="password"
                    placeholder="Enter new password (if you want to change)"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="ac-input-box">
                  <input
                    type="password"
                    placeholder="Enter old password to confirm"
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="ac-button">
                <input type="button" value="Update" onClick={updateProfile} />
              </div>
            </form>
          </div>
        </div>
        <br />
        <br />
      </div>
    </div>
  );
}
