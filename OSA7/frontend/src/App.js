import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { BlogInfo } from './components/Blog'
import blogService from './services/blogs'
import AddBlogComponents from './components/addBlogForm'
import userService from './services/users'
import Notification from './components/notification'
import LoginForm from './components/loginForm'
import { ShowUsers, User } from './components/userInfo'
import {
  BrowserRouter as Router, useHistory,
  Switch, Route, Link
} from 'react-router-dom'
import './index.css'
import styled from 'styled-components'

const Buttoni = styled.button`
background: Bisque;
font-size: 1em;
margin: 1em;
padding: 0.25em 1em;
border: 2px solid Chocolate;
border-radius: 3px;
`

const Page = styled.div`
  padding: 1em;
`

const Header = styled.h2`
  textDecoration: underline;
  font-size: 1.75em;
  color: lightCoral;
`
const Header2 = styled.h2`
  font-size: 1.25em;
  color: lightCoral;
`

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [userInfo, setUserInfo] = useState([])
  let history = useHistory()

  useEffect(() => {
    userService.getAllUsers()
      .then(allUsers =>
        setUserInfo(allUsers))
  }, [])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id} blog={blog} blogs={blogs}
      setBlogs={setBlogs} user={user}
    />)

  const Button = ({ handleClick, text }) => {
    return (
      <Buttoni onClick={handleClick}>
        {text}
      </Buttoni>
    )
  }

  const padding = {
    padding: 5,
    backgroundColor: 'grey'
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    window.location.reload(false)
  }

  if (user === null) {
    return (
      <div>
        <LoginForm setUser={setUser}></LoginForm>
      </div>
    )
  }
  else {
    return (
      <Page>
        <Router>
          <p style={padding}>
            <Link style={{ padding: 5 }} to="/blogs">blogs</Link>
            <Link style={{ padding: 5 }} to="/users">users</Link>
            {user.name} logged in <Button handleClick={() => logoutUser()}
              text="logout" /></p>
          <Notification></Notification>
          <Header>Blog App</Header>
          <Switch>

            <Route exact path="/">
              <AddBlogComponents blogs={blogs} setBlogs={setBlogs}></AddBlogComponents>
              <Header2>blogs</Header2>
              {rows()}
            </Route>

            <Route path="/users/:id">
              <User userInfo={userInfo}/>
            </Route>

            <Route path="/users">
              <h2>Users</h2>
              <ShowUsers userInfo={userInfo}></ShowUsers>
            </Route>

            <Route path="/blogs/:id">
              <BlogInfo blogs={blogs} user={user} setBlogs={setBlogs} history={history}></BlogInfo>
            </Route>

            <Route path="/blogs">
              <AddBlogComponents blogs={blogs} setBlogs={setBlogs}></AddBlogComponents>
              <Header2>blogs</Header2>
              {rows()}
            </Route>

          </Switch>
        </Router>
      </Page>
    )
  }
}

export default App