import React, { useState, useEffect } from "react";
import "../styles/global_styles.css";
import Axios from "axios";
import Navbar from "./Navbar";
import { base_url } from "../constants/constants";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BsFillEyeFill } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import "../styles/table_styles.css";
import { useNavigate, useLocation } from "react-router-dom";

export default function AdsPage(props) {
  const [adsList, setadsList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  const deleteAds = (ads_id) => {
    Axios.post(base_url + "/api/ads/delete", {
      id: ads_id,
    }).then((response) => {
      setadsList(
        adsList.filter((val) => {
          return val.id !== ads_id;
        })
      );
    });
  };

  const getadsList = () => {
    Axios.get(base_url + "/api/ads/get").then((response) => {
      setadsList(response.data);
      console.log("Data: " + response.data);
      console.log(response);
    });
  };

  useEffect(() => {
    // console.log("Name " + props.name);
    getadsList();
    // getUserId();
    console.log("adsss::::" + adsList);
    // eslint-disable-next-line
  });

  return (
    <>
      <Navbar name={props.name} />
      <div className="page-body">
        <hr />
        <h3>Ads Details</h3>
        <hr />
        <section className="ads-view">
          <table className="product-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>City</th>
                <th>Price</th>
                <th>Area</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {adsList.map((ads) => (
                <tr>
                  <td className="img-cell">
                    <img
                      className="ad_pic"
                      src={
                        "data:image/png;base64," +
                        btoa(
                          String.fromCharCode(...new Uint8Array(ads.image.data))
                        )
                      }
                      alt="Storage-Pic"
                    />
                  </td>
                  <td>{ads.title}</td>
                  <td>{ads.city}</td>
                  <td>Rs. {ads.price}</td>
                  <td>{ads.area} sq ft.</td>
                  {ads.status === "available" ? (
                    <td>
                      <p className="available">Available</p>
                    </td>
                  ) : (
                    <td>
                      <p className="booked">Booked</p>
                    </td>
                  )}
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() =>
                        navigate("/adsdetails", {
                          state: {
                            ven_id: ads.vendor_id,
                            cus_id: ads.customer_id ? ads.customer_id : "null",
                            username: props.name,
                          },
                        })
                      }
                    >
                      {" "}
                      <BsFillEyeFill />{" "}
                    </button>
                    <button
                      className="del-btn"
                      onClick={() => {
                        confirmAlert({
                          title: "Delete Ads",
                          message: "Are you sure you want to delete this ads?",
                          buttons: [
                            {
                              label: "Delete",
                              onClick: () => deleteAds(ads.id),
                            },
                            {
                              label: "Cancel",
                              onClick: () => null,
                            },
                          ],
                        });
                      }}
                    >
                      {" "}
                      <MdDelete />{" "}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
