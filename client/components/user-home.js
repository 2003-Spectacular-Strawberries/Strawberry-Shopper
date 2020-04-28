import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const UserHome = props => {
  console.log(props)
  return (
    <div className="user-home">
      {props.user.firstName ? (
        <h3>Welcome, {props.user.firstName}!</h3>
      ) : (
        <h3>Welcome to Strawberry Shopper!</h3>
      )}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  firstName: PropTypes.string
}
