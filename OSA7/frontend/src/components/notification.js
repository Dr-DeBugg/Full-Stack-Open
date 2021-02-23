import React from 'react'
import { createNotification } from '../reducers/blogReducer'
import { useSelector, useDispatch } from 'react-redux'

const Notification = () => {

  const dispatch = useDispatch()
  const message = useSelector(state => state.messageMSG)
  const color = useSelector(state => state.color)

  function resetNotification() {
    setTimeout(() => {
      dispatch(createNotification('',''))
    }, 5000)
  }

  if (message === undefined) {
    return null
  }
  if (color === ''){
    return null
  }
  else {
    return (
      <div className="error" style={{ color: color }}>
        {message}
        {resetNotification()}
      </div>
    )
  }
}

export default Notification