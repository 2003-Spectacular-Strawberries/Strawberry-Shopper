import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1 className="navbar-header">Strawberry Shopper</h1>

    <nav className="navbar">
      {isLoggedIn ? (
        <div className="navbar-logged">
          {/* The navbar will show these links after you log in */}
          <div className="navbar-left">
            <Link to="/home">Home</Link>
            <Link to="/allproducts">All Products</Link>
            <Link to="/allusers">All Users</Link>
            <Link to="/cart">Cart</Link>
          </div>

          <div className="navbar-right">
            <Link to="/cart">Cart</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="navbar-logged">
          {/* The navbar will show these links before you log in */}
          <div className="navbar-left">
            <Link to="/home">Home</Link>
            <Link to="/allproducts">All Products</Link>
            <Link to="/allusers">All Users</Link>
            <Link to="/cart">Cart</Link>
          </div>

          <div className="navbar-right">
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
