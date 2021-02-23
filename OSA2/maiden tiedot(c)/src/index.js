import React, { useState, useEffect } from 'react'
import Filtteri from './components/Filtteri'
import Tulostus from './components/Tulostus'
import axios from 'axios'
import ReactDOM from 'react-dom'

const App = () => {

  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const [ newChange, setFilter ] = useState('')

  return (
    <div>
      <Filtteri newChange={newChange} countries={countries} setFilter={setFilter}/>
      <Tulostus countries={countries} newChange={newChange} />
    </div>
  )
}

ReactDOM.render(
  <App />, document.getElementById('root')
)