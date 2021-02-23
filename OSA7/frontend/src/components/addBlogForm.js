import React, { useState } from 'react'
import  { useField } from '../hooks'
import blogService from '../services/blogs'
import { createNotification } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'
import styled, { css } from 'styled-components'

const Button = styled.button`
  background: transparent;
  border-radius: 15px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${props => props.primary && css`
    background: palevioletred;
    color: white;
  `}
`

const Para = styled.p`
padding: 1em;
color: palevioletred;
borderWidth: 1em;
textAlign: center;
font-size: 1.25em;
font-family: "Arial Black", Gadget, sans-serif;
`

const H2 = styled.h2`
padding: 1em;
color: palevioletred;
borderWidth: 1em;
textAlign: center;
font-size: 1.6em;
font-family: "Arial Black", Gadget, sans-serif;
`


const AddBlogComponents = ({ setBlogs, blogs }) => {
// eslint-disable-next-line no-unused-vars
  const [newBlog, setNewBlog] = useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const urlField = useField('url')
  const authorField = useField('name')
  const titleField = useField('text')
  const dispatch = useDispatch()

  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      url: urlField.value,
      title: titleField.value,
      author: authorField.value
    }

    blogService
      .create(blogObject)
      .then(data => {
        setBlogs(blogs.concat(data))
        dispatch(createNotification(`A new blog ${blogObject.title} by ${blogObject.author} was added`,'green'))
        setNewBlog('')
        urlField.palautareset.reset()
        authorField.palautareset.reset()
        titleField.palautareset.reset()
      })
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button primary onClick={() => setLoginVisible(true)}>show Add blog</Button>
      </div>
      <div style={showWhenVisible}>
        <AddBlogForm
          addBlog={addBlog}
          url={urlField}
          title={titleField}
          author={authorField}
        />
        <Button onClick={() => setLoginVisible(false)}>cancel</Button>
      </div>
    </div>
  )
}

const Input = styled.input`
margin: 0.25em;
`

const AddBlogForm = (props) => {

  return (
    <div>
      <form onSubmit={props.addBlog}>
        <H2>Create a new blog</H2>
        <Para>url:
          <Input
            {...props.url}
          />
          <br></br>title:
          <Input
            {...props.title}
          />
          <br></br>author:
          <Input
            {...props.author}
          /></Para>
        <Button hover primary type="submit">save</Button>
      </form>
    </div>
  )
}


export default AddBlogComponents