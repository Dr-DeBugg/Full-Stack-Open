import React, {useState, useEffect} from 'react'
import ListaJaSubmit from './ListaJaSubmit'
import Tulostus from './Tulostus'
import Filtteri from './Filtteri'
import palvelimenMetodit from './palvelimenMetodit'
import Notification from './Notification'


const OtsikonTulostus = ({aihe}) => {
  return(
    <h1>{aihe}</h1>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ uusiMuutos, setFilter ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ color, setColor ] = useState(null)

  useEffect(() => {
    palvelimenMetodit
      .getAll()
      .then(response => {
        setPersons(response)
      })
  }, [])

  return (
    <div>
      <OtsikonTulostus aihe='rajausehto' />
      <Notification message={errorMessage} color={color}/>
      <Filtteri uusiMuutos={uusiMuutos} persons={persons} setFilter={setFilter}/>
      <OtsikonTulostus aihe='Phonebook' />
      <ListaJaSubmit persons={persons} newName={newName} newNumber={newNumber} uusiMuutos={uusiMuutos} setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber} setFilter={setFilter} setErrorMessage={setErrorMessage} setColor={setColor}/>
      <OtsikonTulostus aihe='Numbers' />
      <Tulostus persons={persons} uusiMuutos={uusiMuutos} setPersons={setPersons} setErrorMessage={setErrorMessage} setColor={setColor}/>
  </div>
  )
}
export default App