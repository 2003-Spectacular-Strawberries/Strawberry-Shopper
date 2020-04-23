import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddButton from './AddButton'
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
    console.log('THIS IS PROPS', this.props)
    // Have to ensure that ID of current user and current product is passed down to addbutton component
    return (
      <div className="single-product">
        <h1>{product.name}</h1>
        <img src={product.imageUrl} alt="" className="product-image" />
        <p>${(product.price / 100).toFixed(2)}</p>
        <p>{product.description}</p>

        <AddButton productId={product.id} />
      </div>
    )
  }
}

const mapState = state => ({
  product: state.product,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchProduct: productId => dispatch(fetchProduct(productId))
})

export default connect(mapState, mapDispatch)(SingleProduct)
