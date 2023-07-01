import React from "react";
import "./CSS/Productcard.css";
import { CartState } from "../context/ContextCart";
import { Link } from "react-router-dom";

const Productcard = (props) => {
  const { item } = props;

  //destructuring
  const {
    state: { cart },
    dispatch,
    showalert,
  } = CartState();
  console.log(cart);

  // const CapitalizeFirstletter = (string) => {
  //   return string && string.charAt(0).toUpperCase() + string.slice(1);
  // };
  return (
    <div key={item.id} style={{ paddingTop: "60px" }}>
      <div className="main">
        <div>
          <img src={item.image} alt="#" />
        </div>
        <div style={{ width: "50%" }}>
          <ul style={{ listStyle: "none", marginTop: "-4px" }}>
            <li>{item.category}</li>
            <hr />
            <li>
              <b>{item.title}</b>
            </li>
            <li>{item.description}</li>
            <div style={{ paddingTop: "10px" }}>
              <li>
                <b>${item.price}</b>
              </li>
              <li style={{ paddingTop: "5px" }}>
                {
                  // some() helps us check if that particular thing
                  // exist inside of the array or not
                  cart.some((p) => p.id === item.id) ? (
                    <div className="btn-remove-cart">
                      <div>
                        <Link to="/cart" style={{ textDecoration: "none" }}>
                          <button className="btn btn-outline-success btn-sm">
                            Go to cart
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item,
                            });
                            showalert("Item removed from cart!!", "warning");
                          }}
                        >
                          <i className="fa fa-trash-o"></i>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() => {
                        dispatch({
                          type: "ADD_TO_CART",
                          payload: item,
                        });

                        dispatch({
                          type: "SET_ITEMTOTAL",
                          payload: {
                            id: item.id,
                            itemtotal: item.price,
                          },
                        });
                        showalert("Item added to cart!!", "success");
                      }}
                    >
                      <b>Add to cart</b>
                    </button>
                  )
                }
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Productcard;
