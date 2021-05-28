import React, { Component } from "react"
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import Spinner from "../layout/Spinner"
import Repos from "../repos/Repos"

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.username)
    this.props.getUserRepos(this.props.match.params.username)
  }

  static propTypes = {
    loading: PropTypes.bool,
    user: PropTypes.object.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
    userRepos: PropTypes.array.isRequired,
  }

  render() {
    const user = this.props.user
    const userRepos = this.props.userRepos
    if (this.props.loading) {
      return <Spinner></Spinner>
    }
    console.log(userRepos)
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
          <div className='badge badge-light'>
            Public Repositories: {user.public_repos}
          </div>
          <div className='badge badge-dark'>Public Gists: {user.public_gists}</div>
        </div>
        <Repos userRepos={userRepos} />
      </>
    )
  }
}

export default User