import React, { useState, useEffect } from "react";
import "../styles/global_styles.css";
import Axios from "axios";
import Navbar from "./Navbar";
import { base_url } from "../constants/constants";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useNavigate } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "../styles/table_styles.css";
export default function Customers(props) {
  const [userId, setUserId] = useState("");
  const [customerList, setcustomerList] = useState([]);

  const deleteCustomer = (cus_id) => {
    Axios.post(base_url + "/api/customer/delete", {
      id: cus_id,
    }).then((response) => {
      setcustomerList(
        customerList.filter((val) => {
          return val.id !== cus_id;
        })
      );
    });
  };

  const getcustomerList = () => {
    Axios.get(base_url + "/api/customers/get").then((response) => {
      setcustomerList(response.data);
      console.log("Data: " + response.data);
      console.log(response);
    });
  };

  useEffect(() => {
    // console.log("Name " + props.name);
    getcustomerList();
    // getUserId();
    console.log(customerList);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar name={props.name} />
      <div className="page-body">
        <hr />
        <h3>Customer Details</h3>
        <hr />
        <section className="customer-view">
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
              {customerList.map((customer) => (
                <tr>
                  {/* <td className="img-cell">
                    <img
                      className="ad_pic"
                      src={
                        "data:image/png;base64," +
                        btoa(
                          String.fromCharCode(...new Uint8Array(customer.image.data))
                        )
                      }
                      alt="Storage-Pic"
                    />
                  </td> */}
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>
                    {customer.gender.charAt(0).toUpperCase() +
                      customer.gender.slice(1)}
                  </td>
                  <td>{customer.address}</td>
                  {/* {customer.status === "available" ? (
                    <td>
                      <p className="available">Available</p>
                    </td>
                  ) : (
                    <td>
                      <p className="booked">Booked</p>
                    </td>
                  )} */}
                  <td>
                    <button
                      className="del-btn"
                      onClick={() => {
                        confirmAlert({
                          title: "Delete User",
                          message: "Are you sure you want to delete this user?",
                          buttons: [
                            {
                              label: "Delete",
                              onClick: () => deleteCustomer(customer.id),
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
