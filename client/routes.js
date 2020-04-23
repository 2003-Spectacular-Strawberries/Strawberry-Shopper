import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Cart,
  Login,
  Signup,
  UserHome,
  AllProducts,
  SingleProduct,
  SingleUser,
  NewProduct,
  AllUsers,
  AdminPage
} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn, isAdmin} = this.props
    console.log(this.props)
    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/allproducts" component={AllProducts} />
        <Route exact path="/singleproduct/:id" component={SingleProduct} />
        <Route exact path="/cart" component={Cart} />
        {isLoggedIn &&
          !isAdmin && (
            <Switch>
              {/* Routes placed here are only available to regular users after logging in */}
              <Route path="/home" component={UserHome} />
              <Route exact path="/allproducts" component={AllProducts} />
              <Route
                exact
                path="/singleproduct/:id"
                component={SingleProduct}
              />
              <Route exact path="/singleuser" component={SingleUser} />
              <Route exact path="/cart" component={Cart} />
            </Switch>
          )}
        {isLoggedIn &&
          isAdmin && (
            <Switch>
              {/* Routes placed here are only available to admins after logging in */}
              <Route path="/home" component={UserHome} />
              <Route exact path="/allusers" component={AllUsers} />
              <Route exact path="/allproducts" component={AllProducts} />
              <Route
                exact
                path="/singleproduct/:id"
                component={SingleProduct}
              />
              <Route exact path="/singleuser" component={SingleUser} />
              <Route exact path="/singleuser/:id" component={SingleUser} />
              <Route exact path="/newproduct" component={NewProduct} />
              <Route exact path="/cart" component={Cart} />
              <Route exact path="/admin" component={AdminPage} />
            </Switch>
          )}
        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
