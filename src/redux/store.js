import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import filterReducer from "./slice/filterSlice";
import cartReducer from "./slice/cartSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    product: productReducer,
    filter: filterReducer,
    cart: cartReducer,
});

const store = configureStore({
    reducer: rootReducer, 
    // exclusion du middleware de vérification d'état sérialisable(sinon crée erreur ex(timeStamp/editProduct))
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({      
      serializableCheck: false,
    }),
});

export default store;