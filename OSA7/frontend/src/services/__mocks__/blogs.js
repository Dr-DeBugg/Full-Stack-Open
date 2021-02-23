const blogs = [
  {
    url: "hmm",
    title: "hmm",
    author: "hmm",
    likes: 120,
    user: {
      username: "booboo",
      name: "Mrs. Mystery",
      id: "5d665ac4e359d342b4ff720a"
    },
    id: "5da471124a756833f4462ece"
  },
    {
    url: "santerinBlogi",
    title: "snattu",
    author: "santtu",
    likes: 5,
    user:{
      username: "gladienlol",
      name: "Mr. Mystery",
      id: "5d665ae4e359d342b4ff720b"
    },
    id: "5dc91a621a24792378cacd9b"
  }
]
const getAll = () => {
  return Promise.resolve(blogs)
}
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

export default { getAll, setToken }
