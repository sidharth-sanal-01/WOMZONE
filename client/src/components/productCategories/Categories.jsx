import React from "react";
import { categories } from "../../dummyData/dummyCategories";
import "./categories.css";
import { Link, useNavigate } from "react-router-dom";
function Categories() {
  const navigate = useNavigate();
  console.log(process.env)
  return (
    <div className="categoriesWrapper">
      {categories.map((category) => {
        return (
          <div className="eachCategory">
            <img src={category.image} alt="" />
            <div className="categoryInfo">
              <h3>{category.name}</h3>
              <Link to="/categories">
                <button>SHOP NOW</button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Categories;
