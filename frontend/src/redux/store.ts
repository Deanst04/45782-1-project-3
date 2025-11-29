import { configureStore } from "@reduxjs/toolkit";
import vacationSlice from "./vacation-slice";
import graphSlice from "./graph-slice";

const store = configureStore({
    reducer: {
        vacationSlice,
        graphSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch