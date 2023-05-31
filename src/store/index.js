import { configureStore } from "@reduxjs/toolkit";
import appReduser from "./app/appSlice";

export const store = configureStore({
    reducer: {
        'app': appReduser
    }
})