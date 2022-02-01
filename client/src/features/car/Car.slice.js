import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from './Car.api';

const initialState = {
    loading: false,
    error: '',
    data: [],
};

export const list = createAsyncThunk(
    "car/fetch",
    async (data, { rejectWithValue }) => {
        try {
            const res = await Api.fetchCars(data)
            return res.data;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return rejectWithValue(message)
        }
    }
)

const carSlice = createSlice({
    name: "colis",
    initialState,
    reducers: {

        clear: (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = [];
        },
    },

    extraReducers: {
        [list.fulfilled]: (state, action) => {
            if (action.payload) {
                state.data = action.payload;
            }
            state.error = '';
            state.loading = false;

        },
        [list.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [list.pending]: (state, action) => {
            state.loading = true;
            state.data = [];
        },
    }
})


const { reducer } = carSlice;
export const { clear } = carSlice.actions;
export default reducer;