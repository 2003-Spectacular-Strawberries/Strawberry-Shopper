import React from 'react'
import {connect} from 'react-redux'
import {addQuantity} from '../store/add'
import {updateCart} from '../store/cart'

class AddButton extends React.Component {
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

  handleSubmit(event) {
    event.preventDefault()
    const {productId, user} = this.props
    let item
    this.props.products.forEach(function(product) {
      if (productId === product.id) item = product
    })

    this.props.updateCart(item, this.state.quantity)

    if (user.id) {
      this.props.addQuantity(productId, user.id, this.state.quantity)
    }
  }

  render() {
    return (
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
    )
  }
}

const mapState = state => ({
  addToCart: state.addToCart,
  products: state.products.products,
  user: state.user
})

const mapDispatch = dispatch => ({
  addQuantity: (productId, userId, quantity) =>
    dispatch(addQuantity(productId, userId, quantity)),
  updateCart: (item, quantity) => dispatch(updateCart(item, quantity))
})

export default connect(mapState, mapDispatch)(AddButton)
