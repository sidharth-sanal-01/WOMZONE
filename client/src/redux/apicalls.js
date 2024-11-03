import { loginStart, loginError, loginSucess } from "./userRedux";
import API from "../API/api";
import { useDispatch } from "react-redux";
import axios from "axios";
import getCart from "./cartcalls";


const login = async (userDetails,dispatch) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(API + "auth/login", {
      username: userDetails.username,
      password: userDetails.password,
    });
    if (res.data) {
      dispatch(loginSucess(res.data));
      getCart(res.data._id, dispatch,res.data.accessToken);
    } else {
      dispatch(loginError());
    }
  } catch (err) {
    dispatch(loginError());
  }
};


export default login;