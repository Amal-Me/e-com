import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};

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
    DECREASE_CART(state, action) {
      const productIndex = state.cartItems.findIndex((item) => item.id === action.payload.id);
      if ( state.cartItems[productIndex].cartQuantity > 1) {
          state.cartItems[productIndex].cartQuantity -= 1
          toast.success(`${action.payload.name} has been removed from the cart`, {position: "top-left"});
      } else if (state.cartItems[productIndex].cartQuantity === 1) {
        // si 1 seul prod on recrée le panier avec tout sauf ce prod
        const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id)
        state.cartItems = newCartItem;
        toast.success(`${action.payload.name} has been removed from the cart`, {position: "top-left"});
      }
      // update localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    // supprime le prod independemment des quantites
    REMOVE_FROM_CART(state, action) {
      const newCartItem = state.cartItems.filter((item) => item.id !== action.payload.id);
      state.cartItems = newCartItem;
      toast.success(`${action.payload.name} has been removed from the cart`, {position: "top-left"});
      // update localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    CLEAR_CART(state, action)  {
      state.cartItems = [];
      toast.info(`Cart cleared`, {position: "top-left"});
      // update localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },     
  },
});

export const {ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;


export default cartSlice.reducer;