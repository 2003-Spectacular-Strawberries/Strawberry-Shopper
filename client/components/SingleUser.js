import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUser, deleteUser} from '../store/singleUser.js'

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
    console.log(this.props)
    return this.props.singleUser.id ? (
      <div className="single-user" key={this.props.singleUser.id}>
        <h1>{`${this.props.singleUser.firstName} ${
          this.props.singleUser.lastName
        }`}</h1>
        <img
          src={this.props.singleUser.imageUrl}
          alt=""
          className="user-image"
        />
        <h3>{this.props.singleUser.email}</h3>
        <button type="submit" onClick={this.handleSubmit}>
          Delete User
        </button>
      </div>
    ) : this.props.user.id ? (
      <div key={this.props.user.id} className="account">
        <h1>Your Account</h1>
        <p>Name:</p>
        <p>{`${this.props.user.firstName} ${this.props.user.lastName}`}</p>
        <p>Email:</p>
        <p>{`${this.props.user.email}`}</p>
        <p>Avatar:</p>
        <img src={this.props.user.imageUrl} alt="" className="user-image" />
        <p>Password:</p>
        <p>*********</p>
      </div>
    ) : (
      <h3>No User</h3>
    )
  }
}

const mapState = state => {
  return {
    singleUser: state.singleUser,
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
