import React, { useState, useEffect } from "react";
import "../styles/global_styles.css";
import Axios from "axios";
import Navbar from "./Navbar";
import { base_url } from "../constants/constants";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { MdDelete } from "react-icons/md";
import "../styles/table_styles.css";

export default function Vendors(props) {
  const [vendorList, setvendorList] = useState([]);

  const deleteVendor = (ven_id) => {
    Axios.post(base_url + "/api/vendors/delete", {
      id: ven_id,
    }).then((response) => {
      setvendorList(
        vendorList.filter((val) => {
          return val.id !== ven_id;
        })
      );
    });
  };

  const getvendorList = () => {
    Axios.get(base_url + "/api/vendors/get").then((response) => {
      setvendorList(response.data);
      console.log("Data: " + response.data);
      console.log(response);
    });
  };

  useEffect(() => {
    // console.log("Name " + props.name);
    getvendorList();
    // getUserId();
    console.log(vendorList);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar name={props.name} />
      <div className="page-body">
        <hr />
        <h3>Vendor Details</h3>
        <hr />
        <section className="vendor-view">
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vendorList.map((vendor) => (
                <tr>
                  <td>{vendor.name}</td>
                  <td>{vendor.email}</td>
                  <td>{vendor.phone}</td>
                  <td>
                    {vendor.gender.charAt(0).toUpperCase() +
                      vendor.gender.slice(1)}
                  </td>
                  <td>{vendor.address}</td>
                  <td>
                    <button
                      className="del-btn"
                      onClick={() => {
                        confirmAlert({
                          title: "Delete Vendor",
                          message:
                            "Are you sure you want to delete this vendor?",
                          buttons: [
                            {
                              label: "Delete",
                              onClick: () => deleteVendor(vendor.id),
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
