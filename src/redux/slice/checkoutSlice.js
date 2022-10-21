import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    shippingAdress: {},
    billingAdress: {},
}

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_SHIPPING_ADRESS(state, action) {
        console.log(action.payload);
        state.shippingAdress =action.payload
    },
    SAVE_BILLING_ADRESS(state, action) {
        console.log(action.payload);
        state.billingAdress =action.payload
    },
  }
});

export const {SAVE_SHIPPING_ADRESS, SAVE_BILLING_ADRESS} = checkoutSlice.actions;

export const selectShippingAdress = (state) => state.checkout.shippingAdress;
export const selectBillingAdress = (state) => state.checkout.billingAdress;

export default checkoutSlice.reducer;