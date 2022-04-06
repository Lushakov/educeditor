import { createSlice } from '@reduxjs/toolkit';
import { fetchMaterials, getMaterialDetails } from "./materials-reqs";
import cloneDeep from "lodash/cloneDeep";

export const sliceDataTemplate = [
    {
        type: 'paragraph',
        children: [{ text: 'Какой то текст...' }],
    },
]
export const unitDataTemplate = [{
    name: 'Новый слайс',
    data: cloneDeep(sliceDataTemplate)
}]

const initialState = {
    isLoading: false,
    materiallList: [],
    unit: null,
    currentSlice: null,
    slateTrigget: null,
}
export const selectList = state => state.materials.materiallList;
export const selectUnit = state => state.materials.unit;
export const selectCurrentSlice = state => state.materials.currentSlice;
export const selectSlateTrigget = state => state.materials.slateTrigget;

export const slice = createSlice({
    name: 'materials',
    initialState,
    reducers: {
        addNewSlice(state, action) {
            state.unit.data.push({ name: action.payload, data: cloneDeep(sliceDataTemplate) })
        },
        switchCurrentSlice(state, action) { //copy from currentSlice to unit by slice neme 
            // const sliceIndex = state.unit.data.findIndex(item => item.name === state.currentSlice.name)
            // state.unit.data[sliceIndex] = cloneDeep(state.currentSlice)
            state.currentSlice = cloneDeep(state.unit.data.find(item => item.name === action.payload))
            state.slateTrigget = Math.random()
        },
        saveCurrentScliceToUnit(state, action) {
            const sliceIndex = state.unit.data.findIndex(item => item.name === state.currentSlice.name)
            state.unit.data[sliceIndex] = cloneDeep(state.currentSlice)
        },
        changeCurrentSliceData(state, action) {
            state.currentSlice.data = action.payload
        },
        // onSlateTrigget() {
        //     state.slateTrigget = Math.random()
        // }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterials.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchMaterials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.materiallList = action.payload;
            })


        builder
            .addCase(getMaterialDetails.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getMaterialDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.unit = action.payload;
                state.currentSlice = action.payload.data[0]
                state.slateTrigget = Math.random()
            })
    },
});

export const {
    addNewSlice,
    switchCurrentSlice,
    saveCurrentScliceToUnit,
    changeCurrentSliceData,
} = slice.actions;
export default slice.reducer;
