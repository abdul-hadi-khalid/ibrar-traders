import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "/Users/Wardah/Desktop/nimko/frontend/src/redux/slices/salesSlice";
import "./table.css";

function Table() {
  const dispatch = useDispatch();
  const { weekly, status } = useSelector((state) => state.sales);
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    console.log("Fetching sales data...");
    dispatch(fetchSales());
  }, [dispatch]);

  useEffect(() => {
    console.log("Weekly sales data structure:", weekly);

    // Check if `weekly` is a valid object
    if (weekly && typeof weekly === "object" && !Array.isArray(weekly)) {
      // Convert the object into an array of { day, sales } objects
      const formattedSales = Object.entries(weekly).map(([day, sales]) => ({
        day,
        sales: sales ?? 0, // Default sales to 0 if it's null/undefined
      }));
      setSalesData(formattedSales);
    } else {
      console.error("Expected `weekly` to be an object with day-sales pairs:", weekly);
      setSalesData([]);
    }
  }, [weekly]);

  if (status === "loading") return <p>Loading sales data...</p>;
  if (status === "failed") return <p>Failed to load sales data.</p>;

  return (
    <div className="sales-table-page">
      <div className="sales-table-flex">
        <div className="sales-table-container">
          <div className="sales-table-main-h">
            <h1 className="weekly-sales-heading">Weekly Sales</h1>
          </div>
          <div className="sales-table-head">
            <div className="sales-heading">Day :</div>
            <div className="sales-heading">Sales :</div>
          </div>
          <div className="sales-table-data">
            {salesData.length > 0 ? (
              <>
                <div className="sales-data">
                  {salesData.map((data, index) => (
                    <ul key={index}>
                      <li>{data.day}</li>
                    </ul>
                  ))}
                </div>
                <div className="sales-data">
                  {salesData.map((data, index) => (
                    <ul key={index}>
                      <li>{data.sales}</li>
                    </ul>
                  ))}
                </div>
              </>
            ) : (
              <p>No sales data available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;
