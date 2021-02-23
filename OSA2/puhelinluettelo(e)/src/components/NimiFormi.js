import React from 'react'

const NimiFormi = ({newName, setNewName, text}) => {

  const nimenMuutos = (event) => {
    setNewName(event.target.value)
  }
 
  return (
    
    <div>
      {text}: <input value={newName} onChange={nimenMuutos}/>
    </div>
  )
}

export default NimiFormi