import React, { useState } from "react"
import PropTypes from "prop-types"

const Search = ({ clearUsers, showClear, showAlert, searchUsers }) => {
  const [username, setUsername] = useState("")

  const onClick = (event) => {
    event.preventDefault()
    if (username === "") {
      showAlert("Please enter a valid name", "light")
    } else {
      searchUsers(username)
    }
  }

  return (
    <div>
      <form className='form'>
        <input
          type='text'
          name='username'
          placeholder='Search Users...'
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <button type='submit' className='btn btn-dark btn-block' onClick={onClick}>
          Search
        </button>

        {showClear && (
          <button
            type='submit'
            className='btn btn-light btn-block'
            style={{ marginTop: "8px" }}
            onClick={clearUsers}
          >
            Clear
          </button>
        )}
      </form>
    </div>
  )
}

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showAlert: PropTypes.func.isRequired,
}

export default Search
