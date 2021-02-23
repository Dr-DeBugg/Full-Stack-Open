import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(props.notification.notification === "" || props.notification.notification === undefined){
    return (<></>
    )
  }
  else {
    return (
      <div style={style}>
      {props.notification.notification}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    timeToShow: state.timeToShow,
    filter: state.filter,
    anecdote: state.anecdotes
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification