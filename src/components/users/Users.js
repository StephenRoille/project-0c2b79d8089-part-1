import React, { useContext } from "react"
import UserItem from "./UserItem"
import Spinner from "../layout/Spinner"

// contexts
import GithubContext from "../../context/github/githubContext"

const Users = () => {
  const githubContext = useContext(GithubContext)

  if (githubContext.loading) {
    return <Spinner />
  }

  return (
    <ul style={userStyle}>
      {githubContext.users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </ul>
  )
}

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
}

export default Users
