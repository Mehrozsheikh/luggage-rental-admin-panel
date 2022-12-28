import React, { useState, useEffect } from "react";
import "../styles/global_styles.css";
import Axios from "axios";
import Navbar from "./Navbar";
import { base_url } from "../constants/constants";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import { MdDelete } from "react-icons/md";
import "../styles/table_styles.css";
export default function Suggestion(props) {
  const [suggestionList, setsuggestionList] = useState([]);

  const getsuggestionList = () => {
    Axios.get(base_url + "/api/suggestions/get").then((response) => {
      setsuggestionList(response.data);
      console.log("Data: " + response.data);
      console.log(response);
    });
  };

  useEffect(() => {
    // console.log("Name " + props.name);
    getsuggestionList();
    // getUserId();
    console.log(suggestionList);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Navbar name={props.name} />
      <div className="page-body">
        <hr />
        <h3>Suggestions</h3>
        <hr />
        <section className="customer-view">
          <table className="product-table">
            <thead>
              <tr style={{ textAlign: "start" }}>
                <th style={{ width: "20%", borderRight: "1px solid #AAAAAA" }}>
                  Subject
                </th>
                <th style={{ width: "80%" }}>Message</th>
              </tr>
            </thead>
            <tbody>
              {suggestionList.map((customer) => (
                <tr>
                  <td
                    style={{
                      textAlign: "start",
                      borderRight: "1px solid #AAAAAA",
                    }}
                  >
                    {customer.subject}
                  </td>
                  <td style={{ textAlign: "start" }}>{customer.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </>
  );
}
