import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
    previousURL: "",
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
    CALCULATE_SUBTOTAL(state, action)  {
      // ss total panier
      const array = [];
      state.cartItems.map((item) => {
        const {price, cartQuantity} = item
        // total d 1 prod * sa quantite
        const cartItemAmount = price * cartQuantity;
        return  array.push(cartItemAmount);
      });
      // additione ts les elements du tab
      const totalAmount = array.reduce((a, b) => {
        return a + b
        // initialisation a 0 pr eviter les erreurs au clear/rechargement page
      }, 0);
      // update le state
      state.cartTotalAmount = totalAmount;
    },
    CALCULATE_TOTAL_QUANTITY(state, action) {
      const array = [];
      // recup les quantités de prods
      state.cartItems.map((item) => {
        const {cartQuantity} = item
        const quantity = cartQuantity;
        return  array.push(quantity);
      });
      // additione ts les elements du tab
      const totalQuantity = array.reduce((a, b) => {
        return a + b
        // initialisation a 0 pr eviter les erreurs au clear/rechargement page
      }, 0);
      // update le state
      state.cartTotalQuantity = totalQuantity;
    },
    SAVE_URL(state,action) {
      // sauvegarde url pr checkout
      console.log(action.payload);
      state.previousURL = action.payload;
    }
  },
});

export const {ADD_TO_CART, DECREASE_CART, REMOVE_FROM_CART, CLEAR_CART, CALCULATE_SUBTOTAL, CALCULATE_TOTAL_QUANTITY, SAVE_URL} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity;
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount;
export const selectPreviousURL = (state) => state.cart.previousURL;


export default cartSlice.reducer;