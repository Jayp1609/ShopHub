import React from "react";
import { CartState } from "../context/ContextCart";
import Productcard from "./Productcard";

const Home = () => {
  const {
    state: { products },
    productState: { sort, searchQuery },
  } = CartState();

  const updatedProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort((lower, higher) =>
        sort === "LowToHigh"
          ? lower.price - higher.price
          : higher.price - lower.price
      );
    }
    if (searchQuery) {
      sortedProducts = sortedProducts.filter((item) =>
        item.category.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };
  return (
    <div style={{ backgroundColor: "#ffffff" }}>
      <div>
        {updatedProducts().map((products) => {
          return (
            <div key={products.id}>
              <Productcard item={products} key={products.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
