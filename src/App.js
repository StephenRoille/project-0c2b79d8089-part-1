import axios from "axios"
import { Component, Fragment } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

import "./App.css"
import Navbar from "./components/layout/Navbar"
import Users from "./components/users/Users"
import Alert from "./components/layout/Alert"
import Search from "./components/users/Search"
import About from "./components/pages/About"
import User from "./components/pages/User"

class App extends Component {
  state = {
    users: [],
    user: {},
    userRepos: [],
    loading: false,
    alert: null,
  }
  CLIENT_SECRET = process.env.REACT_APP_GITHUB_TOKEN

  searchUsers = async (username) => {
    const URL = `https://api.github.com/search/users?q=${username}`
    this.setState({ loading: true })
    const res = await axios.get(URL, {
      headers: { Authorization: "Bearer " + this.CLIENT_SECRET },
    })
    this.setState({ users: res.data.items, loading: false })
  }

  getUser = async (username) => {
    const URL = `https://api.github.com/users/${username}`
    this.setState({ loading: true })
    const res = await axios.get(URL, {
      headers: { Authorization: "Bearer " + this.CLIENT_SECRET },
    })
    this.setState({ user: res.data, loading: false })
  }

  getUserRepos = async (username) => {
    const URL = `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc`
    this.setState({ loading: true })
    const res = await axios.get(URL, {
      headers: { Authorization: "Bearer " + this.CLIENT_SECRET },
    })
    console.log("getUserRepos", res.data)
    this.setState({ userRepos: res.data, loading: false })
  }

  clearUsers = () => {
    this.setState({ users: [], loading: false })
  }

  setAlert = (msg, type) => {
    this.setState({ alert: { msg: msg, type: type } })
    setTimeout(() => this.setState({ alert: null }), 5000)
  }

  render() {
    const { users, user, userRepos, loading } = this.state
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={() => (
                  <>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0}
                      setAlert={this.setAlert}
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
                    getUser={this.getUser}
                    user={user}
                    getUserRepos={this.getUserRepos}
                    userRepos={userRepos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    )
  }
}

export default App
