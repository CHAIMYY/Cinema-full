import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { filmReducer } from "./slices/filmSlice";

const store = configureStore({
    reducer: {
  auth: authReducer,
  film: filmReducer
    }
});
export default store;