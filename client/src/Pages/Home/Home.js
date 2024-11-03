import React, { useEffect, useState } from "react";
import Announcement from "../../components/announcementOffer/Announcement";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import NewsLetter from "../../components/newsLetter/NewsLetter";
import Categories from "../../components/productCategories/Categories";
import ShoppingItems from "../../components/ShoppingItems/ShoppingItems";
import MainSlider from "../../components/Slider/Slider";
import { setCart } from "../../redux/cartRedux";
import API from "../../API/api";
import axios from "axios";
import "./home.css";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {
  const [AllProducts, setAllProducts] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const { cartInfo } = useSelector((state) => state.cart);

  // console.log(cartInfo);
  // console.log("bearer "+userInfo?.accessToken);
  const dispatch=useDispatch()

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await axios.get(API + "products/allproducts", {
        headers: {
          token:
            "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzI3MjY0MjhkYjFkM2Y5MmUyOThjYzAiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MzA2MjAxNDgsImV4cCI6MTc2MjE1NjE0OH0.RerL4N66UeRmYgbqitPhBmPaUpnd3RvOB5gRryL2ksA",
        },
      });
      response.data && setAllProducts(response.data);
    };

    
    getAllProducts();
  }, []);

  // console.log(AllProducts);

  // console.log(API);
  return (
    <>
      <Announcement />
      <div className="homePage">
        <Navbar />
        <MainSlider />
        <Categories />
        <ShoppingItems AllProducts={AllProducts} />
        <NewsLetter />
        <Footer />
      </div>
    </>
  );
}
