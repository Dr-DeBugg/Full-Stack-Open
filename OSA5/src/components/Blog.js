import React, {useState} from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const Blog = ({blog, setBlogs, user}) => {

  const [visible, setVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibiity = () => {
    refreshBlogs()
    setVisible(!visible)
  }

  const Button = ({handleClick, text}) => {

    if (text === "remove" && user.username !== blog.user.username){
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
    setTimeout(() => {
      refreshBlogs()
    }, 200)
  }

 const refreshBlogs = () => {
    blogService.getAll()
    .then(initialBlogs => {
      initialBlogs.sort(
        function(a, b) {
          return b.likes - a.likes;
        }
      )
    setBlogs(initialBlogs)
    })
  }

const bloginPoisto = () => {

  const result = window.confirm("Haluatko varmasti poistaa tämän?");
  if (result){
  const id = blog.id
  blogService.poisto(id)
  }
}

  if (!visible) {
    return (
    <div style={blogStyle}>
     <div className="testDiv" onClick={() => toggleVisibiity()}>
        {blog.title} {blog.author}
      </div>
  </div>
  )
}
  else {
    return (
    <div style={blogStyle} onClick={() => toggleVisibiity()}>
        <p>{blog.title} {blog.author} <br></br>
        {blog.url}<br></br>
        {blog.likes} likes <Button handleClick={() => plusLike()} text="like"/><br></br>
        added by {blog.user.name} <br></br>
        <Button handleClick={() => bloginPoisto()} text="remove"/></p>
    </div>
    )}
  }

export default Blog