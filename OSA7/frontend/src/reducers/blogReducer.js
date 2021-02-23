const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_NOTIFICATION':
    state = action.data
    return state
  default:
    return state
  }
}

export const createNotification = (messageMSG, color) => {
  return {
    type: 'NEW_NOTIFICATION',
    data: {
      messageMSG,
      color
    }
  }
}

export default blogReducer