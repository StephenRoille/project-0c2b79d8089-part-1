import React from "react"

export const Alert = ({ alert }) => {
  if (alert !== null) {
    return (
      <div className={`alert alert-${alert.type}`}>
        <i className='fas fa-info-circle' />
        {alert.msg}
      </div>
    )
  }

  return null
}

export default Alert
