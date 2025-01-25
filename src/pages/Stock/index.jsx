import React,{useState} from 'react'
import Stock from '../Stock/Stock'
import Form from './Form'

function StockPage() {
  const [showForm,setShowForm]=useState(false);

  return (
    <div className='stock-page-main'>
      <Stock />
      <div className='update-btn'>
        <button onClick={()=>setShowForm(true)}><i class="fas fa-sync"></i> Update stock</button>
      </div>
      {showForm && <Form onClose={()=>setShowForm(false)} />}
    </div>
  )
}

export default StockPage
