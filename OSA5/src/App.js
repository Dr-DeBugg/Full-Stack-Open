import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import AddBlogForm from './components/addBlogForm'
import loginService from './services/login'
import Notification from './components/notification'
import  { useField } from './hooks'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('') // eslint-disable-line no-unused-vars
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [color, setColor] = useState(null)
  const [loginVisible, setLoginVisible] = useState(false)
  const usernameField = useField('text')
  const passwordField = useField('password')

  const urlField = useField('url')
  const authorField = useField('name')
  const titleField = useField('text')

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        initialBlogs.sort(compareLikes)
        setBlogs(initialBlogs)
      })
  }, [])

  function compareLikes(a, b) {
    return b.likes - a.likes
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const username = usernameField.value
      const password = passwordField.value
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      usernameField.palautareset.reset()
      passwordField.palautareset.reset()
    } catch (exception) {
      console.log(exception)
      setColor('red')
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id} blog={blog}
      setBlogs={setBlogs} user={user}
    />)


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>Log in to application</h2>
      <Notification message={errorMessage} color={color}/>
      <div>
        username
        <input {...usernameField}/>
      </div>
      <div>
        password
        <input {...passwordField} autoComplete="on"/>
      </div>
      <button type="submit">login</button>
    </form>
  )

  const addBlogForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>show Add blog</button>
        </div>
        <div style={showWhenVisible}>
          <AddBlogForm
            addBlog={addBlog}
            url={urlField}
            title={titleField}
            author={authorField}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    )
  }

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
        setColor('green')
        setErrorMessage(`A new blog ${blogObject.title} by ${blogObject.author} was added`)
        setNewBlog('')
        urlField.palautareset.reset()
        authorField.palautareset.reset()
        titleField.palautareset.reset()
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const Button = ({ handleClick, text }) => {
    return (
      <button onClick={handleClick}>
        {text}
      </button>
    )
  }
  if (user === null) {
    return (
      <div>
        {loginForm()}
      </div>
    )
  }

  else {
    return (
      <div>
        <p>{user.name} logged in <Button handleClick={() => window.localStorage.removeItem('loggedNoteappUser')} text="logout" /></p>
        <Notification message={errorMessage} color={color}/>
      <>{addBlogForm()}</>
      <h2>blogs</h2>
      {rows()}
      </div>
    )
  }
}

export default App