import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";

const rootReducer = combineReducers({
    auth: authReducer,
    product:productReducer,
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