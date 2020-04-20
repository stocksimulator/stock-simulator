import React from 'react'
import '../styles/AddStock.scss'
import Button from './Button'

const AddStock = () => (
  <div className="add-stock">
  <div className="values">
    <p className='name'>NAME: ACRX </p>
    <p className='price'>PRICE: $30.22</p>
    <div className="share-input">
    <label name="shares">SHARES: </label>
    <input className="shares" type="text" name='shares'/>
    </div>
    <p className='total'>TOTAL: $500.45</p>
  </div>
    <Button secondary>Buy</Button>
  </div>
)

export default AddStock;