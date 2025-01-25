import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useLocation } from "react-router";
import {useEffect} from 'react'

import Home from '../pages/home'
import StockPage from '../pages/Stock'
import Daily from '../pages/Daily'
import Header from '../components/Header'

const ScrollToTop = (props) => {
    const location = useLocation();
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);
  
    return <>{props.children}</>
  };
  

function Router() {
  return (
    <BrowserRouter>
        <Header />
        <ScrollToTop>
            <Routes>
                <Route index element={<Home />} path='/'/>
                <Route element={<StockPage />} path='/stock'/>
                <Route element={<Daily />} path='/daily'/>
            </Routes>
        </ScrollToTop>
    </BrowserRouter>
  )
}

export default Router
