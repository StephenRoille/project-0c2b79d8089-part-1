import axios from "axios"
import { useState } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./App.css"
import Navbar from "./components/layout/Navbar"
import Users from "./components/users/Users"
import Alert from "./components/layout/Alert"
import Search from "./components/users/Search"
import About from "./components/pages/About"
import User from "./components/pages/User"
import GithubState from "./context/github/GithubState"

const App = () => {
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [userRepos, setUserRepos] = useState([])
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState(null)

  const CLIENT_SECRET = process.env.REACT_APP_GITHUB_TOKEN

  const searchUsers = async (username) => {
    const URL = `https://api.github.com/search/users?q=${username}`
    setLoading(true)
    const res = await axios.get(URL, {
      headers: { Authorization: "Bearer " + CLIENT_SECRET },
    })
    console.log(res.data.items)
    setUsers(res.data.items)
    setLoading(false)
  }

  const getUser = async (username) => {
    const URL = `https://api.github.com/users/${username}`
    setLoading(true)
    const res = await axios.get(URL, {
      headers: { Authorization: "Bearer " + CLIENT_SECRET },
    })
    setUser(res.data)
    setLoading(false)
  }

  const getUserRepos = async (username) => {
    const URL = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    setLoading(true)
    const res = await axios.get(URL, {
      headers: { Authorization: "Bearer " + CLIENT_SECRET },
    })
    setUserRepos(res.data)
    setLoading(false)
  }

  const showAlert = (msg, type) => {
    setAlert({ msg: msg, type: type })
    setTimeout(() => setAlert(null), 5000)
  }

  return (
    <GithubState>
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={() => (
                  <>
                    <Search
                      searchUsers={searchUsers}
                      clearUsers={() => setUser([])}
                      showClear={users.length > 0}
                      showAlert={showAlert}
                    />
                    <Users loading={loading} users={users} />
                  </>
                )}
              />
              <Route path='/about' component={About} />
              <Route
                path='/user/:username'
                render={(props) => (
                  <User
                    {...props}
                    getUser={getUser}
                    user={user}
                    getUserRepos={getUserRepos}
                    userRepos={userRepos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  )
}

export default App
