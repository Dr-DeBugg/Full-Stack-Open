const initialState = {
  notification: '',
  timeToShow: 0
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    // case 'SET_NOTIFICATION':
    //   return action.notification
    case 'SET_NOTIFICATION':
      return { notification: action.notification, timeToShow: action.timeToShow }
    case 'CLEAR_NOTIFICATION':
      return state = {}
    default:
      return state
  }
}

export const notificationChange = (notification, timeToShow) => {
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, timeToShow=timeToShow * 1000)
  }
}

export default notificationReducer