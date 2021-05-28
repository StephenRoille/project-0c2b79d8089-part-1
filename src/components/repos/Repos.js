import React from "react"
import PropTypes from "prop-types"
import RepoItem from "./RepoItem"

const Repos = ({ userRepos }) => {
  return userRepos.map((repo) => <RepoItem key={repo.id} repo={repo} />)
}

Repos.propType = {
  userRepos: PropTypes.array.isRequired,
}

export default Repos
