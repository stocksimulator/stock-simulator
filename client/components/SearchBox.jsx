import React from 'react'
import Button from './Button'
import '../styles/SearchBox.scss'

const SearchBox = ({handleSearchClick, handleSearchChange}) => (
  <div className="search-box">
    <input type="text" onChange={handleSearchChange}/>
    <Button ml1 def onClick={handleSearchClick}>Search</Button>
  </div>
)

export default SearchBox;