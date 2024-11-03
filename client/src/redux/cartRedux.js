import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartInfo: JSON.parse(localStorage.getItem("cart")) || null,
    cartpending: false,
    error: false,
  },
  reducers: {
    setCart: (state, action) => {
      state.cartInfo = action.payload;
    },
    addtoCart: (state, action) => {
      // console.log(state.cartInfo.products.length)
      if(state.cartInfo.products.length===0){
        state.cartInfo.products.push({
          productId: action.payload.productId,
          quantity: action.payload.quantity,
        });
      }else{
        let flag = false;

        for (let step = 0; step < state.cartInfo.products.length; step++) {
          if (
            state.cartInfo.products[step].productId ===
            action.payload.productId
            ) {
              flag = true;
              break;
            } else {
              flag=false
            }
          }
          
          if (!flag) {
            state.cartInfo.products.push({
              productId: action.payload.productId,
              quantity: action.payload.quantity,
            });
          }
        }
    },
    removeFromCart: (state, action) => {},
  },
});

export const { setCart, addtoCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
