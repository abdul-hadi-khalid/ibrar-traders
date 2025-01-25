import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:4872/api';

// Async thunk to fetch stock data
export const fetchStock = createAsyncThunk('/api/stock/fetchStock', async () => {
  const response = await axios.get(`${BASE_URL}/stock`);
  console.log("API response:", response.data);
  return response.data;
});

// Action to update stock
const updateStock = createAsyncThunk('stock/updateStock', async (updatedStock) => {
  const response = await axios.put(`${BASE_URL}/stock/update`, updatedStock);
  return response.data;
});

const stockSlice = createSlice({
  name: 'stock',
  initialState: {
    items: [],
    status: 'idle',
  },
  reducers: {
    // Reducer to directly update stock in the state
    updateStockState: (state, action) => {
      const { id, stock } = action.payload;
      const productIndex = state.items.findIndex((item) => item.id === id);
      if (productIndex !== -1) {
        state.items[productIndex].stock = stock;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStock.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchStock.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        console.log('Fetched stock data:', action.payload);
      })
      .addCase(fetchStock.rejected, (state, action) => {
        state.status = 'failed';
        console.error('Error fetching stock:', action.payload);
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        // Handle any side effects after stock is updated
        console.log('Stock updated:', action.payload);
      });
  },
});

export const { updateStockState } = stockSlice.actions;

export {updateStock};

export default stockSlice.reducer;
