import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'
import  { useField } from '../hooks/index'
import {
  useParams, withRouter, Link
} from 'react-router-dom'
import commentService from '../services/comments'
import styled from 'styled-components'

const Blogi = styled.div`
  padding: 1em;
  border: solid;
  borderWidth: 1em;
  textAlign: center;
  background: gainsboro;
  font-size: 1em;
  font-family: "Arial Black", Gadget, sans-serif;
`

const Blog = ({ blog }) => {

  return (
      <>
        <Blogi>
          <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author} </Link>
        </Blogi>
    </>)}


const BlogInfoo = ({ blogs, user, setBlogs, history  }) => {

  const commentField = useField('text')
  const id = useParams().id
  const blog = blogs.find(b => b.id === id)

  const plusLike = () => {
    const blogObject = {
      user: blog.user,
      likes: blog.likes+1,
      url: blog.url,
      title: blog.title,
      author: blog.author
    }
    const id = blog.id
    blogService
      .update(id,blogObject)
      .then(() => blogService.getAll()
        .then(initialBlogs => {
          setBlogs(initialBlogs)}))
  }

  const Button = ({ handleClick, text }) => {
    if (text === 'remove' && user.username !== blog.user.username){
      return(
        <></>
      )
    }
    return (
      <button onClick={handleClick}>
        {text}
      </button>
    )
  }
  Button.propTypes = {
    text: PropTypes.string.isRequired,
    handleClick: PropTypes.func.isRequired
  }

  const bloginPoisto = () => {

    const result = window.confirm('Haluatko varmasti poistaa tämän?')
    if (result){
      const id = blog.id
      blogService.poisto(id)
        .then(() => blogService.getAll()
          .then(initialBlogs =>
            setBlogs(initialBlogs)))
      history.push('/blogs')
    }
  }

  if(blog === undefined || blog.user.name === undefined){
    blogService.getAll()
      .then(initialBlogs =>
        setBlogs(initialBlogs))
  }

  if (!blog) {
    return null
  }
  return (
    <>
      <h2>{blog.title} {blog.author}</h2><br></br>
      {blog.url}<br></br>
      {blog.likes} likes <Button handleClick={() => plusLike()} text="like"/><br></br>
      added by {blog.user.name} <br></br>
      <Button handleClick={() => bloginPoisto()} text="remove"/>
      <br></br>
      <AddCommentForm setBlogs={setBlogs} blog={blog} commentField={commentField}></AddCommentForm>
      <PrintComments blog={blog}></PrintComments>
    </>
  )
}

const PrintComments = ({ blog }) => {
  return(
    <>
    <h3>comments</h3>
    <ul>
      {blog.comments.map(b =>
        <li key={b.id}>{b.comment}</li>
      )}
    </ul>
    </>
  )
}

const AddCommentForm = ({ commentField, blog, setBlogs }) => {

  let comment = commentField
  const id = blog.id

  const addComment = (event) => {
    event.preventDefault()

    const commentObject = {
      content: commentField.value
    }

    commentService
      .create(id, commentObject)
      .then(() =>
        commentField.palautareset.reset())
      .then(() => blogService.getAll()
        .then(initialBlogs => {
          setBlogs(initialBlogs)}))
  }

  return (
    <div>
      <form onSubmit={addComment}>
        <input
          {...comment}
        />
        <button type="submit">add comment</button>
      </form>
    </div>
  )
}

export const BlogInfo = withRouter(BlogInfoo)

export default withRouter(Blog)