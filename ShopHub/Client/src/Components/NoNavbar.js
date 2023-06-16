import React from "react";
import logo from "../shophub.png";
import { Link } from "react-router-dom";

const NoNavbar = () => {
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary"
        style={{ padding: "10px" }}
      >
        <div style={{ paddingLeft: "10px" }}>
          <Link className="navbar-brand" to="/">
            <img
              src={logo}
              alt="#"
              style={{ width: "20px", marginBottom: "5px" }}
            />
            ShopHub
          </Link>
          <Link
            className="navbar-link"
            to="/signup"
            style={{ textDecoration: "none", color: "gray" }}
          >
            Signup
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NoNavbar;
