const jwt = require('jsonwebtoken')
const appRouter = require('express').Router()
const Blog = require('../models/blogDB')
const User = require('../models/user')
//huom
const extract = require('../utils/middleware')

// const getTokenFrom = request => {
//   const authorization = request.get('authorization')
//   if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
//     return authorization.substring(7)
//   }
//   return null
// }
appRouter.get('/', async (request, response) => {
  // const users = await User.find({})
  // response.json(users.map(u => u.toJSON()))

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, id: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

appRouter.post('', async (request, response, next) => {

  request = extract.tokenExtractor(request)
  const body = request.body
  // const token = getTokenFrom(request)

  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    if(body.title === undefined || body.url === undefined){
      return response.status(400).end()
    }
    if (body.likes === undefined){
      body.likes = 0
    }

    const blog = new Blog({
      url: body.url,
      title: body.title,
      author: body.author,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog.toJSON())

  } catch(exception) {
    next(exception)
  }
})

appRouter.delete('/:id', async (request, response, next) => {
  request = extract.tokenExtractor(request)
  try {

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    console.log(decodedToken)

    if (!request.token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    console.log(user)
    const blog = await Blog.findById(request.params.id)
    console.log(blog)

    if ( blog.user.toString() === user.id.toString() ){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }
  } catch(exception) {
    next(exception)
  }
})

appRouter.put('/:id', async (request, response, next) => {
  const body = request.body
  const blog = {
    likes: body.likes
  }
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.json(updatedBlog.toJSON())
  } catch (exception) {
    next(exception)
  }
})
module.exports = appRouter