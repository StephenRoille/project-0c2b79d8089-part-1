import axios from "axios"
import { useReducer } from "react"
import GithubContext from "./githubContext"
import GithubReducer from "./githubReducer"
import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USERS,
  GET_USER_REPOS,
} from "../types"

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    userRepos: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(GithubReducer, initialState)

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        userRepos: state.userRepos,
        loading: state.loading,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  )
}

export default GithubState
