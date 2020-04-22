import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchUser} from '../store/singleUser.js'

export class SingleUser extends React.Component {
  async componentDidMount() {
    if (this.props.fetchUser) {
      try {
        await this.props.fetchUser(this.props.match.params.id)
      } catch (err) {
        console.log(err)
      }
    }
  }

  render() {
    return this.props.singleUser.id ? (
      <div className="single-user" key={this.props.singleUser.id}>
        <h1>{this.props.singleUser.email}</h1>
        <img src={this.props.singleUser.imageUrl} alt="" />
      </div>
    ) : (
      <h3>No User</h3>
    )
  }
}

const mapState = state => {
  return {
    singleUser: state.singleUser
  }
}

const mapDispatch = dispatch => {
  return {
    fetchUser: id => dispatch(fetchUser(id))
  }
}

export default connect(mapState, mapDispatch)(SingleUser)
