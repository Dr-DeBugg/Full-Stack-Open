import React from 'react';
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const good = () => {
    store.dispatch({
      type: 'GOOD'
    })
  }
  const neutraali = () => {
    store.dispatch({
      type: 'OK'
    })
  }
  const huono = () => {
    store.dispatch({
      type: 'BAD'
    })
  }
  const nollaa = () => {
    store.dispatch({
      type: 'ZERO'
    })
  }

  return (
    <div>
      <button onClick={good}>hyvä</button> 
      <button onClick={neutraali}>neutraali</button> 
      <button onClick={huono}>huono</button>
      <button onClick={nollaa}>nollaa tilastot</button>
      <div>hyvä {store.getState().good}</div>
      <div>neutraali {store.getState().ok}</div>
      <div>huono {store.getState().bad}</div>
    </div>
  )
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('root'))
}

renderApp()
store.subscribe(renderApp)
