import React, { useState } from "react";
import  {
  FavoriteBorderOutlined,
  Search,
  ShoppingBasket,
} from "@material-ui/icons";
import "./shoppingItems.css";
import {Link } from "react-router-dom"

// import { clothImages } from "../../dummyData/dummyClotheImages";


function ShoppingItems({ AllProducts }) {

  
  return (
    <div className="ItemsWrapper">
      {AllProducts.map((product) => {
        return (
          <div key={product._id} className="eachItem">
            <img src={product.image} alt="cloth Image" />
            <div className="shopIcons">
              <div className="eachIcon" disabled>
                <FavoriteBorderOutlined
                  className="icon"
                  style={{ color: "red" }}
                />
              </div>
              <div className="eachIcon" >
                <Link to={`/product/${product._id}`}>
                  <Search className="icon" style={{ color: "yellow" }} />
                </Link>
              </div>
              <div className="eachIcon">
                <ShoppingBasket className="icon" style={{ color: "blue" }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ShoppingItems;
