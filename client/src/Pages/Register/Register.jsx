import { Link, Navigate, useNavigate } from "react-router-dom";
import React from "react";
import "../Login/login.css";
import axios from "axios";
import API from "../../API/api";
import { useRef } from "react";


function Register() {
  const username = useRef();
  const password = useRef();
  const email = useRef();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const userDetails = {
      username: username.current.value,
      password: password.current.value,
      email:email.current.value
    };
    try {
      await axios.post(API + "auth/register", userDetails);
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="loginWrapper">
      <div className="signUpMain">
        <h1>WOMZONE</h1>
        <form onSubmit={handleRegister}>
          <input placeholder="Full name" type="text" ref={username} />
          <input placeholder="Email" type="email" ref={email} />
          <input placeholder="Password" type="password" ref={password} />
          <button
            type="submit"
            className="buttonLoginAndRegister"
            onClick={handleRegister}
          >
            Sign Up
          </button>
        </form>
        <Link
          to="/login"
          style={{ textDecoration: "none", color: "black", width: "100%" }}
        >
          <div className="signUp">Login</div>
        </Link>
      </div>
    </div>
  );
}

export default Register;


