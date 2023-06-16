import React, { useState } from "react";
import { Link } from "react-router-dom";
import img from "../shophub.png";
import { useNavigate } from "react-router-dom";
import "./Start.css";
import { CartState } from "../context/ContextCart";

const Start = () => {
  const { setAuth, showalert, host } = CartState();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let navigate = useNavigate();

  const HandleonChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const SubmitLogin = async (e) => {
    e.preventDefault(); //used to prevent the reloading of page
    // showalert("Verifying your account", "success");

    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();

    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      setAuth(localStorage.getItem("token"));
      navigate("/home");
      showalert("Successfully Logged in !!", "success");
    } else {
      showalert("Invalid Email or Password", "danger");
    }
  };
  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        width: "100%",
        height: "100%",
        marginTop: "-35px",
        paddingBottom: "30px",
        paddingTop: "30px",
        fontFamily: "Verdana",
      }}
    >
      <div className="box-form">
        <div className="left">
          <div className="overlay">
            <h1>
              <img
                src={img}
                alt="#"
                style={{
                  height: "300px",
                  paddingBottom: "30px",
                }}
              />
            </h1>
            <p>
              Your one-stop destination for a seamless shopping experience,
              where your cart becomes a gateway to delight and convenience.
            </p>
            <span>
              <p>Don't have an account?</p>
            </span>
            <div style={{ paddingTop: "10px" }}>
              <Link to="/signup" style={{ textDecoration: "none" }}>
                <button className="btn btn-outline-light btn-ld">
                  SIGN UP
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="right">
          <h5>Login</h5>
          <p>
            Don't have an account? <Link to="/signup">Creat Your Account</Link>{" "}
            it takes less than a minute
          </p>
          <form onSubmit={SubmitLogin}>
            <div className="inputs">
              <input
                type="text"
                placeholder="email"
                id="email"
                name="email"
                value={credentials.email}
                onChange={(e) => {
                  HandleonChange(e);
                }}
                required
              />
              <br />
              <input
                type="password"
                placeholder="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={(e) => {
                  HandleonChange(e);
                }}
                required
              />
            </div>

            <br />
            <br />
            <p>
              <Link to="/forgotpass">Forgot Password?</Link>
            </p>

            <br />
            <button
              onClick={() => {
                showalert("Verifying your email and password", "warning");
              }}
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Start;
