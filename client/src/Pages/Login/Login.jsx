import { CircularProgress } from "@material-ui/core";
import React from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setCart } from "../../redux/cartRedux";
import login from "../../redux/apicalls";
import API from "../../API/api";
import axios from "axios";
import "./login.css";
import getCart from "../../redux/cartcalls";
function Login() {
  const dispatch = useDispatch();
  const { userInfo, error, isFetching, isLoggedIn } = useSelector(
    (state) => state.user
  );
  const username = useRef();
  // const history=useHistory()
  const password = useRef();
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const userDetails = {
      username: username.current.value,
      password: password.current.value,
    };
    try {
      login(userDetails, dispatch);
      navigate("/");
    } catch (err) {
      navigate("/login");
    }
  };

  return (
    <div className="loginWrapper">
      <div className="loginMain">
        <h1>WOMZONE</h1>
        <form onSubmit={handleLogin}>
          <input placeholder="Username" type="text" ref={username} />
          <input placeholder="Password" type="password" ref={password} />
          <button className="buttonLoginAndRegister" type="submit">
            {isFetching ? (
              <CircularProgress color="white" size="10px" />
            ) : (
              "Login"
            )}
          </button>
        </form>

        <Link
          to="/register"
          style={{ textDecoration: "none", color: "black", width: "100%" }}
        >
          <div className="signUp">Sign Up</div>
        </Link>
      </div>
    </div>
  );
}

export default Login;
