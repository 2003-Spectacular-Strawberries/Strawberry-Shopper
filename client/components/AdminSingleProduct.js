import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import AddButton from './AddButton'
import {fetchProduct} from '../store/singleProduct'
import EditSingleProductForm from './EditSingleProductForm'
import {editProduct} from '../store/products'

class AdminSingleProduct extends React.Component {
  componentDidMount() {
    const productId = this.props.match.params.id
    this.props.fetchProduct(productId)
  }

  render() {
    const {product} = this.props.product
    // Have to ensure that ID of current user and current product is passed down to addbutton component
    return (
      <div className="single-product-edit-form">
        <div className="current-product-edit-form">
          <h1>{product.name}</h1>
          <img
            src={product.imageUrl}
            alt=""
            className="product-image-edit-form"
          />
          <p>Current Price: ${(product.price / 100).toFixed(2)}</p>
          <p>Description: {product.description}</p>
          <p>Stock: {product.stock} items</p>
        </div>

        <div className="current-product-edit-form">
          {product.id && (
            <EditSingleProductForm
              product={product}
              editProduct={this.props.editProduct}
            />
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.product,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchProduct: productId => dispatch(fetchProduct(productId)),
  editProduct: product => dispatch(editProduct(product))
})

export default connect(mapState, mapDispatch)(AdminSingleProduct)
