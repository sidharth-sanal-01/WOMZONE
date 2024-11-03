import API from "../API/api";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setCart } from "./cartRedux";

const getCart = async (id,dispatch,accessToken) => {
  try {
    const response = await axios.get(API + "cart/find/" + id, {
      headers: {
        token: "bearer " + accessToken,
      },
    });
    // console.log(response.data);
    dispatch(setCart(response.data));
    
  } catch (err) {
    console.log(err);
  }

  // history.push("/")
};

export default getCart;
