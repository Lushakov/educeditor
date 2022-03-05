import { createSlice } from '@reduxjs/toolkit';
import { fetchMaterials, getMaterialDetails } from "./materials-reqs";
import cloneDeep from "lodash/cloneDeep";

export const sliceTemplate = [
    {
        type: 'paragraph',
        children: [{ text: 'Какой то текст...' }],
    },
]
export const unitTemplate = [{
    name: 'Новый слайс',
    data: cloneDeep(sliceTemplate)
}]

const initialState = {
    isLoading: false,
    list: [],
    unit: null,
    currentSliceName: null,
    currentSliceData: null,
}
export const selectList = state => state.materials.list;
export const selectUnit = state => state.materials.unit;
export const selectCurrentSliceName = state => state.materials.currentSliceName;
export const selectCurrentSliceData = state => state.materials.currentSliceData;

export const slice = createSlice({
    name: 'materials',
    initialState,
    reducers: {
        addNewSlice(state, action) {
            state.unit.data.push({name: action.payload, data: cloneDeep(sliceTemplate)})
        }
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchMaterials.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(fetchMaterials.fulfilled, (state, action) => {
                state.isLoading = false;
                state.list = action.payload;
            })


        builder
            .addCase(getMaterialDetails.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getMaterialDetails.fulfilled, (state, action) => {
                state.isLoading = false;
                state.unit = action.payload;
                state.currentSliceName = action.payload.data[0].name
                state.currentSliceData = action.payload.data[0].data
            })
    },
});

export const {
    addNewSlice
} = slice.actions;
export default slice.reducer;
