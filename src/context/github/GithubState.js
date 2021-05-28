import axios from "axios"
import { useReducer } from "react"
import GithubContext from "./githubContext"
import GithubReducer from "./githubReducer"
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_USER_REPOS,
} from "../types"

let CLIENT_TOKEN
if (process.env.NODE_ENV === "production") {
  CLIENT_TOKEN = process.env.GITHUB_TOKEN
} else {
  CLIENT_TOKEN = process.env.REACT_APP_GITHUB_TOKEN
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    userRepos: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(GithubReducer, initialState)

  const searchUsers = async (username) => {
    dispatch({ type: SET_LOADING })
    const URL = `https://api.github.com/search/users?q=${username}`
    const res = await axios.get(URL, {
      headers: { Authorization: `token ${CLIENT_TOKEN}` },
    })
    dispatch({ type: SEARCH_USERS, payload: res.data.items })
  }

  const clearUsers = () => dispatch({ type: CLEAR_USERS })

  const getUser = async (username) => {
    dispatch({ type: SET_LOADING })
    const URL = `https://api.github.com/users/${username}`
    const res = await axios.get(URL, {
      headers: { Authorization: `token ${CLIENT_TOKEN}` },
    })
    dispatch({ type: GET_USER, payload: res.data })
  }

  const getUserRepos = async (username) => {
    dispatch({ type: SET_LOADING })
    const URL = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    const res = await axios.get(URL, {
      headers: { Authorization: `token ${CLIENT_TOKEN}` },
    })
    dispatch({ type: GET_USER_REPOS, payload: res.data })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        userRepos: state.userRepos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState
