import React from "react";
import { Link } from "react-router-dom";
import { CartState } from "../context/ContextCart";
import "./CSS/Productcard.css";
import logo from "../shophub.png";

const NAvbar = () => {
  //destructuring
  const {
    state: { cart },
    dispatch,
    productDispatch,
    productState: { sort },

    showalert,
  } = CartState();

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <img
              src={logo}
              alt="#"
              style={{ width: "20px", marginBottom: "5px" }}
            />
            ShopHub
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>
              {/* User's profile */}
              <li className="nav-item mx-2">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to="/user"
                >
                  User
                </Link>
              </li>

              {/* Drpodown cart */}
              <li className="nav-item dropdown mx-2">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <b>{cart.length}</b>
                  <i className="fa fa-shopping-cart"></i>
                </Link>
                <ul
                  className="dropdown-menu"
                  style={{
                    width: "400px",
                    height: "auto",
                    maxHeight: "450px",
                    overflowX: "hidden",
                    backgroundColor: "rgb(50,50,50)",
                    color: "white",
                  }}
                >
                  <li>
                    {cart.length > 0 ? (
                      <>
                        {cart.map((item) => {
                          return (
                            <div key={item.id}>
                              <div
                                style={{ display: "flex", padding: "10px" }}
                                key={item.id}
                              >
                                <div>
                                  <img
                                    src={item.image}
                                    alt="#"
                                    style={{
                                      height: "100px",
                                      width: "100px",
                                      padding: "10px",
                                    }}
                                  />
                                </div>
                                <div
                                  style={{ marginTop: "10px", width: "60%" }}
                                >
                                  <ul style={{ listStyleType: "none" }}>
                                    <li>
                                      <b>{item.title}</b>
                                    </li>
                                    <li style={{ color: "rgb(0,168,0)" }}>
                                      <b>₹{item.price}</b>
                                    </li>
                                  </ul>
                                </div>
                                <span style={{ marginTop: "10px" }}>
                                  <i
                                    className="material-icons"
                                    style={{
                                      color: "white",
                                      fontSize: "20px",
                                    }}
                                    onClick={() => {
                                      dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: item,
                                      });
                                      showalert(
                                        "Item removed from cart!!",
                                        "warning"
                                      );
                                    }}
                                  >
                                    &#xe872;
                                  </i>
                                </span>
                              </div>
                            </div>
                          );
                        })}
                        <div className="d-flex justify-content-center">
                          <Link to="/cart">
                            <button className="btn btn-light">
                              Go to cart
                            </button>
                          </Link>
                        </div>
                      </>
                    ) : (
                      <b className="dropdown-item" style={{ color: "white" }}>
                        Empty cart !!
                      </b>
                    )}
                  </li>
                </ul>
              </li>
              {/* Drpodown Filter */}
              <li className="nav-item dropdown mx-2">
                <Link
                  className="nav-link dropdown-toggle"
                  to="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Filter
                </Link>
                <ul className="dropdown-menu" style={{ maxWidth: 370 }}>
                  <form>
                    <li>
                      <input
                        type="radio"
                        name="drop"
                        id="ase"
                        className="mx-3"
                        onChange={() => {
                          productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "LowToHigh",
                          });
                        }}
                        checked={sort === "LowToHigh" ? true : false}
                      />
                      <label htmlFor="ase" id="ase">
                        Low to High
                      </label>
                    </li>

                    <li>
                      <input
                        type="radio"
                        name="drop"
                        id="des"
                        className="mx-3"
                        onChange={(e) => {
                          productDispatch({
                            type: "SORT_BY_PRICE",
                            payload: "HighToLow",
                          });
                        }}
                        checked={sort === "HighToLow" ? true : false}
                      />
                      <label htmlFor="des" id="des">
                        High to Low
                      </label>
                    </li>
                  </form>
                </ul>
              </li>
            </ul>
            <form className="d-flex" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => {
                  productDispatch({
                    type: "FILTER_BY_SEARCH",
                    payload: e.target.value,
                  });
                }}
              />
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NAvbar;
