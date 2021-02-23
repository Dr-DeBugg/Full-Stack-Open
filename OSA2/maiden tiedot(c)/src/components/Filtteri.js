import React from 'react'
import Tulostus from './Tulostus'

const Filtteri = ({newChange, countries, setFilter}) => {

  const filterMuutos = (event) => {
    setFilter(event.target.value)
    Tulostus({countries, newChange})
  }


  return( 
    <div>
      find countries: <input 
      value={newChange}
      onChange={filterMuutos}
      />
    </div>
        )
}



  export default Filtteri
  