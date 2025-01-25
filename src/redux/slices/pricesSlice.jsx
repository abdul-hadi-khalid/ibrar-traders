import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Async thunk to fetch prices
export const fetchPrices = createAsyncThunk('prices/fetchPrices', async () => {
  const response = await axios.get(`${BASE_URL}/prices`);
  return response.data;
});

const pricesSlice = createSlice({
  name: 'prices',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPrices.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPrices.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default pricesSlice.reducer;
