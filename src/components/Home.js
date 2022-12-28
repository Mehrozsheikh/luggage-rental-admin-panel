import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import Logo from "../assets/images/logo.png";
import "../styles/home_styles.css";
import Customers from "./Customers";
import Vendors from "./Vendors";
import AdsPage from "./AdsPage";
import Account from "./Account";
import { confirmAlert } from "react-confirm-alert";
import Suggestion from "./Suggestions";

export default function Home(props) {
  const navigate = useNavigate();
  const [activeList, setActiveList] = useState([
    true,
    false,
    false,
    false,
    false,
  ]);

  const setActive = (index) => {
    for (let i = 0; i < activeList.length; i++) {
      if (i === index) {
        activeList[i] = true;
        setActiveList([...activeList]);
      } else {
        activeList[i] = false;
        setActiveList([...activeList]);
      }
    }
  };

  const manageRoutes = (index) => {
    switch (index) {
      case 0:
        setActive(0);
        break;
      case 1:
        setActive(1);
        break;
      case 2:
        setActive(2);
        break;
      case 3:
        setActive(3);
        break;
      case 4:
        setActive(4);
        break;
      default:
        setActive(0);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const location = useLocation();
  return (
    <div style={{ display: "flex", height: "100vh", float: "left" }}>
      <Sidebar style={{ textAlign: "start", borderRight: "1px solid grey" }}>
        <Menu>
          {/* <div className="menu-header" style={{ textAlign: "center" }}>
            <img width="140px" src={logo} alt="logo" />
          </div> */}
          <div className="h-logo_title">
            <img className="h-logo" src={Logo} alt="Logo-Pic" />
            <h2 className="h-web_name">Luggage Rental</h2>
          </div>
          <br />
          <hr className="menu-hr" />
          <MenuItem
            onClick={() => {
              manageRoutes(0);
            }}
            active={activeList[0]}
          >
            <i className="fas fa-users"></i> Customers Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              manageRoutes(1);
            }}
            active={activeList[1]}
          >
            <i class="fas fa-user-tag"></i>
            Vendors Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              manageRoutes(2);
            }}
            active={activeList[2]}
          >
            <i class="fab fa-buysellads"></i> Ads Details
          </MenuItem>
          <MenuItem
            onClick={() => {
              manageRoutes(3);
            }}
            active={activeList[3]}
          >
            <i class="fas fa-comments"></i> Suggestions
          </MenuItem>
          <MenuItem
            onClick={() => {
              manageRoutes(4);
            }}
            active={activeList[4]}
          >
            <i class="fas fa-key"></i> Change Password
          </MenuItem>

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
            <MenuItem active={false}>
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </MenuItem>
          </div>
        </Menu>
      </Sidebar>
      {activeList[0] ? (
        <div style={{ float: "right;", display: "block" }}>
          <Customers
            // email={location.state.email}
            // password={location.state.password}
            name={location.state.username}
          />
        </div>
      ) : null}
      {activeList[1] ? (
        <div style={{ float: "right;", display: "block" }}>
          <Vendors name={location.state.username} />
        </div>
      ) : null}

      {activeList[2] ? (
        <div style={{ float: "right;", display: "block" }}>
          <AdsPage name={location.state.username} />
        </div>
      ) : null}
      {activeList[3] ? (
        <div style={{ float: "right;", display: "block" }}>
          <Suggestion name={location.state.username} />
        </div>
      ) : null}

      {activeList[4] ? (
        <div style={{ float: "right;", display: "block" }}>
          <Account name={location.state.username} />
        </div>
      ) : null}
    </div>
  );
}
