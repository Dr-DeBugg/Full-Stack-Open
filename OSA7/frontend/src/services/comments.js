import axios from 'axios'

const baseUrl = '/api/blogs'

const create = async (id, newObject) => {

  const response = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  return response.data
}

export default { create }