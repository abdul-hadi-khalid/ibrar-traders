import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "/Users/Wardah/Desktop/nimko/frontend/src/redux/slices/salesSlice";
import { fetchStock } from "/Users/Wardah/Desktop/nimko/frontend/src/redux/slices/stockSlice";
import { fetchPrices } from "/Users/Wardah/Desktop/nimko/frontend/src/redux/slices/pricesSlice";
import axios from "axios";
import "./form.css";

function Form() {
  const [salesData, setSalesData] = useState({});
  const [totalSale, setTotalSale] = useState(0);
  const [initialStock, setInitialStock] = useState([]); // Declare as an empty array initially
  const [isLoading, setIsLoading] = useState(true); // Handle loading state

  const dispatch = useDispatch();

  const { weekly } = useSelector((state) => state.sales);
  const { items: stockData } = useSelector((state) => state.stock);
  const { items: prices } = useSelector((state) => state.prices);

  const currentDay = new Date().toLocaleString("en-us", { weekday: "long" });

  useEffect(() => {
    // Fetch required data and mark loading as false
    const fetchData = async () => {
      await dispatch(fetchPrices());
      await dispatch(fetchStock());
      await dispatch(fetchSales());
      setIsLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const handleInputChange = (productId, value) => {
    setSalesData((prevData) => ({
      ...prevData,
      [productId]: parseInt(value, 10) || 0,
    }));
  };

  const calculateTotalSale = () => {
    const total = Object.entries(salesData).reduce((acc, [productId, quantity]) => {
      const product = prices.find((p) => p.id === parseInt(productId, 10));
      return acc + (product?.price || 0) * (quantity || 0);
    }, 0);
    setTotalSale(total);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!initialStock.length) {
        // Initialize the initialStock array on form submission if not already done
        setInitialStock(stockData.map((item) => ({ id: item.id, stock: item.stock })));
      }

      let totalSalesForDay = 0;
      const updatedStock = stockData.map((item) => ({ ...item })); // Deep copy stockData

      for (const [productId, quantity] of Object.entries(salesData)) {
        if (quantity > 0) {
          const product = prices.find((p) => p.id === parseInt(productId, 10));
          const totalPrice = (product?.price || 0) * parseInt(quantity, 10);
          totalSalesForDay += totalPrice;

          const stockItem = updatedStock.find((item) => item.id === parseInt(productId, 10));
          if (stockItem) stockItem.stock -= parseInt(quantity, 10);
        }
      }

      // Update stock in the backend
      const updateStockPromises = updatedStock.map((item) =>
        axios.put(`http://localhost:4872/api/stock/${item.id}`, { stock: item.stock })
      );
      await Promise.all(updateStockPromises);

      // Update sales in the backend
      await axios.post("http://localhost:4872/api/sales", { totalSales: totalSalesForDay });

      dispatch(fetchSales());
      dispatch(fetchStock());

      alert("Sales data updated successfully!");
      setSalesData({});
      setTotalSale(totalSalesForDay);
    } catch (error) {
      console.error("Error recording sales:", error);
      alert("Failed to record sales. Please try again.");
    }
  };

  const handleReset = async () => {
    try {
      if (!initialStock.length) {
        alert("Reset cannot be performed as initial stock data is missing.");
        return;
      }

      // Reset stock to the initial values
      const resetStockPromises = initialStock.map((item) =>
        axios.put(`http://localhost:4872/api/stock/${item.id}`, { stock: item.stock })
      );
      await Promise.all(resetStockPromises);

      // Reset sales data in the backend
      await axios.post("http://localhost:4872/api/sales/reset", { date: currentDay });


      dispatch(fetchSales());
      dispatch(fetchStock());

      alert(`Sales and stock data for ${currentDay} have been reset.`);
      setSalesData({});
      setTotalSale(0);
    } catch (error) {
      console.error("Error resetting data:", error);
      alert("Failed to reset data. Please try again.");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="sales-form-page-container">
      <div className="sales-form-container">
        <h2>Record Daily Sales</h2>
        <form onSubmit={handleSubmit}>
          {prices.map((product) => {
            const stock = stockData.find((p) => p.id === product.id)?.stock || 0;
            return (
              <div key={product.id} className="sales-form-field">
                <label className="sales-form-label">
                  {product.name} (Stock: {stock})
                </label>
                <input
                  className="sales-form-input"
                  type="number"
                  min="0"
                  value={salesData[product.id] || ""}
                  onChange={(e) => handleInputChange(product.id, e.target.value)}
                  disabled={stock === 0}
                />
              </div>
            );
          })}
          <button type="button" className="calculate-btn" onClick={calculateTotalSale}>
            <i className="fa-solid fa-calculator"></i> Calculate Total Sale
          </button>
          <button type="submit" className="submit-btn">
            <i className="fa-solid fa-check"></i> Submit Sales
          </button>
          <button type="button" className="reset-btn" onClick={handleReset}>
            <i className="fa-solid fa-rotate-left"></i> Reset Sales
          </button>
        </form>
        <div className="sales-result">
          <h3>Total Sale for Today: {totalSale}</h3>
        </div>
      </div>
    </div>
  );
}

export default Form;
