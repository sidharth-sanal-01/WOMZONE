import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Announcement from "../../components/announcementOffer/Announcement";
import Footer from "../../components/Footer/Footer";
import NewsLetter from "../../components/newsLetter/NewsLetter";
import { Add, Remove, SingleBedRounded } from "@material-ui/icons";

import "./checkout.css";
import { useSelector } from "react-redux";
import axios from "axios";
import API from "../../API/api";

function OrderSummary() {
  return (
    <div className="OrderSummaryWrapper">
      <div className="orderyHeading">
        <h1>ORDER SUMMARY</h1>
      </div>
      <div className="eachOrderDetail">
        <h3>SUBTOTAL</h3>
        <h2>$ 80</h2>
      </div>
      <div className="eachOrderDetail">
        <h3>ESTIMATED SHIPPING COST:</h3>
        <h2>$ 20</h2>
      </div>
      <div className="eachOrderDetail">
        <h3>SHIPPING DISCOUNT</h3>
        <h2>$ - 20</h2>
      </div>
      <div className="eachOrderDetail total">
        <h3>TOTAL</h3>
        <h2>$ 80 $</h2>
      </div>
      <div className="checkoutbtn">
        <button>CHECKOUT</button>
      </div>
    </div>
  );
}

function CheckOut() {
  const [value, setvalue] = useState(1);
  const { cartInfo } = useSelector((state) => state.cart);
  // console.log(cartInfo[0])
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    const getProduct = async (id) => {
      const response = await axios.get(`${API}products/find/${id}`, {
        headers: {
          token:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI3MjY0MjhkYjFkM2Y5MmUyOThjYzAiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MzA2MjAxNDgsImV4cCI6MTc2MjE1NjE0OH0.RerL4N66UeRmYgbqitPhBmPaUpnd3RvOB5gRryL2ksA",
        },
      });
      setCartItems((prev) => [...prev, response.data]);
    };

    //  console.log(cartInfo[0].products)
    cartInfo?.products?.map((eachProduct) => {
      getProduct(eachProduct.productId);
      // console.log(eachProduct.productId)
    });
  };

  useEffect(() => {
    getCartItems();
    console.log(cartItems)
  }, [cartInfo]);

  console.log(cartInfo);
  const EachCartProduct = ({ eachItem, index }) => {
    return (
      <div className="cartProductWrapper">
        <div className="cartImage">
          <img src={eachItem?.image} />
        </div>
        <div className="productDetailsWrapper">
          <div className="productDetails">
            <div className="productDetailsLeft">
              <div>
                <b>Product: </b>
                <span>{eachItem?.productName}</span>
              </div>
              <div>
                <b>ID: </b>
                <span>{eachItem?._id}</span>
              </div>
              <div className="productcolor"></div>
              <div>
                <b>SIZE: </b> <span>{eachItem?.size}</span>
              </div>
            </div>

            <div className="prductDetailsRight">
              <div className="productQuantityChanger">
                <Remove
                  className="iconCartPage"
                  onClick={() => {
                    setvalue((prev) => {
                      if (prev != 1) {
                        return prev - 1;
                      }
                      return 1;
                    });
                  }}
                />
                <div className="quantity">
                  {cartInfo && cartInfo?.products[index]?.quantity}
                </div>
                <Add
                  className="iconCartPage"
                  onClick={() => {
                    setvalue((prev) => {
                      return prev + 1;
                    });
                  }}
                />
              </div>
              <div className="priceCartPage">
               <h1>{eachItem?.price +"   " + "$"}</h1> 
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Announcement />
      <Navbar />
      <div className="yourCartWrapper">
        <div className="yourCartTop">
          <h1>YOUR CART</h1>
        </div>
        <div className="checkoutTop">
          <div className="continue">
            <button>CONTINUE SHOPPING</button>
          </div>
          <div className="wishlist">
            <button>YOUR WISHLIST</button>
          </div>
          <div className="checkoutbutton">
            <button>CHECKOUT</button>
          </div>
        </div>
        <div>
          <div className="yourCartBody">
            <div className="bodyLeft">
              {cartItems?.map((eachItem, index) => {
                return <EachCartProduct eachItem={eachItem} index={index} />;
              })}
            </div>
            <hr />
            <div className="bodyRight">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
      {/* <NewsLetter /> */}
      <Footer />
    </>
  );
}

export default CheckOut;
