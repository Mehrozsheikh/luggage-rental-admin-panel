import React from "react";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";

export default function Navbar(props) {
  const navigate = useNavigate();
  return (
    <div>
      <nav className="navbar bg-light">
        <div className="container-fluid">
          <div style={{ float: "right" }}></div>
          <div style={{ display: "flex" }}>
            <span className="navbar-brand mb-0 h4">Hi, {props.name}</span>
            <div
              onClick={() => {
                confirmAlert({
                  title: "Logout?",
                  buttons: [
                    {
                      label: "Logout",
                      onClick: () => {
                        navigate("/");
                      },
                    },
                    {
                      label: "Back",
                      onClick: () => {},
                    },
                  ],
                });
              }}
            >
              <i
                className="fa-solid fa-right-from-bracket"
                style={{ fontSize: "34px", color: "black" }}
              ></i>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
