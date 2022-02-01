import { createSlice, createAsyncThunk  } from "@reduxjs/toolkit";
import Api from '../auth/Login.api';
import storage from '../auth/Storage';

export const checkUser = createAsyncThunk(
    "access/check",
    async (data , { rejectWithValue }) => {
        try {
            const res = await Api.checkUser();
            return res.data;
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return rejectWithValue(message)
        }
    }
)

const AccessSlice = createSlice({
    name: "access",
    initialState: {
        loading: false,
        error: '',
        allow: false,
        checked : false ,
        user : null ,
    },
    reducers: {
        clear : (state , action) => {
            state.loading = false ;
            state.error = '';
            state.allow = false ;
            state.checked = false ;
            state.user = null ;
        },
        logout : (state , action ) => {
            storage.logout();
        },
        
    },
    extraReducers: {
        [checkUser.fulfilled]: (state, action) => {
            if (action.payload) {
                if (action.payload) {
                    storage.setData(action.payload);
                    state.user = action.payload ;
                    state.error = '';
                    state.allow = true ;
                }else{
                    state.allow = false ;
                    storage.logout();
                }
            }
            state.checked = true ;
            state.loading = false;
            
        },
        [checkUser.rejected]: (state, action) => {
            state.loading = false;
            state.allow = false ;
            state.checked = true ;
            state.error = action.payload;
        },
        [checkUser.pending]: (state, action) => {
            state.loading = true;
        }
    }
})

const { reducer } = AccessSlice;
export const { logout , clear } = AccessSlice.actions;
export default reducer;