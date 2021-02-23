import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
    )
  }

const Vote = (props) => {
  array[props.selected] += 1
  refresh()
  SuosituinAnek()
  }

  const refresh = () => {
    ReactDOM.render(<App anecdotes={anecdotes} array={array}/>, 
    document.getElementById('root'))
  }

  const SuosituinAnek = () => {
    let IsoIndeksi = 0

    for (let index = 0; index < array.length; index++) {

      if(array[index] > array[IsoIndeksi]){
      IsoIndeksi = index
      }
    }
    return(
      <div>
        <h1>Anecdote with most votes</h1>
        {anecdotes[IsoIndeksi]} <br />
        has {array[IsoIndeksi]} votes <br />
      </div>
    )
  }

const App = (props) => {

  const [selected, setSelected] = useState(0)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}<br />
      Has {array[selected]} votes <br />
      <Button handleClick={() => Vote({selected, array})} text="vote"  />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * 6))} text="next anecdote"/>
      <SuosituinAnek/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const array = Array(6).fill(0)


ReactDOM.render(
  <App anecdotes={anecdotes} array={array}/>,
  document.getElementById('root')
)