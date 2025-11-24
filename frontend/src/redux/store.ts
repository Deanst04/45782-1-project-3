import { configureStore } from "@reduxjs/toolkit";
import vacationSlice from "./vacation-slice";

const store = configureStore({
    reducer: {
        vacationSlice
    }
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch