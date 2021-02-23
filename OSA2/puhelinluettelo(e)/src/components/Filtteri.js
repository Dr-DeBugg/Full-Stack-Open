import React from 'react'
import Tulostus from './Tulostus'

const Filtteri = ({uusiMuutos, persons, setFilter, setPersons}) => {

  const filterMuutos = (event) => {
    setFilter(event.target.value)
    Tulostus({persons, uusiMuutos, setPersons})
  }

  return( 
    <div>
      filter with: <input 
      value={uusiMuutos}
      onChange={filterMuutos}
      />
    </div>
  )
}

  export default Filtteri
  