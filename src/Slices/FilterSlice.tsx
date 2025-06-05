import { createSlice } from "@reduxjs/toolkit";

const FilterSlice = createSlice({
    name: "filter",
    initialState: {},
    reducers: {
        updateFilter: (state, action) => {
            state = { ...state, ...action.payload };
            console.log(state);
            return state;
        },
        resetFilter: (state) => {
            state = {};
            return state;
        }
    }
})

export const { updateFilter, resetFilter } = FilterSlice.actions;
export default FilterSlice.reducer;