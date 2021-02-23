import React from 'react'
import NimiFormi from './NimiFormi'
import palvelimenMetodit from './palvelimenMetodit'

const ListaJaSubmit = (props) => {

  let persons = props.persons
  let newName = props.newName
  let newNumber = props.newNumber
  let setPersons = props.setPersons
  let setNewName = props.setNewName
  let setNewNumber = props.setNewNumber
  let setFilter = props.setFilter
  let setErrorMessage = props.setErrorMessage
  let setColor = props.setColor
  

  const NimiOnListalla = (event) => {

    event.preventDefault()
    var array = persons.filter(person => person.name === newName)

  
    if(array.length===1){
      if(window.confirm(`${newName} is already added to phonebook - replace old number with new one?`)){
        var existing = array[0]

        const nimiObjekti = {
          name: newName,
          number: newNumber,
          id: existing.id,
        }

        palvelimenMetodit
          .update(nimiObjekti)
          .then(response => {
            setPersons(persons.map(person => person.id !== existing.id ? person : response))
            setNewName('')
            setNewNumber('')
            setFilter('')
          })
          .catch(error => {
            console.log(error)
            setColor('red')
            setErrorMessage(`ERROR: information about ${newName} has already been removed from server`)
          })
          setColor('green')
          setErrorMessage(`${newName}'s phonenumber was successfully updated`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 4000)
      }
    }
    else {
      return(
        submitattaessa()
      )
    }
  }

  const submitattaessa = () => {
    const nimiObj = {
      name: newName,
      number: newNumber
    }

    palvelimenMetodit
      .create(nimiObj)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNumber('')
        setFilter('')
      })
      setColor('green')
      setErrorMessage(`${newName} was successfully added to the Phonebook`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
  }

  return (

  <form onSubmit={NimiOnListalla}>
    <NimiFormi newName={newName} setNewName={setNewName} text='name'/>
    <NimiFormi newName={newNumber} setNewName={setNewNumber} text='number'/>
    <button type="submit">add</button>
  </form>
  )
}

export default ListaJaSubmit
