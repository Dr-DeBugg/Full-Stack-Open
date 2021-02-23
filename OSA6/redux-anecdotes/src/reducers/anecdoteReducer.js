import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {

  switch(action.type){
    case 'VOTE':
      const id = action.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange, votes: anecdoteToChange.votes + 1
      }
      state = state.map(anec => anec.id !== id ? anec : changedAnecdote)
      state = state.sort(function compareLikes(a, b) {return b.votes - a.votes})
      return state
    case 'NEW_ANECDOTE':
      state = state.concat(action.data)
      return state
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const createVote = (id) => {
  return async dispatch => {
    await anecdoteService.update(id)
    dispatch({
      type : 'VOTE', id: id
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes,
    })
  }
}

export default reducer