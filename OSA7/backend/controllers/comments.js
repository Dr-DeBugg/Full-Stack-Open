// const commentsRouter = require('express').Router()
// const Comment = require('../models/comment')

// commentsRouter.get(':id/comments', async (request, response) => {
//   console.log('we try to get')
//   const comments = await Comment.find({})
//   response.json(comments.map(c => c.toJSON()))
// })

// commentsRouter.post(':id/comments', async (request, response, next) => {
//   console.log('we try to post')
//   try {
//     const body = request.body
//     if (body.content === undefined) {
//       return response.status(400).json({ error: 'content missing!' })
//     }

//     const comment = new Comment({
//       content: body.content
//     })

//     const savedComment = await comment.save()

//     response.json(savedComment)
//   } catch (exception) {
//     next(exception)
//   }
// })

// module.exports = commentsRouter
