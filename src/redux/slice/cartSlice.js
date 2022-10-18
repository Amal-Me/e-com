import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItem")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    ADD_TO_CART(state, action) {
      const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);

      if(productIndex >= 0) {
        // item already exist in the cart
        // increse the cart quantity
        state.cartItems[productIndex].cartQuantity += 1;
        toast.success(`${action.payload.name}  added to cart`, {position: "top-left"})

        
      }else {
        // item doesn't exist in the cart
        // add item to the cart
        const tempProduct = {...action.payload, cartQuantity: 1}
        state.cartItems.push(tempProduct)
        toast.success(`${action.payload.name}  added to cart`, {position: "top-left"})
      };
      // save cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems))
    },
  },
});

export const {ADD_TO_CART} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;


export default cartSlice.reducer;