import React, { useContext } from "react"

// context
import AlertContext from "../../context/alert/alertContext"

export const Alert = () => {
  const alertContext = useContext(AlertContext)
  if (alertContext.alert !== null) {
    return (
      <div className={`alert alert-${alertContext.alert.type}`}>
        <i className='fas fa-info-circle' /> {alertContext.alert.msg}
      </div>
    )
  }

  return null
}

export default Alert
