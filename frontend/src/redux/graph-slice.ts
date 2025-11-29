import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type VacationFollowersCount from "../models/vacation-followed-count";


interface GraphState {
    stats: VacationFollowersCount[]
}

const initialState: GraphState = {
    stats: []
}

export const graphSlice = createSlice({
    name: 'graph',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<VacationFollowersCount[]>) => {
            state.stats = action.payload
        },
        increaseFollowersCount: (state, action: PayloadAction<string>) => {
            const vac = state.stats.find(s => s.id === action.payload)
            if (!vac) return

            vac.followersCount += 1
        },
        decreaseFollowersCount: (state, action: PayloadAction<string>) => {
            const vac = state.stats.find(s => s.id === action.payload)
            if (!vac) return

            vac.followersCount -= 1
        },
        reset: (state) => {
            state.stats = []
        }
    }
})

export const { init, increaseFollowersCount, decreaseFollowersCount, reset } = graphSlice.actions

export default graphSlice.reducer