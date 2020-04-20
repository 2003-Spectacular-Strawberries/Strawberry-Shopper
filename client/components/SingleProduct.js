import React from 'react'
// import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
// import {Navbar} from './components'
// import Routes from './routes'

class SingleProduct extends React.Component {
  render() {
    return (
      <div className="single-product">
        {/* Product Image */}
        <img src="" alt="" />
        <Link>Product Name</Link>
        <p>$20.00</p>
        <button>Add</button>
      </div>
    )
  }
}

export default SingleProduct
