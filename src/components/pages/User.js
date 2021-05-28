import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import Spinner from "../layout/Spinner"
import Repos from "../repos/Repos"

const User = ({ user, getUser, userRepos, getUserRepos, loading, match }) => {
  useEffect(() => {
    getUser(match.params.username)
    getUserRepos(match.params.username)
  }, []) // eslint-disable-line

  if (loading) {
    return <Spinner></Spinner>
  }

  return (
    <>
      <Link to='/' className='btn btn-light'>
        Back to Search
      </Link>
      Hireable:{" "}
      {user.hireable ? (
        <i className='fas fa-check text-success' />
      ) : (
        <i className='fas fa-times-circle text-danger' />
      )}
      <div className='card grid-2'>
        <div className='all-center'>
          <img
            src={user.avatar_url}
            alt=''
            className='round-img'
            style={{ width: "150px" }}
          />
          <h1>{user.name || user.login}</h1>
          <p>Location: {user.location}</p>
        </div>
        <div>
          {user.bio && (
            <>
              <h3>Bio</h3>
              <p>{user.bio}</p>
            </>
          )}
          <a href={user.html_url} className='btn btn-dark my-1'>
            Visit GitHub Profile
          </a>
          <ul>
            <li>
              {user.login && (
                <>
                  <b>Username: </b>
                  {user.login}
                </>
              )}
            </li>
            <li>
              {user.company && (
                <>
                  <b>Company: </b>
                  {user.company}
                </>
              )}
            </li>
            <li>
              {user.blog && (
                <>
                  <b>Blog: </b>
                  {user.blog}
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className='card text-center'>
        <div className='badge badge-primary'>Followers: {user.followers}</div>
        <div className='badge badge-success'>Following: {user.following}</div>
        <div className='badge badge-light'>Public Repositories: {user.public_repos}</div>
        <div className='badge badge-dark'>Public Gists: {user.public_gists}</div>
      </div>
      <Repos userRepos={userRepos} />
    </>
  )
}

User.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object.isRequired,
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  userRepos: PropTypes.array.isRequired,
}

export default User
