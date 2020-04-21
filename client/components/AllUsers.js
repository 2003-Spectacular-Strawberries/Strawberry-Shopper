import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {setUsers, fetchUsers, removeUser} from '../redux/students.js'
import axios from 'axios'
// import {User} from '../../server/db/models'

//make sure that the user information is protected when it is sent.

const testArrayOfUsers = [
  {
    name: 'Mike',
    email: 'mike@gmail.com',
    password: 123,
    imageUrl: null,
    id: 1
  },
  {
    name: 'Dan',
    email: 'dan@gmail.com',
    password: 123,
    imageUrl: null,
    id: 2
  },

  {
    name: 'Pete',
    email: 'pete@gmail.com',
    password: 123,
    imageUrl: null,
    id: 3
  }
]

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

  async deleteUser(id) {
    try {
      await axios.delete(`/api/users/${id}`)
      this.props.removeUser(id)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="all-users">
        <div className="all-users-container">
          {this.props.users && this.props.users.length > 0 ? (
            this.props.users.map(user => {
              return (
                <div className="single-product" key={user.id}>
                  <Link to={`/singleuser/${user.id}`}>
                    {user.name}
                    <img src={user.imageUrl} alt="" />
                  </Link>
                  <h1>{user.name}</h1>
                  <h2>{user.email}</h2>
                  <p>{user.id}</p>)
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
    users: state.users
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    removeUser: id => dispatch(removeUser(id))
  }
}

export default connect(mapState, mapDispatch)(AllUsers)
