import react from "react";
import Navbar from "./components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import Categories from "./Pages/CategoriesPage/CatergoriesPage";
import SingleProductPage from "./Pages/SingleProduct/singleProduct";
import Login from "./Pages/Login/Login";
import Announcement from "./components/announcementOffer/Announcement";
import Register from "./Pages/Register/Register";
import CheckOut from "./Pages/CheckOutPage/CheckOut";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
  Link,
  useRouteMatch,
  useParams,
} from "react-router-dom";
import Payment from "./Pages/Payment/payment";
import Success from "./Pages/Payment/success";
import { useSelector } from "react-redux";

function App() {

  const {userInfo,isLoggedIn}=useSelector(state=>state.user);
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/login" element={isLoggedIn?<Home />:<Login/>} />

          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<SingleProductPage />} />

          <Route path="/checkout" element={isLoggedIn?<CheckOut />:<Login />} />
          <Route path="/payment" element={isLoggedIn?<Payment />:<Login />} />
          <Route path="/paymentsuccess" element={<Success />} />

        </Routes>
      </>
    </Router>
  );
}

export default App;
