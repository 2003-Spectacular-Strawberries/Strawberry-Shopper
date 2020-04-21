import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProduct} from '../store/singleProduct'
// import {Navbar} from './components'
// import Routes from './routes'

class SingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.id
    this.props.fetchProduct(productId)
  }

  render() {
    const {product} = this.props.product

    return (
      <div className="single-product">
        <h1>{product.name}</h1>
        <img src={product.image} alt="" />
        <p>{product.price}</p>
        <p>{product.description}</p>
        <button className="btn">Add</button>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.product
})

const mapDispatch = dispatch => ({
  fetchProduct: productId => dispatch(fetchProduct(productId))
})

export default connect(mapState, mapDispatch)(SingleProduct)
