import React from "react"
import UserItem from "./UserItem"
import Spinner from "../layout/Spinner"
import PropTypes from "prop-types"

const Users = ({ loading, users }) => {
  if (loading) {
    return <Spinner />
  }

  return (
    <>
      <ul style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </ul>
    </>
  )
}

const userStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridGap: "1rem",
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
}

export default Users
