import React from'react'
import palvelimenMetodit from './palvelimenMetodit'


const Button = ({handleClick}) => {
  return (
    <>
      <button onClick={handleClick}>delete</button>
    </>
  )
}

const poistonFunktionaalisuus = (removeId, name, setPersons, persons, setColor, setErrorMessage) => {
  if (window.confirm(`Delete ${name}?`)){
    palvelimenMetodit
      .remove(removeId)
      .then(response => {
        setPersons(persons.filter(person => person.id !== removeId))
      })
      .catch(error => {
        console.log(error)
        setColor('red')
        setErrorMessage(`ERROR: information about ${name} has already been removed from server`)
      })
      setColor('green')
      setErrorMessage(`${name} was successfully *DELETED* from the Phonebook`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
  }
}

const Tulostus = ({persons, uusiMuutos, setPersons, setColor, setErrorMessage}) => {

  const filtteriFunktio = function(person) {
    return person.name.toString().toLowerCase().includes(uusiMuutos.toString().toLowerCase())
  }

  var sisaltyvatHenkilot = persons.filter(filtteriFunktio)

  return (
    sisaltyvatHenkilot
      .map(x => <p key={x.name}>{x.name} {x.number}
      <Button handleClick={() => 
        poistonFunktionaalisuus(x.id, x.name, setPersons, persons, setColor, setErrorMessage)}>
      </Button></p>)
  )
}
  
export default Tulostus