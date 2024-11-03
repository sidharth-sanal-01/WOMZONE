import React, { useState,useEffect } from "react";
import styled from "styled-components";
import Announcement from "../../components/announcementOffer/Announcement";
import Navbar from "../../components/Navbar/Navbar";
import ShoppingItems from "../../components/ShoppingItems/ShoppingItems";
import { Dropdown } from "react-bootstrap";
import NewsLetter from "../../components/newsLetter/NewsLetter";
import Footer from "../../components/Footer/Footer";
import axios from "axios";
import API from "../../API/api";
import "./categoriesPage.css";

const CategoriesWrapper = styled.div`
  height: 100vh;
  font-family: "Nunito", sans-serif;
`;

const Title = styled.div`
  font-size: 35px;
  letter-spacing: 2px;
  width: 100%;
  text-align: center;
  color: black;
  margin-top: 20px;

  font-weight: 800;
`;

const FiltersSection = styled.div`
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const subTitle = styled.div`
  font-size: 25px;
  font-weight: 400;
`;

const DropDowns = styled.div``;

const DropDownButton = styled.button`
  width: 100px;
  height: 30px;
  background-color: transparent;
  border: none;
`;

// function CategoryPageMain() {
//   return (
//     <CategoriesWrapper>
//       <Title>Jackets</Title>
//       <FiltersSection>
//         <>
//           <subTitle>Filters</subTitle>
//           <DropDownButton>XL</DropDownButton>
//         </>
//       </FiltersSection>

//       <ShoppingItems />
//     </CategoriesWrapper>
//   );
// }

function Catergories() {
  const [color, setColor] = useState("");
  const [size, setsize] = useState("");
  const [AllProducts, setAllProducts] = useState([]);
  const [filter,setFilter]=useState("");
  const [sortSelect, setSortSelect] = useState("");

  const handleSize = (e) => {
    setsize(e.target.innerText);
  };

  const handleSort = (e) => {
    setSortSelect(e.target.innerText);
  };

  const handleFilter=(e)=>{
    console.log(e.target.value)
    // console.log(filter)
  }

  const handleColor = (e) => {
    setColor(e.target.innerText);
  };
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
    getAllProducts()
  },[])
  return (
    <>
      <Announcement />
      <Navbar />

      <div className="categoriesPageWrapper">
        <div className="categoriesTop">
          <div className="pageHeading">
            <h3>CLOTHES</h3>
          </div>
          <div className="filterSection">
            <div className="filterLeft">
              <span>Filters</span>
              <Dropdown
                
                className="menuWrapper"
              >
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                  {size ? size : "Size"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="menu" size="sm">
                  <Dropdown.Item
                    href="#/action-1"
                    className="Menuitem"
                    onClick={handleSize}
                    onChange={handleFilter}
                  >
                    S
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className="Menuitem"
                    onClick={handleSize}
                  >
                    M
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    className="Menuitem"
                    onClick={handleSize}
                  >
                    L
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className="Menuitem"
                    onClick={handleSize}
                  >
                    XL
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className="menuWrapper">
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  
                >
                  {color ? color : "Color"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="menu">
                  <Dropdown.Item
                    href="#/action-1"
                    className="Menuitem"
                    onClick={handleColor}
                  >
                    Yellow
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    className="Menuitem"
                    onClick={handleColor}
                  >
                    Blue
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className="Menuitem"
                    onClick={handleColor}
                  >
                    Black
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>

            <div className="filterRight">
              <span>Sort Products</span>
              {/* <Dropdown className="menuWrapper">
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  style={{ border: "none", outline: "none" }}
                >
                  {sortSelect ? sortSelect : "Sort"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="menu">
                  <Dropdown.Item
                    href="#/action-1"
                    className="Menuitem"
                    onClick={handleSort}
                  >
                    Newest
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    className="Menuitem"
                    onClick={handleSort}
                  >
                    Largest
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className="Menuitem"
                    onClick={handleSort}
                  >
                    Cheapest
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown> */}
              <Dropdown className="menuWrapper sort">
                <Dropdown.Toggle
                  variant="dark"
                  id="dropdown-basic"
                  style={{ border: "1px solid #000 !important"}}
                >
                  {sortSelect ? sortSelect : "Sort"}
                </Dropdown.Toggle>

                <Dropdown.Menu className="menu">
                  <Dropdown.Item
                    href="#/action-1"
                    className="Menuitem"
                    onClick={handleSort}
                  >
                    Newest
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-2"
                    className="Menuitem"
                    onClick={handleSort}
                  >
                    Smallest
                  </Dropdown.Item>
                  <Dropdown.Item
                    href="#/action-3"
                    className="Menuitem"
                    onClick={handleSort}
                  >
                    Largest
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <ShoppingItems AllProducts={AllProducts} />
        <NewsLetter />
        <Footer />
      </div>
    </>
  );
}

export default Catergories;
