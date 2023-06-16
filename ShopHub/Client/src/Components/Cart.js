import React, { useEffect, useState } from "react";
import { CartState } from "../context/ContextCart";
import "./CSS/Productcard.css";

const Cart = () => {
  //destructuring
  const {
    state: { cart },
    dispatch,
    showalert,
  } = CartState();

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cart.reduce((acc, curr) => acc + Number(curr.itemtotal), 0));
  }, [cart]);
  return (
    <div className="container" style={{ paddingBottom: "60px" }}>
      <div className="container">
        {cart.map((item) => {
          return (
            <div className="d-flex justify-content-center my-3" key={item.id}>
              <div>
                <img
                  src={item.image}
                  alt="#"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
              <div className="cart-display" style={{ width: "60%" }}>
                <ul style={{ listStyleType: "none", width: "100%" }}>
                  <li>
                    <b>{item.title}</b>
                  </li>
                  <li
                    onLoad={() => {
                      dispatch({
                        type: "SET_ITEMTOTAL",
                        payload: {
                          id: item.id,
                          itemtotal: item.price,
                        },
                      });
                    }}
                  >
                    ₹{(item.price * item.qty).toFixed(2)}
                  </li>
                  <li>
                    <div className="d-flex justify-content-between">
                      <div className="d-flex flex-wrap">
                        <div style={{ marginTop: "5px" }}>
                          <b>Quantity : </b>
                        </div>
                        <div>
                          <select
                            className="form-select"
                            aria-label="Default select example"
                            value={item.qty}
                            onChange={(e) => {
                              dispatch({
                                type: "CHANGE_CART_QTY",
                                payload: {
                                  id: item.id,
                                  qty: e.target.value,
                                },
                              });
                              dispatch({
                                type: "UPDATE_TOTAL",
                                payload: {
                                  id: item.id,
                                  itemtotal: item.price * e.target.value,
                                },
                              });
                            }}
                          >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <button
                          className="but-remove"
                          onClick={() => {
                            dispatch({
                              type: "REMOVE_FROM_CART",
                              payload: item,
                            });
                            showalert("Item removed from cart!!", "warning");
                          }}
                        >
                          <b>Remove</b>
                        </button>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          backgroundColor: "rgb(80,80,80)",
          padding: "30px",
          height: "150px",
        }}
      >
        <h2 style={{ color: "white" }}>Subtotal ({cart.length}) items</h2>
        <ul
          style={{ listStyleType: "none", color: "white", marginTop: "30px" }}
        >
          <li>
            <strong style={{ fontSize: "25px" }}>
              Total : ₹{total.toFixed(2)}
            </strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Cart;
