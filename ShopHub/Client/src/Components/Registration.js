import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/Registration.css";
import { CartState } from "../context/ContextCart";

const Registration = () => {
  const { setAuth, showalert, host } = CartState({});
  const [credentials, setCredentials] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    cpassword: "",
    contact: "",
    address: "",
    postcode: "",
    state: "",
    country: "",
  });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    showalert("Creating your account", "success");

    const {
      name,
      lastname,
      email,
      password,
      contact,
      address,
      postcode,
      state,
      country,
    } = credentials;

    const response = await fetch(`${host}/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        lastname,
        email,
        password,
        contact,
        address,
        postcode,
        state,
        country,
      }),
    });
    const json = await response.json();

    //save the auth token and redirect
    if (json.success === true) {
      localStorage.setItem("token", json.authtoken);
      setAuth(localStorage.getItem("token"));
      navigate("/home");
      showalert("Account successfully created!!", "success");
    } else {
      showalert("Email address already in use", "danger");
    }
  };

  const onChangetext = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div style={{ paddingBottom: "100px" }}>
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-12 border-right" style={{ padding: "30px" }}>
            <div className="p-3 py-5">
              <div className="mb-3" style={{ paddingBottom: "30px" }}>
                <h1>
                  <b>SignUp</b>
                </h1>
              </div>

              {/* Form for SignUp */}
              <form onSubmit={handleSubmit}>
                <div className="row mt-2">
                  <div className="col-md-6">
                    <label className="labels" htmlFor="name">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={credentials.name}
                      onChange={(e) => {
                        onChangetext(e);
                      }}
                      minLength={3}
                      required
                    />
                    <p>(*min 3 characters)</p>
                  </div>
                  <div className="col-md-6">
                    <label className="labels" htmlFor="lastname">
                      Surname
                    </label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      className="form-control"
                      value={credentials.lastname}
                      onChange={(e) => {
                        onChangetext(e);
                      }}
                      minLength={3}
                      required
                    />
                    <p>(*min 3 characters)</p>
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-12">
                    <label className="labels" htmlFor="contact">
                      Mobile Number
                    </label>
                    <input
                      type="number"
                      id="contact"
                      name="contact"
                      className="form-control"
                      value={credentials.contact}
                      onChange={(e) => {
                        onChangetext(e);
                      }}
                      minLength={10}
                      required
                    />
                  </div>
                  <div className="col-md-12">
                    <label className="labels" htmlFor="email">
                      Email ID
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={credentials.email}
                      onChange={(e) => {
                        onChangetext(e);
                      }}
                      required
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="labels" htmlFor="password">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-control"
                      value={credentials.password}
                      onChange={(e) => {
                        onChangetext(e);
                      }}
                      minLength={8}
                      required
                    />
                    <p>(*min 8 characters)</p>
                  </div>

                  <div className="col-md-6">
                    <label className="labels" htmlFor="cpassword">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="cpassword"
                      name="cpassword"
                      className="form-control"
                      value={credentials.cpassword}
                      onChange={(e) => {
                        onChangetext(e);
                      }}
                      minLength={credentials.password.length}
                      required
                    />
                  </div>

                  <div className="col-md-6" htmlFor="address">
                    <label className="labels">Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      className="form-control"
                      value={credentials.address}
                      onChange={(e) => {
                        onChangetext(e);
                      }}
                      required
                    />
                  </div>

                  <div className="col-md-6" htmlFor="postcode">
                    <label className="labels">Postcode</label>
                    <input
                      type="number"
                      id="postcode"
                      name="postcode"
                      className="form-control"
                      value={credentials.postcode}
                      onChange={(e) => {
                        onChangetext(e);
                      }}
                      minLength={6}
                      required
                    />
                  </div>
                </div>
                <div className="row mt-3">
                  <div className="col-md-6">
                    <label className="labels" htmlFor="state">
                      State/Region
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="form-control"
                      value={credentials.state}
                      onChange={(e) => {
                        onChangetext(e);
                      }}
                      required
                    />
                  </div>
                  <div className="col-md-6" htmlFor="country">
                    <label className="labels">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      className="form-control"
                      value={credentials.country}
                      onChange={(e) => {
                        onChangetext(e);
                      }}
                      required
                    />
                  </div>
                </div>
                <div className="text">
                  <h3>
                    Already have an account? <Link to="/">Login now</Link>
                  </h3>
                </div>
                <div className="d-flex justify-content-center signup-but">
                  <button
                    className="btn btn-dark btn-lg "
                    type="submit"
                    disabled={
                      credentials.password !== credentials.cpassword ||
                      credentials.name.length < 3 ||
                      credentials.lastname.length < 3
                    }
                  >
                    Register
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
