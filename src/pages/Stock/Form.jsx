import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStock } from '/Users/Wardah/Desktop/nimko/frontend/src/redux/slices/stockSlice';
import '../Stock/form.css';

function Form({ onClose }) {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.stock);
  const [updatedStocks, setUpdatedStocks] = useState({});

  useEffect(() => {
    // Initialize updatedStocks with current stock values
    const initialStockValues = {};
    items.forEach((product) => {
      initialStockValues[product.id] = product.stock;
    });
    setUpdatedStocks(initialStockValues);
  }, [items]);

  const handleInputChange = (id, value) => {
    const numericValue = Math.max(0, parseInt(value, 10) || 0); // Prevent negative values
    setUpdatedStocks((prev) => ({
      ...prev,
      [id]: numericValue,
    }));
  };

  const handleReset = () => {
    // Set all stocks to zero
    const resetValues = {};
    items.forEach((product) => {
      resetValues[product.id] = 0;
    });
    setUpdatedStocks(resetValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Update each product's stock in the backend
      const updatePromises = Object.entries(updatedStocks).map(([id, stock]) =>
        axios.put(`http://localhost:4872/api/stock/${id}`, { stock })
      );
      await Promise.all(updatePromises);

      // Fetch updated stock data and close the form
      dispatch(fetchStock());
      onClose();
    } catch (error) {
      console.error('Failed to update stock:', error);
    }
  };

  return (
    <div className='form-page-container' onClick={onClose}>
      <div className='stock-form-container' onClick={(e) => e.stopPropagation()}>
        <div className='close-btn-div'>
          <button onClick={onClose} className='close-btn'>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <h2>Update Stock</h2>
        <div className='stock-form'>
          <form onSubmit={handleSubmit}>
            {items.map((product) => (
              <div key={product.id} className="form-field">
                <label htmlFor={`product-${product.id}`} className="form-label">
                  {product.name}:
                </label>
                <input
                  type="number"
                  id={`product-${product.id}`}
                  className="form-input"
                  value={updatedStocks[product.id] || ''}
                  onChange={(e) => handleInputChange(product.id, e.target.value)}
                  min="0" // Enforces non-negative values in the UI
                />
              </div>
            ))}
            <div className='stock-submit-btn'>
              <button type="submit" className='stock-submit-btn-but'>
                <i className="fa-solid fa-check"></i>&ensp;Submit
              </button>
              <button type="button" onClick={handleReset} className="reset-btn">
                <i className="fa-solid fa-rotate-left"></i>&ensp;Reset Stock
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
