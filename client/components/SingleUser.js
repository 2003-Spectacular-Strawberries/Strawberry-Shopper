import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUser} from '../redux/user.js'
// import {Navbar} from './components'
// import Routes from './routes'

export class SingleUser extends React.Component {
  async componentDidMount() {
    if (this.props.fetchUser) {
      try {
        console.log('>>>>', this.props.match.params.id)
        await this.props.fetchUser(this.props.match.params.id)
      } catch (err) {
        console.log(err)
      }
    }
  }

  render() {
    return this.props.user.id ? (
      <div className="single-user" key={this.props.user.id}>
        <h1>{this.props.user.email}</h1>
        <img src={this.props.user.imageUrl} alt="" />
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
    fetchUser: id => dispatch(fetchUser(id))
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
