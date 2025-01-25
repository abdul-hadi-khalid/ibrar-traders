import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSales } from "/Users/Wardah/Desktop/nimko/frontend/src/redux/slices/salesSlice";
import Graph from "./graph.jsx";

function SalesGraph() {
  const dispatch = useDispatch();
  const { weekly } = useSelector((state) => state.sales);

  useEffect(() => {
    dispatch(fetchSales());
  }, [dispatch]);

  return (
    <div className="sales-graph-head">
      <h1>Sales Chart</h1>
      {weekly && <Graph weeklySales={weekly} />}
    </div>
  );
}

export default SalesGraph;
