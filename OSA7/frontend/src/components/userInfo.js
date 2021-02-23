
import React from 'react'
import { Link, useParams } from 'react-router-dom'

const ShowUsers = ({ userInfo }) => {
  return(
      <>
    <table>
      <tbody>
        <tr>
          <td></td>
          <td>blogs created</td>
        </tr>
        {userInfo.map(user =>
          <tr key={user.id}>
            <td><Link to={`/users/${user.id}`}>{user.name}</Link></td>
            <td>{user.blogs.length}</td>
          </tr>)}
      </tbody>
    </table>
    </>
  )}

const User = ({ userInfo }) => {
  const id = useParams().id
  const user = userInfo.find(n => n.id === id)

  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(b =>
          <li key={b.id}>{b.title}</li>
        )}
      </ul>
    </div>
  )
}

export { ShowUsers, User }