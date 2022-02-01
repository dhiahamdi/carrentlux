import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Api from './Login.api';
import Storage from './Storage';

const initialState = {
    loading: false,
    error: '',
    data: null,
    auth_success : false ,
}

export const login = createAsyncThunk(
    "auth/login",
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const res = await Api.login(email, password);
            return res.data;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return rejectWithValue(message)
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState ,
    reducers: {
        clear: (state, action) => {
            state.loading = false;
            state.error = '';
            state.data = null;
            state.auth_success = false ;
        },
        logout: (state, action) => {
            Storage.logout();
        },

    },
    extraReducers: {

        [login.fulfilled]: (state, action) => {
            if (action.payload) {
                if (action.payload.success) {
                    Storage.setData(action.payload.user);
                    Storage.setToken(action.payload.token);
                    state.error = '';
                    state.data = action.payload;
                    state.auth_success = true ;
                }else{
                    state.error = 'Login failed !';
                    state.auth_success = false ;
                }
            }
            
            state.loading = false;
            
        },
        [login.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.auth_success = false ;
        },
        [login.pending]: (state, action) => {
            state.loading = true;
            state.auth_success = false ;
        }

    }
})

const { reducer } = authSlice;
export const { logout , clear } = authSlice.actions;
export default reducer;