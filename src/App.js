import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// styles
import "./App.css"

// pages
import _404 from "./components/pages/_404"
import About from "./components/pages/About"
import Home from "./components/pages/Home"
import User from "./components/pages/User"

// components
import Alert from "./components/layout/Alert"
import Navbar from "./components/layout/Navbar"

// contexts
import GithubState from "./context/github/GithubState"
import AlertState from "./context/alert/AlertState"

const App = () => {
  return (
    <GithubState>
      <AlertState>
        <Router>
          <div className='App'>
            <Navbar />
            <div className='container'>
              <Alert />
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/about' component={About} />
                <Route path='/user/:username' component={User} />
                <Route path='*' component={_404} />
              </Switch>
            </div>
          </div>
        </Router>
      </AlertState>
    </GithubState>
  )
}

export default App
