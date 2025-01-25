import React from 'react'
import './index.css'
import Form from './form';
import Table from './table'

function Daily() {
  return (
    <div className='daily-page-container'>
      <h1 className='daily-page-heading'>SALES</h1>
      <Form />
      <Table />
    </div>
  )
}

export default Daily
