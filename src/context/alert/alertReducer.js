import { DEL_ALERT, SET_ALERT } from "../types"

const alertReducer = (state, action) => {
  switch (action.type) {
    case DEL_ALERT:
      return null
    case SET_ALERT:
      return action.payload
    default:
      return state
  }
}

export default alertReducer
