import React from 'react'
import { connect } from 'react-redux'
import { createVote } from '../reducers/anecdoteReducer'
import { notificationChange } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {

const anecdotes = props.anecdote
const anecdotesFiltered = anecdotes.filter(anec =>
 anec.content.toLowerCase().includes(props.filter)).map(incl => incl)

const vote = ({anecdote}) => {
  props.createVote(anecdote.id)
  props.notificationChange(`you voted '${anecdote.content}'`, 5)
  // props.notificationChange(`You voted for "${anecdote.content}"`)
  // setTimeout(() => {
  //   props.notificationChange("")
  // }, 5000)
}

return (
  <div>
  {anecdotesFiltered.map(anecdote =>
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote({anecdote})}>vote</button>
      </div>
    </div>
  )}
</div>
)}

const mapDispatchToProps = {
  createVote,
  notificationChange,
}

const mapStateToProps = (state) => {
  return {
    anecdote: state.anecdote,
    filter: state.filter
  }
}

const ConnectedNotes = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)
export default ConnectedNotes
