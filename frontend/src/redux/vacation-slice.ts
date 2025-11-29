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
        likeVacation: (state, action: PayloadAction<{ vacationId: string, isSelf: boolean }>) => {
            const vac = state.vacations.find(v => v.id === action.payload.vacationId)
            if (!vac) return

            vac.followerCount += 1

            if(action.payload.isSelf === true) vac.isFollowed = true
        },
        unlikeVacation: (state, action: PayloadAction<{ vacationId: string, isSelf: boolean }>) => {
            const vac = state.vacations.find(v => v.id === action.payload.vacationId)
            if (!vac) return

            vac.followerCount -= 1

            if (action.payload.isSelf === true) vac.isFollowed = false
            
        },
        reset: (state) => {
            state.vacations = []
        }
    }
})

export const { init, addVacation, editVacation, deleteVacation, likeVacation, unlikeVacation, reset } = vacationSlice.actions

export default vacationSlice.reducer