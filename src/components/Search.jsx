import React from 'react'
import { useState } from 'react'

function Search({gifsearch}) {
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    const search = event.target.value;
    setSearch(search);
    if(search !== "") gifsearch(search);
  }
  return (
    <input 
      type="text" 
      placeholder="Search Tenor..." 
      onChange= {handleChange}  
      value={search}
    />
  )
}

export default Search