import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type Vacation from "../models/vacation";

interface VacationState {
    vacations: Vacation[]
}

const initialState: VacationState = {
    vacations: []
}

export const vacationSlice = createSlice({
    name: 'vacation',
    initialState,
    reducers: {
        init: (state, action: PayloadAction<Vacation[]>) => {
            state.vacations = action.payload
        },
        addVacation: (state, action: PayloadAction<Vacation>) => {
            state.vacations.push(action.payload)
        },
        editVacation: (state, action: PayloadAction<Vacation>) => {
            const vacIdx = state.vacations.findIndex(v => v.id === action.payload.id)
            if (vacIdx > -1) state.vacations[vacIdx] = action.payload
        },
        deleteVacation: (state, action: PayloadAction<string>) => {
            state.vacations = state.vacations.filter(v => v.id !== action.payload)
        },
        toggleLike: (state, action: PayloadAction<string>) => {
            const vac = state.vacations.find(v => v.id === action.payload)
            if (!vac) return

            vac.isFollowed = !vac.isFollowed
            vac.followerCount += vac.isFollowed ? 1 : -1
        }
    }
})

export const { init, addVacation, editVacation, deleteVacation, toggleLike } = vacationSlice.actions

export default vacationSlice.reducer