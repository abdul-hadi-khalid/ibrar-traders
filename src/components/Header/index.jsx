import React from 'react'
import { NavLink } from "react-router-dom";
import '../Header/header.css'

function Header() {
  return (
    <div className='header-cont'>
      <div className='menu'>
        <NavLink to={'/'}
                style={({ isActive }) => ({
                    textDecoration: isActive ? 'none': 'none',
                    color: isActive ? 'blue' : 'black',
                 })}>
        Home</NavLink>
        <NavLink to={'/stock'}
                style={({ isActive }) => ({
                    textDecoration: isActive ? 'none':'none',
                    color: isActive ? 'blue' : 'black',
                 })}>
        Stock</NavLink>
        <NavLink to={'/daily'}
                style={({ isActive }) => ({
                    textDecoration: isActive ? 'none':'none',
                    color: isActive ? 'blue' : 'black',
                 })}>
        Sales</NavLink>
      </div>
    </div>
  )
}

export default Header
