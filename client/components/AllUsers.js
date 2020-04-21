import React from 'react'
// import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {Navbar} from './components'
// import Routes from './routes'
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

class AllUsers extends React.Component {
  render() {
    console.log('!!!!!!!!!')
    return (
      <div className="all-users">
        <div className="all-users-container">
          {testArrayOfUsers.map(user => {
            return (
              <div className="single-user" key={user.id}>
                {/* <Link to={`/singleuser/${user.id}`}>{user.name}</Link>
                <Link to="/singleuser/id">
                  <img src={testArrayOfUsers.imageUrl} alt="" />
                </Link> */}
                <h1>{user.name}</h1>
                <h2>{user.email}</h2>
                <p>{user.id}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default AllUsers
