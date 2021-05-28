import React, { useState, useContext } from "react"

// contexts
import GithubContext from "../../context/github/githubContext"
import AlertContext from "../../context/alert/alertContext"

const Search = () => {
  const githubContext = useContext(GithubContext)
  const alertContext = useContext(AlertContext)

  const [username, setUsername] = useState("")

  const onClick = (event) => {
    event.preventDefault()
    if (username === "") {
      alertContext.showAlert("Please enter a username name", "light")
    } else {
      githubContext.searchUsers(username)
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

        {githubContext.users.length > 0 && (
          <button
            type='submit'
            className='btn btn-light btn-block'
            style={{ marginTop: "8px" }}
            onClick={githubContext.clearUsers}
          >
            Clear
          </button>
        )}
      </form>
    </div>
  )
}

export default Search
