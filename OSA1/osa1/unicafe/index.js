import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Statistics = ({text, numberi}) => {
  return (
    <>
    <td>{text}</td><td>{numberi}</td>
    </>
  )
}

const Button = ({handleClick, text}) => {
return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      <p>no feedback given</p>
      </div>
    )
  }

  return (
    <>
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h1>statistics</h1>
      </div>
      <table>
        <tbody>
      <tr><Statistics text="good" numberi={good}/></tr>
      <tr><Statistics text="neutral" numberi={neutral}/></tr>
      <tr><Statistics text="bad" numberi={bad}/></tr>
      <tr><Statistics text="all" numberi={bad + neutral + good}/></tr>
      <tr><Statistics text="average" numberi={((good*1.00) + (bad*(-1.00))) /(bad + neutral + good)}/></tr>
      <tr><Statistics text="positive" numberi={good / (bad + neutral + good) * 100.0 + " %"}/></tr>
      </tbody>
      </table>
      </>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)