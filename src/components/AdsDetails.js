import { React, useEffect, useState } from "react";
import "../styles/ads_details.css";
import Logo from "../assets/images/logo.png";
import luggage from "../assets/images/Navbar_Background2.png";
import { useLocation } from "react-router-dom";
import Axios from "axios";
import { base_url } from "../constants/constants";

export default function AdsDetails() {
  const location = useLocation();
  const [vendorDetails, setVendorDetails] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);

  const getVendorDetails = () => {
    Axios.post(base_url + "/api/vendor/get", {
      id: location.state.ven_id,
    }).then((response) => {
      setVendorDetails(response.data);
      console.log(response.data);
    });
  };

  const getCustomerDetails = () => {
    Axios.post(base_url + "/api/customer/get", {
      id: location.state.cus_id,
    }).then((response) => {
      setCustomerDetails(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    console.log("ven: " + location.state.ven_id);
    console.log("cus: " + location.state.cus_id);
    getVendorDetails();
    if (location.state.cus_id !== "null") {
      getCustomerDetails();
    }
  }, []);

  return (
    <div className="d-body">
      <div className="d-navbar">
        <div>
          <img
            className="d-nav_background"
            src={luggage}
            alt="Navbar_Background"
          />
        </div>
        <div className="d-logo_title">
          <img className="d-logo" src={Logo} alt="Logo-Pic" />
          <h2 className="d-web_name">Luggage Rental</h2>
          <h4 className="d-tag_line">acquire a space you require</h4>
        </div>
      </div>
      {vendorDetails.map((ven) => {
        return (
          <div className="d-container">
            <h2>Vendor Details</h2>
            <div className="d-content">
              <div className="d-form">
                <div className="d-user-details">
                  <div className="d-input-box">
                    <span className="d-details">Name</span>
                    <input type="text" value={ven.name} readOnly />
                  </div>
                  <div className="d-input-box">
                    <span className="d-details">Email</span>
                    <input type="text" value={ven.email} readOnly />
                  </div>
                  <div className="d-input-box">
                    <span className="d-details">Phone</span>
                    <input type="text" value={ven.phone} readOnly />
                  </div>
                  <div className="d-input-box">
                    <span className="d-details">Address</span>
                    <input type="text" value={ven.address} readOnly />
                  </div>
                  <div className="d-input-box">
                    <span className="d-details">Gender</span>
                    <input type="text" value={ven.gender} readOnly />
                  </div>
                </div>
                ;
              </div>
            </div>
          </div>
        );
      })}

      {location.state.cus_id !== "null" ? (
        <div className="d-container">
          <h2>Customer Details</h2>
          <div className="d-content">
            <div className="d-form">
              {customerDetails.map((cus) => {
                return (
                  <div className="d-user-details">
                    <div className="d-input-box">
                      <span className="d-details">Name</span>
                      <input type="text" value={cus.name} readOnly />
                    </div>
                    <div className="d-input-box">
                      <span className="d-details">Email</span>
                      <input type="text" value={cus.email} readOnly />
                    </div>
                    <div className="d-input-box">
                      <span className="d-details">Phone</span>
                      <input type="text" value={cus.phone} readOnly />
                    </div>
                    <div className="d-input-box">
                      <span className="d-details">Address</span>
                      <input type="text" value={cus.address} readOnly />
                    </div>
                    <div className="d-input-box">
                      <span className="d-details">Gender</span>
                      <input type="text" value={cus.gender} readOnly />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
