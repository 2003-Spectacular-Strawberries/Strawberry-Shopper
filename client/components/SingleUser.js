import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUser, deleteUser} from '../store/user.js'

export class SingleUser extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  async componentDidMount() {
    if (this.props.fetchUser) {
      try {
        await this.props.fetchUser(this.props.match.params.id)
      } catch (err) {
        console.log(err)
      }
    }
  }

  async handleSubmit() {
    if (this.props.deleteUser) {
      try {
        await this.props.deleteUser(this.props.match.params.id)
      } catch (err) {
        console.log(err)
      }
    }
  }

  render() {
    return this.props.user.id ? (
      <div className="single-user" key={this.props.user.id}>
        <h1>{`${this.props.user.firstName} ${this.props.user.lastName}`}</h1>
        <img src={this.props.user.imageUrl} alt="" className="user-image" />
        <h3>{this.props.user.email}</h3>
        <button type="submit" onClick={this.handleSubmit}>
          Delete User
        </button>
      </div>
    ) : this.props.user.id ? (
      <div className="account-container">
        <div key={this.props.user.id} className="account">
          <h1>Your Account</h1>
          <div className="account-item">
            {' '}
            <p>Name:</p>
            <p>{`${this.props.user.firstName} ${this.props.user.lastName}`}</p>
          </div>
          <div className="account-item">
            <p>Email:</p>
            <p>{`${this.props.user.email}`}</p>
          </div>
          <div className="account-item">
            <p>Avatar:</p>
            <img src={this.props.user.imageUrl} alt="" className="user-image" />
          </div>
          <div className="account-item">
            <p>Password:</p>
            <p>*********</p>
          </div>
        </div>
      </div>
    ) : (
      <h3>No User</h3>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id)),
    deleteUser: id => dispatch(deleteUser(id))
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
