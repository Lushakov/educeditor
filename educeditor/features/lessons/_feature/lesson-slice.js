import { createSlice } from '@reduxjs/toolkit';
import cloneDeep from "lodash/cloneDeep";
import { fetchSchedule } from './lesson-reqs';


const initialState = {
    isLoading: false,
    // materiallList: [],
    schedule: [],
}


// export const selectList = state => state.units.materiallList;
export const selectSchedule = state => state?.lesson?.schedule;


export const slice = createSlice({
    name: 'lesson',
    initialState,
    reducers: {
        // setUnitsListReq(state, action) {
        //     state.unitsListReq = {...state.unitsListReq, ...action.payload}
        // },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchSchedule.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchSchedule.fulfilled, (state, action) => {
                state.isLoading = false;
                state.schedule = action.payload;
            })
    },
});

export const {
    // setUnitsListReq,
} = slice.actions;
export default slice.reducer;
