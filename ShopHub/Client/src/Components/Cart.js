import React, { useEffect, useState } from "react";
import { CartState } from "../context/ContextCart";
import "./CSS/Cart.css";

const Cart = () => {
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
      <h1 style={{ textAlign: "center", paddingBottom: "30px" }}>Your Cart</h1>
      <div className="cart-main">
        <div className="left">
          <div className="overlay2">
            {cart.map((item) => {
              return (
                <div className="item" key={item.id}>
                  <div className="item-image">
                    <img src={item.image} alt="#" />
                  </div>
                  <div className="item-details">
                    <ul>
                      <li>
                        <b>{item.title}</b>
                      </li>
                      <li>${(item.price * item.qty).toFixed(2)}</li>
                    </ul>
                  </div>
                  <div className="item-quantity">
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
                  <div className="remove-btn">
                    <button
                      className="btn btn-danger btn-sm"
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
              );
            })}
          </div>
        </div>
        <div className="right2">
          <div
            className="cart-total"
            style={{ textAlign: "center", paddingTop: "30px" }}
          >
            <h2 style={{ color: "green" }}>Subtotal ({cart.length}) items</h2>

            <div style={{ paddingTop: "20px" }}>
              <strong style={{ fontSize: "25px" }}>
                Total payment: ${total.toFixed(2)}
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
