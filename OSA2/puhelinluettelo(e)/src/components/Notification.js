import React from 'react'

const Notification = ({message, color}) => {
  if (message === null) {
    return null
  }
  if (color === null){
    return (
      <div className="error">
        {message}
      </div>
    )
  }
  else {
  return (
    <div className="error" style={{ color: color }}>
      {message}
    </div>
  )
  }
}

export default Notification