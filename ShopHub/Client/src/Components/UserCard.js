import { useRef, useState, useEffect } from "react";
import React from "react";
import { CartState } from "../context/ContextCart";
import { useNavigate } from "react-router-dom";
import user_image from "../user.png";

const UserCard = () => {
  const { getuser, user, edituser, deleteUser, showalert, setAuth } =
    CartState();
  const refclose = useRef(null);
  const refcloseconf = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    getuser();
    // eslint-disable-next-line
  }, [user]);

  const [eduser, setEduser] = useState({
    ename: "",
    elastname: "",
    econtact: "",
    eaddress: "",
    epostcode: "",
    estate: "",
    ecountry: "",
  });

  //below function will be called when we hit edit button
  const updateuserbox = (currentDetail) => {
    setEduser({
      ename: currentDetail.name,
      elastname: currentDetail.lastname,
      econtact: currentDetail.contact,
      eaddress: currentDetail.address,
      epostcode: currentDetail.postcode,
      estate: currentDetail.state,
      ecountry: currentDetail.country,
    });
  };

  const onChange = (e) => {
    setEduser({ ...eduser, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    edituser(
      eduser.ename,
      eduser.elastname,
      eduser.econtact,
      eduser.eaddress,
      eduser.epostcode,
      eduser.estate,
      eduser.ecountry,
      user._id
    );
    refclose.current.click();
    showalert("User's details Updated !!", "success");
  };
  const handleLogOut = (e) => {
    e.preventDefault();
    showalert("You are logged out!!!!", "primary");
    localStorage.removeItem("token");
    setAuth(localStorage.removeItem("token"));
    navigate("/");
  };

  const [display, setDisplay] = useState("none");

  const clickopen = () => {
    setDisplay("block");
  };
  const clickclose = () => {
    setDisplay("none");
  };

  return (
    <div style={{ fontFamily: "Verdana" }}>
      {/* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>> */}
      {/* .......modal for user-edit.... */}
      {/* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>> */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container rounded bg-white ">
                <div className="row">
                  <div className="col-md-12 border-right">
                    <div className="p-3 py-5">
                      <div className="d-flex justify-content-center mb-3">
                        <h2>
                          <b>Edit Details</b>
                        </h2>
                      </div>
                      <form>
                        <div className="row mt-2">
                          <div className="col-md-6">
                            <label className="labels" htmlFor="ename">
                              Name
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="ename"
                              name="ename"
                              aria-describedby="emailHelp"
                              onChange={(e) => {
                                onChange(e);
                              }}
                              value={eduser.ename}
                              minLength={3}
                              required
                            />
                            <p style={{ color: "red" }}>(*min 3 characters)</p>
                          </div>
                          <div className="col-md-6">
                            <label className="labels" htmlFor="elastname">
                              Surname
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="elastname"
                              id="elastname"
                              onChange={(e) => {
                                onChange(e);
                              }}
                              aria-describedby="emailHelp"
                              value={eduser.elastname}
                              minLength={3}
                              required
                            />
                            <p style={{ color: "red" }}>(*min 3 characters)</p>
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-12">
                            <label className="labels" htmlFor="econtact">
                              Mobile Number
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="econtact"
                              id="econtact"
                              onChange={(e) => {
                                onChange(e);
                              }}
                              value={eduser.econtact}
                              minLength={10}
                              required
                            />
                          </div>
                          <div className="col-md-12">
                            <label className="labels" htmlFor="eaddress">
                              Address
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="eaddress"
                              name="eaddress"
                              onChange={(e) => {
                                onChange(e);
                              }}
                              value={eduser.eaddress}
                              required
                            />
                          </div>

                          <div className="col-md-12">
                            <label className="labels" htmlFor="epostcode">
                              Postcode
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="epostcode"
                              name="epostcode"
                              onChange={(e) => {
                                onChange(e);
                              }}
                              value={eduser.epostcode}
                              minLength={6}
                              required
                            />
                          </div>
                        </div>
                        <div className="row mt-3">
                          <div className="col-md-6">
                            <label className="labels" htmlFor="estate">
                              State/Region
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="estate"
                              name="estate"
                              onChange={(e) => {
                                onChange(e);
                              }}
                              value={eduser.estate}
                              required
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="labels" htmlFor="ecountry">
                              Country
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              id="ecountry"
                              name="ecountry"
                              onChange={(e) => {
                                onChange(e);
                              }}
                              value={eduser.ecountry}
                              required
                            />
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refclose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  eduser.ename.length < 3 || eduser.elastname.length < 3
                }
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>> */}
      {/* modal for deletion confirmation...*/}
      {/* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>> */}

      <div
        className="modal"
        style={{
          display: `${display}`,
          paddingTop: "200px",
          width: "100%",
          backgroundColor: "rgb(0,0,0,0.4)",
        }}
      >
        {/* Modal content */}
        <div className="d-flex justify-content-center">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: "200px",
              width: "90%",
            }}
          >
            <div className="modal-content">
              <span
                className="close"
                onClick={clickclose}
                ref={refcloseconf}
                style={{ fontSize: "1px" }}
              >
                &times;
              </span>
              <h3 style={{ textAlign: "center", paddingTop: "50px" }}>
                Are you sure you want to delete a account?
              </h3>
              <form className="Edit-Hospitaldetails">
                <div className="d-flex justify-content-center">
                  <div style={{ padding: "20px" }}>
                    <button
                      className="btn btn-outline-success btn-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        deleteUser(user._id);
                        showalert("User Deleted !!", "dark");
                        refcloseconf.current.click();
                        navigate("/");
                      }}
                    >
                      <b>Yes</b>
                    </button>
                  </div>
                  <div style={{ padding: "20px" }}>
                    <button
                      className="btn btn-outline-danger btn-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        refcloseconf.current.click();
                      }}
                    >
                      <b>No</b>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>> */}
      {/*... code to display user details... */}
      {/* <<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>> */}

      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div
            className="col-md-5 border-right"
            style={{ backgroundColor: "#7395ae" }}
          >
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="140px"
                src={user_image}
                alt="#"
                style={{
                  backgroundColor: "white",
                  padding: "10px",
                }}
              />
              <h3 className="font-weight-bold my-3">
                <b>
                  {user.name} {user.lastname}
                </b>
              </h3>
              <div className="d-flex">
                <div
                  className="mt-5 text-center mx-3"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                >
                  <button
                    className="btn btn-outline-light"
                    onClick={() => updateuserbox(user)}
                  >
                    <b>Edit</b>
                  </button>
                </div>
                <div className="mt-5 text-center mx-3">
                  <button
                    className="btn btn-outline-dark"
                    onClick={(e) => {
                      handleLogOut(e);
                    }}
                  >
                    <b>Logout</b>
                  </button>
                </div>
                <div className="mt-5 text-center mx-3">
                  <button
                    className="btn btn-outline-danger"
                    onClick={clickopen}
                  >
                    <b>Delete</b>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-7 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-center mb-3">
                <h2>
                  <b>User's Details</b>
                </h2>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels" htmlFor="name">
                    Name
                  </label>
                  <input
                    style={{ background: "white" }}
                    type="text"
                    id="name"
                    className="form-control"
                    placeholder={user.name}
                    disabled
                  />
                </div>
                <div className="col-md-6" htmlFor="lastname">
                  <label className="labels">Surname</label>
                  <input
                    style={{ background: "white" }}
                    type="text"
                    className="form-control"
                    id="lastname"
                    value=""
                    placeholder={user.lastname}
                    disabled
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels" htmlFor="contact">
                    Mobile Number
                  </label>
                  <input
                    style={{ background: "white" }}
                    type="text"
                    className="form-control"
                    placeholder={user.contact}
                    value=""
                    id="contact"
                    disabled
                  />
                </div>
                <div className="col-md-12" htmlFor="address">
                  <label className="labels">Address</label>
                  <input
                    style={{ background: "white" }}
                    type="text"
                    className="form-control"
                    placeholder={user.address}
                    value=""
                    id="address"
                    disabled
                  />
                </div>

                <div className="col-md-12">
                  <label className="labels" htmlFor="postcode">
                    Postcode
                  </label>
                  <input
                    style={{ background: "white" }}
                    type="text"
                    className="form-control"
                    placeholder={user.postcode}
                    value=""
                    id="postcode"
                    disabled
                  />
                </div>
                <div className="col-md-12">
                  <label className="labels" htmlFor="email">
                    Email ID
                  </label>
                  <input
                    style={{ background: "white" }}
                    type="text"
                    className="form-control"
                    placeholder={user.email}
                    value=""
                    id="email"
                    disabled
                  />
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6">
                  <label className="labels" htmlFor="state">
                    State/Region
                  </label>
                  <input
                    style={{ background: "white" }}
                    type="text"
                    className="form-control"
                    value=""
                    placeholder={user.state}
                    id="state"
                    disabled
                  />
                </div>
                <div className="col-md-6" htmlFor="country">
                  <label className="labels">Country</label>
                  <input
                    style={{ background: "white" }}
                    type="text"
                    className="form-control"
                    placeholder={user.country}
                    value=""
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
