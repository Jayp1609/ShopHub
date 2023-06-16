import React, { useState } from "react";
import "./CSS/ForgotPass.css";
import { CartState } from "../context/ContextCart";

const ForgotPass = () => {
  const { updatepassword, showalert } = CartState();

  const [newdetails, setNewdetails] = useState({
    email: "",
    newpass: "",
    cnewpass: "",
  });

  const onChangeText = (e) => {
    setNewdetails({ ...newdetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updatepassword(newdetails.email, newdetails.newpass);
    showalert("Please wait for some moment", "warning");
  };

  return (
    <div style={{ paddingBottom: "60px" }}>
      <div className="Main-body">
        <ul>
          <li>
            <h3>
              <i className="fa fa-lock fa-4x"></i>
            </h3>
          </li>
          <li>
            <b>Forgot Password?</b>
          </li>
          <li>You can reset your password here</li>
          <li>
            <form
              onSubmit={(e) => {
                handleSubmit(e);
              }}
            >
              <br />
              <br />
              <input
                type="text"
                name="email"
                value={newdetails.email}
                placeholder="email address"
                id="email"
                onChange={(e) => {
                  onChangeText(e);
                }}
                required
              />
              <br />
              <br />
              <input
                type="password"
                name="newpass"
                value={newdetails.newpass}
                placeholder="enter new password"
                id="newpass"
                onChange={(e) => {
                  onChangeText(e);
                }}
                minLength={8}
                required
              />
              <p style={{ color: "red" }}>(*min 8 characters)</p>

              <input
                type="password"
                name="cnewpass"
                value={newdetails.cnewpass}
                placeholder="confirm password"
                id="cnewpass"
                onChange={(e) => {
                  onChangeText(e);
                }}
                minLength={8}
                required
              />
              <br />
              <br />
              <button
                type="submit"
                className="btn btn-dark btn-lg"
                disabled={newdetails.newpass !== newdetails.cnewpass}
              >
                Reset Password
              </button>
            </form>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ForgotPass;
