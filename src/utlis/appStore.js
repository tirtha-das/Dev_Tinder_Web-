import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer from "./userSlice";
import feedSliceReducer from "./feedSlice"
import connectionsSliceReducer from "./connectionsSlice";
import requestSlice from "./requestSlice";


const appStore = configureStore({
    reducer:{
      user:userSliceReducer,
      feed:feedSliceReducer,
      connections:connectionsSliceReducer,
      requests:requestSlice

    }
})

export default appStore;