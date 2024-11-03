import React, { useState } from "react";
import "./navbar.css";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import SearchIcon from "@material-ui/icons/Search";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Dropdown } from "react-bootstrap";
import "../../Pages/CategoriesPage/categoriesPage.css";
import { Link } from "react-router-dom";
import {useSelector} from "react-redux"


function Navbar() {
  const [size, setsize] = useState("");
  const {cartInfo}=useSelector(state=>state.cart)
  const {isLoggedIn}=useSelector(state=>state.user)
  const [anchorEl, setAnchorEl] = React.useState(null);

  // console.log(cartInfo?.products.length)
  const handleSize = (e) => {
    setsize(e.target.innerText);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className="navbarWrapper">
      <div className="navbarCenter">
        <Link to="/" style={{textDecoration:"none",color:"#fff"}}>
          <h2>WOMZONE</h2>
        </Link>
      </div>
      <div className="navbarLeft">
        <div className="searchArea">
          <input />
          <SearchIcon className="searchIcon" />
        </div>
      </div>

      <div className="navbarRight">
        <Link to="/register" style={{ textDecoration: "none" }}>
          <div className="navRightComp">Register</div>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <div className="navRightComp">Sign In</div>
        </Link>
        <Link to="/checkout" style={{ textDecoration: "none" }}>
          <div className="navRightComp CartComponent">
           <div className="badge">{cartInfo && cartInfo?.products?.length}</div>
            <ShoppingCartIcon className="cartIcon" />
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
