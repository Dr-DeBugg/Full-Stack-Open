import React from'react'
import ReactDOM from 'react-dom'
import SaaNyt from './SaaNyt'

const Button = ({handleClick}) => {
  return (
    <button onClick={handleClick}>
      show
    </button>
  )
}

const refresh = (sisaltyvatValtiot) => {
  ReactDOM.render(<TiettyValtio sisaltyvatValtiot={sisaltyvatValtiot}/>,
  document.getElementById('root'))
}

const Tulostus = ({countries, newChange}) => {
  const filtteriFunktio = function(countries) {
    return countries.name.toString().toLowerCase().includes(newChange.toString().toLowerCase())
  }
  var sisaltyvatValtiot = countries.filter(filtteriFunktio)

  var valtiotMaara = sisaltyvatValtiot.length
  console.log(valtiotMaara)

  if(valtiotMaara > 10) {
    return (
      <p>Too many matches,specify another filter</p>
    )
  }
  else if (valtiotMaara === 1) {
    return (
      <>
      <h1>{sisaltyvatValtiot[0].name}</h1>
      <p>Capital {sisaltyvatValtiot[0].capital}</p>
      <p>Population {sisaltyvatValtiot[0].population}</p>
      <h2>languages</h2>
      {sisaltyvatValtiot[0].languages.map(x => <li key={x.name}>{x.name}</li>)}
      <br></br>
      <img src={sisaltyvatValtiot[0].flag} alt="flag" width="100px" height="80px"></img>
      <SaaNyt maanNimi={sisaltyvatValtiot[0].capital}/>
      </>
    )
  }
  else {
    return (
      sisaltyvatValtiot.map(x => <p key={x.name}>{x.name} <Button handleClick={() => valtionTiedot(x.name, sisaltyvatValtiot)}/></p>)
    )
  }
}


const TiettyValtio = ({sisaltyvatValtiot}) => {

  return (
    <>
    <h1>{sisaltyvatValtiot[0].name}</h1>
    <p>Capital {sisaltyvatValtiot[0].capital}</p>
    <p>Population {sisaltyvatValtiot[0].population}</p>
    <h2>languages</h2>
    {sisaltyvatValtiot[0].languages.map(x => <li key={x.name}>{x.name}</li>)}
    <br></br>
    <img src={sisaltyvatValtiot[0].flag} alt="flag" width="100px" height="80px"></img>
    <SaaNyt maanNimi={sisaltyvatValtiot[0].capital}/>
    </>
  )
}


const valtionTiedot = (name,sisaltyvatValtiot) => {
  var maanFiltteri = function(sisaltyvatValtiot) {
    return sisaltyvatValtiot.name.toString().toLowerCase().includes(name.toString().toLowerCase())
  }
  var valiMuuttuja = sisaltyvatValtiot.filter(maanFiltteri)
  return (
    refresh(valiMuuttuja)
  )
}


export default Tulostus