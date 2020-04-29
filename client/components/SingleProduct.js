import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {addQuantity} from '../store/add'
import {updateCart} from '../store/cart'
import {fetchProduct} from '../store/product'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      quantity: Number(event.target.value)
    })
  }

  componentDidMount() {
    const productId = this.props.match.params.id
    this.props.fetchProduct(productId)
  }

  async handleSubmit(event) {
    event.preventDefault()
    const {user} = this.props
    // This will add one item to the cart on the AllProducts page for the selected item with the corresponding add button

    if (user.id) {
      await this.props.addQuantity(
        this.props.product.id,
        user.id,
        this.state.quantity
      )
    } else {
      await this.props.updateCart(this.props.product, this.state.quantity)
    }

    this.props.history.push(`/cart`)
  }

  render() {
    console.log('this.props', this.props)
    const product = this.props.product

    // Have to ensure that ID of current user and current product is passed down to addbutton component
    return (
      <div className="single-product">
        <h1>{product.name}</h1>
        <img src={product.imageUrl} alt="" className="product-image" />
        <p>${(product.price / 100).toFixed(2)}</p>
        <p>{product.description}</p>

        <form onSubmit={this.handleSubmit}>
          <input
            className="quantity-input"
            name="quantity"
            type="text"
            onChange={this.handleChange}
          />
          <button className="btn" type="submit">
            Add
          </button>
        </form>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.product.product,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchProduct: category => dispatch(fetchProduct(category)),
  addQuantity: (productId, userId, quantity) =>
    dispatch(addQuantity(productId, userId, quantity)),
  updateCart: (item, quantity) => dispatch(updateCart(item, quantity))
})

export default connect(mapState, mapDispatch)(SingleProduct)
