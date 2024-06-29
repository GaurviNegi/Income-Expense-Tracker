import {configureStore} from "@reduxjs/toolkit"
import authreducer from "../slice/authSlice";

export const store = configureStore({
    reducer:{
        auth:authreducer
    }
});