import React from 'react'
import '../styles/AddStock.scss'
import Button from './Button'

const AddStock = ({searchSymbol, price, handleAddSharesChange, addShares, handleBuyClick, invalidKeyWord}) => (
  <div className="add-stock">
  <div className="values">
    <p className='name'>NAME: {searchSymbol.toUpperCase()} </p>
    <p className='price'>PRICE: ${(price || '')}</p>
    <div className="share-input">
    <label name="shares">SHARES: </label>
    <input className="shares" type="text" name='shares' value={addShares} onChange={handleAddSharesChange}/>
    </div>
    <p className='total'>TOTAL: ${price * addShares}</p>
  </div>
    <Button onClick={handleBuyClick} secondary disabled={invalidKeyWord}>Buy</Button>
  </div>
)

export default AddStock;