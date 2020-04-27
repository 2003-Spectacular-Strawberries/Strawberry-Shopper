import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn, isAdmin, user}) => (
  <div className="navbar-container">
    <h1 className="navbar-header">Strawberry Shopper</h1>

    <nav>
      {isLoggedIn && isAdmin ? (
        <div className="navbar-logged">
          {/* The navbar will show these links after you log in */}
          <div className="navbar-left">
            <Link to="/home" className="nav-item">
              Home
            </Link>
            <Link to="/allproducts" className="nav-item">
              All Products
            </Link>
            <Link to="/allusers" className="nav-item">
              All Users
            </Link>
            <Link to="/manage-products" className="nav-item">
              Manage Products{' '}
            </Link>
          </div>

          <div className="navbar-right">
            <Link to="/singleuser" className="nav-item">
              Account
            </Link>
            <Link to="/cart" className="nav-item">
              {user.firstName}'s Cart
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : isLoggedIn && !isAdmin ? (
        <div className="navbar-logged">
          {/* The navbar will show these links after you log in */}
          <div className="navbar-left">
            <Link to="/home" className="nav-item">
              Home
            </Link>
            <Link to="/allproducts" className="nav-item">
              All Products
            </Link>
          </div>

          <div className="navbar-right">
            <Link to="/singleuser" className="nav-item">
              Account
            </Link>
            <Link to="/cart" className="nav-item">
              {user.firstName}'s Cart
            </Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        </div>
      ) : (
        <div className="navbar-logged">
          {/* The navbar will show these links before you log in */}
          <div className="navbar-left">
            <Link to="/home" className="nav-item">
              Home
            </Link>
            <Link to="/allproducts" className="nav-item">
              All Products
            </Link>
          </div>

          <div className="navbar-right">
            <Link to="/cart" className="nav-item">
              Guest Cart
            </Link>
            <Link to="/login" className="nav-item">
              Login
            </Link>
            <Link to="/signup" className="nav-item">
              Sign Up
            </Link>
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
    isAdmin: !!state.user.isAdmin,
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
