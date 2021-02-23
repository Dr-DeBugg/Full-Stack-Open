import React, {useEffect} from 'react';
import {connect} from 'react-redux'
import NewAnecdote from './components/anecdoteForm'
import AnecdoteList from './components/anecdoteList'
import Notification from './components/Notification'
import Filter from './components/filter'
import {initializeAnecdotes} from './reducers/anecdoteReducer'

const App = (props) => {

  useEffect(() => {
    props.initializeAnecdotes()
  })

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <Notification/>
      <NewAnecdote/>
      <AnecdoteList/>
    </div>
  )
}

export default connect(null, { initializeAnecdotes })(App)