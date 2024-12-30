import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import  userReducer from "./emailReducer";
const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    },
});

export default store;
