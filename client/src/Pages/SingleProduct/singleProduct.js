import React, { useEffect, useState } from "react";
import Announcement from "../../components/announcementOffer/Announcement";
import Navbar from "../../components/Navbar/Navbar";
import NewsLetter from "../../components/newsLetter/NewsLetter";
import Footer from "../../components/Footer/Footer";
import { Dropdown } from "react-bootstrap";
import { Add, Remove, SingleBedRounded } from "@material-ui/icons";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import API from "../../API/api";
import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../../redux/cartRedux";
import "./singlep.css";

function SingleProductPage() {
  const [size, setsize] = useState("");
  const [quantity, setquantity] = useState(1);
  const [product, setProduct] = useState({});
  const params = useParams();
  const dispatch = useDispatch();
  const { cartInfo } = useSelector((state) => state.cart);
  const { isLoggedIn } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    const getProduct = async () => {
      const response = await axios.get(`${API}products/find/${params.id}`, {
        headers: {
          token:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI3MjY0MjhkYjFkM2Y5MmUyOThjYzAiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MzA2MjAxNDgsImV4cCI6MTc2MjE1NjE0OH0.RerL4N66UeRmYgbqitPhBmPaUpnd3RvOB5gRryL2ksA",
        },
      });
      response && setProduct(response.data);
      console.log(response.data);
    };
    getProduct();
  }, []);

  const handleSize = (e) => {
    setsize(e.target.innerText);
  };

  const handleAddToCart = () => {
    if (isLoggedIn) {
      const productDetails = {
        productId: params.id,
        quantity: quantity,
      };
      dispatch(addtoCart(productDetails));
      console.log("clicked");
      console.log(cartInfo[0]);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="sProductpageMain">
      <Announcement />
      <Navbar />

      <div className="singleProductsWrapper">
        <div className="spLeft">
          <img src={product?.image} />
        </div>
        <div className="spRight">
          <h2 className="spHeading">{product?.productName}</h2>
          <p>{product?.description}</p>
          <h2 className="price">{"$ " + product.price}</h2>
          <div className="spColorAndSize">
            <div className="colorPallete">
              <span>Color</span>
              <div
                className="clpall1"
                style={{ backgroundColor: product.color }}
              ></div>
              {/* <div className="clpall2"></div>
              <div className="clpall3"></div> */}

              <Dropdown className="menuWrapper">
                <Dropdown.Toggle variant="light" id="dropdown-basic">
                  {size ? size : "Size"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="spMenu" size="sm">
                  <Dropdown.Item
                    href="#/action-1"
                    className="SpMenuitem"
                    onClick={handleSize}
                  >
                    S
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className="SpMenuitem"
                    onClick={handleSize}
                  >
                    M
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    className="SpMenuitem"
                    onClick={handleSize}
                  >
                    L
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className="SpMenuitem"
                    onClick={handleSize}
                  >
                    XL
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <div className="addtoCartSection">
            <Remove
              className="iconProductPage"
              onClick={() => {
                setquantity((prev) => {
                  if (prev != 1) {
                    return prev - 1;
                  }
                  return 1;
                });
              }}
            />
            <div className="quantityProductPage">{quantity}</div>
            <Add
              className="iconProductPage"
              onClick={() => {
                setquantity((prev) => {
                  return prev + 1;
                });
              }}
            />
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
        <div className="addtoCartButtonForMobile">
          <div className="quantitySectionMobile">
            <Remove
              className="iconProductPage"
              onClick={() => {
                setquantity((prev) => {
                  if (prev != 1) {
                    return prev - 1;
                  }
                  return 1;
                });
              }}
            />
            <div className="quantityProductPage">{quantity}</div>
            <Add
              className="iconProductPage"
              onClick={() => {
                setquantity((prev) => {
                  return prev + 1;
                });
              }}
            />
          </div>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>

      {/* <NewsLetter /> */}
      <Footer />
    </div>
  );
}

export default SingleProductPage;
