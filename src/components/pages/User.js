import React, { useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import Spinner from "../layout/Spinner"
import Repos from "../repos/Repos"
import GithubContext from "../../context/github/githubContext"

const User = (props) => {
  const githubContext = useContext(GithubContext)
  useEffect(() => {
    githubContext.getUser(props.match.params.username)
    githubContext.getUserRepos(props.match.params.username)
  }, []) // eslint-disable-line

  if (githubContext.loading) {
    return <Spinner></Spinner>
  }
  const { user } = githubContext
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
          <a
            href={user.html_url}
            className='btn btn-dark my-1'
            target='_blank'
            rel='noreferrer'
          >
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
                  <a href={user.blog} target='_blank' rel='noreferrer'>
                    {user.blog}
                  </a>
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
      <Repos userRepos={githubContext.userRepos} />
    </>
  )
}

export default User
