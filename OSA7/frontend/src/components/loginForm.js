import React from 'react'
import { useDispatch } from 'react-redux'
import { createNotification } from '../reducers/blogReducer'
import  { useField } from '../hooks'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from '../components/notification'
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
  font-family:verdana;
`

const Input = styled.input`
margin: 0.4em;
`

const LoginForm = ({ setUser }) => {

  const usernameField = useField('text')
  const passwordField = useField('password')
  const dispatch = useDispatch()

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
      dispatch(createNotification('Wrong username or password','red'))
    }
  }

  return (
    <Page>
      <form onSubmit={handleLogin}>
        <h2>Log in to application</h2>
        <Notification/>
        <div>
          username
          <Input {...usernameField}/>
        </div>
        <div>
          password
          <Input {...passwordField} autoComplete="on"/>
        </div>
        <Buttoni type="submit">login</Buttoni>
      </form>
    </Page>
  )
}

export default LoginForm