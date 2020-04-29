import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Confirmation = props => {
  return (
    <div className="confirmation">
      {props.user.firstName ? (
        <h3>Thank you for your order, {props.user.firstName}!</h3>
      ) : (
        <h3>Thank you for your order, Guest!</h3>
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

export default connect(mapState)(Confirmation)
