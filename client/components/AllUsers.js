import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUsers, removeUser} from '../store/allUsers'
import axios from 'axios'
// import {User} from '../../server/db/models'

//make sure that the user information is protected when it is sent.

export class AllUsers extends React.Component {
  constructor() {
    super()
    this.removeUser = this.removeUser.bind(this)
  }

  async componentDidMount() {
    if (this.props.fetchUsers) {
      try {
        await this.props.fetchUsers()
      } catch (err) {
        console.log(err)
      }
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

  render() {
    return (
      <div className="all-users-container">
        <div className="all-users">
          {this.props.users && this.props.users.length > 0 ? (
            this.props.users.map(user => {
              return (
                <div key={user.id}>
                  <Link to={`/singleuser/${user.id}`} className="single-user">
                    <img src={user.imageUrl} alt="" className="user-image" />
                    <h2>{user.email}</h2>
                  </Link>
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
    fetchUsers: () => dispatch(fetchUsers()),
    removeUser: id => dispatch(removeUser(id))
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
