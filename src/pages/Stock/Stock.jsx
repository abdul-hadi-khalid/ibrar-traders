import React,{useEffect,useState} from 'react'
import '../Stock/stock.css'
import { useSelector, useDispatch } from 'react-redux';
import {fetchStock} from '/Users/Wardah/Desktop/nimko/frontend/src/redux/slices/stockSlice';

function Stock() {

  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.stock);
  
  useEffect(() => {
    console.log("Fetching stock...");
    dispatch(fetchStock());
  }, [dispatch]);
  
  
  if (status === 'loading') return <p>Loading stock data...</p>;
  if (status === 'failed') return <p>Failed to load stock data.</p>;


  return (
    <div className='stock-page'>
      <h1 className='stock-heading'>STOCK</h1>
      <div className='stock-table-flex'>
        <div className='stock-table-container'>
          <div className='stock-table-head'>
            <div className='product-id table-heading'>ID:</div>
            <div className='product-name table-heading table-heading2'>Product Name:</div>
            <div className='product-stock table-heading table-heading2'>Stock Available:</div>
          </div>
              <div className="stock-table-data">
                <div className="product-id-data product-data">
                  {items.map((product)=>
                    <ul>
                      <li>{product.id}</li>
                    </ul>
                  )}
                </div>
                <div className="product-name-data product-data product-data2">
                  {items.map((product)=>
                    <ul>
                      <li>{product.name}</li>
                    </ul>
                  )}
                </div>
                <div className="product-stock-data product-data product-data2">
                  {items.map((product)=>
                    <ul>
                      <li>{product.stock}</li>
                    </ul>
                  )}
                </div>
              </div>
        </div>
      </div>
    </div>

  )
}

export default Stock;
