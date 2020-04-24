import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers, removeUser, deleteUser} from '../store/allUsers'
import axios from 'axios'
// import {User} from '../../server/db/models'

//make sure that the user information is protected when it is sent.

export class AllUsers extends React.Component {
  constructor() {
    super()
    this.removeUser = this.removeUser.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.fetchUsers()
    } catch (err) {
      console.log(err)
    }
  }

  async removeUser(id) {
    try {
      await axios.delete(`/api/users/${id}`)
      this.props.removeUser(id)
    } catch (err) {
      console.log(err)
    }
  }

  async handleSubmit(id) {
    if (this.props.deleteUser) {
      try {
        await this.props.deleteUser(id)
      } catch (err) {
        console.log(err)
      }
    }
  }

  render() {
    return (
      <div className="all-users-container">
        <div className="all-users">
          {this.props.users && this.props.users.length > 0 ? (
            this.props.users.map(user => {
              return (
                <div key={user.id} className="single-user">
                  <Link
                    to={`/singleuser/${user.id}`}
                    className="single-user-link"
                  >
                    <h2>
                      {user.firstName} {user.lastName}
                    </h2>
                    <img src={user.imageUrl} alt="" className="user-image" />
                    <h2>{user.email}</h2>
                  </Link>
                  <button
                    type="submit"
                    onClick={() => this.handleSubmit(user.id)}
                  >
                    Delete User
                  </button>
                </div>
              )
            })
          ) : (
            <h3>No Users</h3>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    users: state.users,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUsers: id => dispatch(fetchUsers(id)),
    removeUser: id => dispatch(removeUser(id)),
    deleteUser: id => dispatch(deleteUser(id))
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
