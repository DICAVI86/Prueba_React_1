import React from 'react'

function Buscador({query, setQuery, placeholder}) {

  return (
    <input 
        type='text'
        value={query}
        onChange={e => setQuery(e.target.value)}
        className="form-control"
        placeholder={placeholder}
    />

  )
}

export default Buscador