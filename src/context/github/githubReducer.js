import {
  SEARCH_USERS,
  SET_LOADING,
  CLEAR_USERS,
  GET_USER,
  GET_USER_REPOS,
} from "../types"

const gitHubReducer = (state, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.payload, loading: false }
    case GET_USER_REPOS:
      return { ...state, userRepos: action.payload, loading: false }
    case SET_LOADING:
      return { ...state, loading: true }
    case SEARCH_USERS:
      return { ...state, users: action.payload, loading: false }
    case CLEAR_USERS:
      return { ...state, users: [], loading: false }
    default:
      return state
  }
}

export default gitHubReducer
