import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategories as fetchCategoriesApi } from '../constants/apis'; 

export const fetchCategoriesThunk = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { rejectWithValue }) => { 
        try {
            const response = await fetchCategoriesApi(); 
            return response; 
        } catch (error) {
            return rejectWithValue(error.message); 
        }
    }
);

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategoriesThunk.pending, (state) => {
                state.status = 'loading'; 
            })
            .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
                state.status = 'succeeded'; 
                state.data = action.payload; 
            })
            .addCase(fetchCategoriesThunk.rejected, (state, action) => {
                state.status = 'failed'; 
                state.error = action.payload || action.error.message; 
            });
    },
});

export default categorySlice.reducer;
