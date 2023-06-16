import { createContext, useState, useReducer, useContext } from "react";
import React from "react";
import { cartReducer, productReducer } from "./Reducers";
import { faker } from "@faker-js/faker";

export const context = createContext();

const ContextCart = ({ children }) => {
  const fetch_products = [...Array(30)].map(() => ({
    id: faker.number.bigInt(),
    title: faker.commerce.productName(),
    category: faker.commerce.department(),
    description: faker.commerce.productDescription(),
    price: faker.commerce.price(),
    image: faker.image.urlPicsumPhotos(),
  }));

  const [state, dispatch] = useReducer(cartReducer, {
    cart: [],
    products: fetch_products,
  });

  const [productState, productDispatch] = useReducer(productReducer, {
    searchQuery: "",
  });

  const [user, setUser] = useState({});
  const [auth, setAuth] = useState();
  const host = "https://shop-hub-server.onrender.com";

  //<<<<<<<<<<>>>>>>>>>>>>
  //fetch user information
  const getuser = async () => {
    try {
      const response = await fetch(`${host}/api/auth/getuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setAuth(localStorage.getItem("token"));
      setUser(json);
    } catch (err) {
      console.log(err);
    }
  };
  //<<<<<<<<>>>>>>>>>>>>
  //Edit user
  const edituser = async (
    name,
    lastname,
    contact,
    address,
    postcode,
    state,
    country,
    id
  ) => {
    const response = await fetch(`${host}/api/auth/updateuser/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name,
        lastname,
        contact,
        address,
        postcode,
        state,
        country,
      }),
    });
    const json = await response.text();
    setUser(json);
    getuser();
  };

  //<<<<<<>>>>>>
  //Delete user

  const deleteUser = async (id) => {
    const response = await fetch(`${host}/api/auth/deleteuser/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.removeItem("token"),
      },
    });
    console.log(response);
    setAuth(localStorage.removeItem("token"));
  };
  //Display alert
  const [alert, setAlert] = useState(null);

  const showalert = (message, type) => {
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 3500);
  };
  //<<<<<<<<>>>>>>>
  //Update password

  const updatepassword = async (email, password) => {
    const response = await fetch(`${host}/api/auth/updatepas`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const res_update = await response.text();

    if (res_update === "Updated") {
      showalert("Password Updated", "success");
    } else {
      showalert("Enter valid email", "danger");
    }
  };

  return (
    <context.Provider
      value={{
        state,
        dispatch,
        productState,
        productDispatch,
        getuser,
        edituser,
        user,
        setUser,
        deleteUser,
        auth,
        setAuth,
        alert,
        showalert,
        updatepassword,
        host,
      }}
    >
      {children}
    </context.Provider>
  );
};

export default ContextCart;

export const CartState = () => {
  return useContext(context);
};
