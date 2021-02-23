import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = { content, votes: 0 }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id) => {
  const preUpdate = await axios.get(baseUrl)
  const anecToUpdate = preUpdate.data.find(anec => anec.id === id)
  const updatedAnecdote = {...anecToUpdate, votes: anecToUpdate.votes + 1}
  return axios.put(`${baseUrl}/${id}`, updatedAnecdote)
}

export default { getAll, createNew, update}