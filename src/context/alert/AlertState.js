import { useReducer } from "react"
import AlertContext from "./alertContext"
import AlertReducer from "./alertReducer"
import { SET_ALERT, DEL_ALERT } from "../types"

const AlertState = (props) => {
  const initialState = null
  const [state, dispatch] = useReducer(AlertReducer, initialState)

  const showAlert = (msg, type) => {
    dispatch({ type: SET_ALERT, payload: { msg: msg, type: type } })
    setTimeout(() => dispatch({ type: DEL_ALERT }), 5000)
  }

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        showAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  )
}

export default AlertState
