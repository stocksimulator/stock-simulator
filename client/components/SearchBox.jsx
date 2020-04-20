import React from 'react'
import Button from './Button'
import '../styles/SearchBox.scss'

const SearchBox = () => (
  <div className="search-box">
    <input type="text"/>
    <Button ml1 def>Search</Button>
  </div>
)

export default SearchBox;