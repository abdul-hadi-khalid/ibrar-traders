import React from 'react'
import '../home/home.css'
import SalesGraph from './SalesGraph'

function Home() {
  return (
    <>
    <div className='home-page-1'>
      <div className='img-logo'>
        <img src="Picture1.png" alt="" />
      </div>
      <div className='home-heading'>
        <h2>Ibrar Traders</h2>
      </div>
    </div>
    <div className='home-page-2'>
      <SalesGraph />
    </div>
    </>
  )
}

export default Home
