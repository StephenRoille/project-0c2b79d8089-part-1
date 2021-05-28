import React, { Component } from "react"
import PropTypes from "prop-types"

export class Search extends Component {
  state = {
    username: "",
  }

  static propTypes = {
    searchUsers: PropTypes.func.isRequired,
    clearUsers: PropTypes.func.isRequired,
    setAlert: PropTypes.func.isRequired,
  }

  onChange = (event) => this.setState({ [event.target.name]: event.target.value })
  searchUsers = (event) => {
    event.preventDefault()
    if (this.state.username === "") {
      this.props.setAlert("Please enter a valid name", "light")
    } else {
      this.props.searchUsers(this.state.username)
    }
  }

  render() {
    return (
      <div>
        <form className='form'>
          <input
            type='text'
            name='username'
            placeholder='Search Users...'
            value={this.state.username}
            onChange={this.onChange}
          />
          <button
            type='submit'
            className='btn btn-dark btn-block'
            onClick={this.searchUsers}
          >
            Search
          </button>
          {this.props.showClear && (
            <button
              type='submit'
              className='btn btn-light btn-block'
              onClick={this.props.clearUsers}
            >
              Clear
            </button>
          )}
        </form>
      </div>
    )
  }
}

export default Search
