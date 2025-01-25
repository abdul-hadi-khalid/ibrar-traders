import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

// Async thunk to fetch weekly sales
export const fetchSales = createAsyncThunk('/api/sales/fetchSales', async () => {
  const response = await axios.get(`${BASE_URL}/sales/week`);
  return response.data;
});

// Async thunk to record a sale (updates total sales for the day)
export const recordSale = createAsyncThunk('sales/recordSale', async (sale, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${BASE_URL}/sales`, sale);
    return response.data;
  } catch (error) {
    console.error("Error recording sale:", error);
    return rejectWithValue(error.response?.data || "Failed to record sale");
  }
});

const salesSlice = createSlice({
  name: 'sales',
  initialState: {
    weekly: {},
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetching weekly sales
      .addCase(fetchSales.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSales.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.weekly = action.payload;
      })
      .addCase(fetchSales.rejected, (state) => {
        state.status = 'failed';
      })

      // Handle recording a sale
      .addCase(recordSale.fulfilled, (state, action) => {
        const today = new Date().toLocaleString('en-us', { weekday: 'long' });
        
        // Update the total sales for today by adding the new sale amount
        if (state.weekly[today]) {
          state.weekly[today] += action.payload.totalSales;
        }
      });
  },
});

export default salesSlice.reducer;
