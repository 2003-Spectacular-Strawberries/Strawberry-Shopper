import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder, deleteProduct, saveOrder} from '../store/order'
import {fetchCart, removeItem, editItem} from '../store/cart'
import {addQuantity} from '../store/add'
import {me} from '../store/user'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRemoval = this.handleRemoval.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.updateCart = this.updateCart.bind(this)
    this.handleConfirmation = this.handleConfirmation.bind(this)
  }

  handleChange(event) {
    this.setState({
      quantity: Number(event.target.value)
    })
  }

  async handleUpdate(orderId, productId) {
    if (orderId === 'guest') {
      this.props.editItem(productId, this.state.quantity)
    } else {
      await this.props.addQuantity(
        productId,
        this.props.user.id,
        this.state.quantity
      )
      this.props.fetchOrder(this.props.user.id)
    }

    const field = document.getElementById(productId)
    field.value = ''
  }

  handleRemoval(orderId, productId) {
    if (orderId === 'guest') {
      this.props.removeItem(productId)
    } else {
      this.props.deleteProduct(orderId, productId)
    }
  }

  async handleConfirmation(total) {
    const userId = this.props.user.id || null
    const email = this.props.info.email
    const shipping = `${this.props.info.addressLine1}, ${
      this.props.info.addressLine2
    }, ${this.props.info.city}, ${this.props.info.state}, ${
      this.props.info.zip
    }`
    const billing = shipping
    const cart = this.props.user.id
      ? Object.values(this.props.items)
      : Object.values(this.props.cart)

    await this.props.saveOrder(userId, email, shipping, billing, total, cart)

    this.props.history.push(`/confirmation`)
  }

  async updateCart() {
    try {
      await this.props.me()
      if (this.props.user.id) {
        await this.props.fetchOrder(this.props.user.id)
      }
      this.props.fetchCart()
    } catch (err) {
      console.log(err)
    }
  }

  componentDidMount() {
    this.updateCart()
  }

  render() {
    const orderId = this.props.orderId || 'guest'

    const cart = this.props.user.id
      ? Object.values(this.props.items)
      : Object.values(this.props.cart)

    let total = 0

    return (
      <div>
        <div>
          {this.props.info.name ? (
            <h1 style={{alignText: 'center'}}>
              Review and Finalize Your Order:
            </h1>
          ) : (
            <h1 style={{alignText: 'center'}}>Your Shopping Cart:</h1>
          )}
        </div>
        <table className="cart-container">
          <tbody className="cart">
            {cart.length ? (
              cart.map(item => {
                total += item.price * item.quantity
                const quantity = item.quantity || item.orderItems.quantity
                return (
                  <tr key={item.id} className="cart-row">
                    <td className="cart-item">{quantity}</td>
                    <td className="cart-item">
                      <input
                        className="quantity-input"
                        id={item.id}
                        type="text"
                        name="quantity"
                        onChange={this.handleChange}
                      />
                    </td>
                    <td className="cart-item">
                      <img src={item.imageUrl} className="cart-image" />
                    </td>
                    <td className="cart-item">{item.name}</td>
                    <td className="cart-item">
                      $
                      {(quantity * item.price / 100).toFixed(2)}
                    </td>
                    <td className="cart-item">
                      <button
                        id="delete"
                        type="submit"
                        onClick={() => this.handleUpdate(orderId, item.id)}
                        className="btn-outline"
                      >
                        Update
                      </button>
                    </td>
                    <td className="cart-item">
                      <button
                        id="delete"
                        type="submit"
                        onClick={() => this.handleRemoval(orderId, item.id)}
                        className="btn"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td>
                  <h2>Your Cart is Empty</h2>
                </td>
              </tr>
            )}
            <tr>
              <td className="cart-checkout">
                Total: ${(total / 100).toFixed(2)}
              </td>
            </tr>
          </tbody>
        </table>
        <div>
          {this.props.info.name ? (
            <button
              type="submit"
              className="btn"
              onClick={() => this.handleConfirmation(total)}
            >
              Submit Order
            </button>
          ) : (
            <Link to={`/checkout/${orderId}`}>
              <button type="submit" className="btn">
                Checkout
              </button>
            </Link>
          )}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    items: state.order.items,
    user: state.user,
    cart: state.cart,
    orderId: state.order.orderId,
    info: state.info
  }
}

const mapDispatch = dispatch => ({
  fetchOrder: userId => dispatch(fetchOrder(userId)),
  fetchCart: () => dispatch(fetchCart()),
  deleteProduct: (orderId, productId) =>
    dispatch(deleteProduct(orderId, productId)),
  addQuantity: (productId, userId, quantity) =>
    dispatch(addQuantity(productId, userId, quantity)),
  removeItem: productId => dispatch(removeItem(productId)),
  editItem: (productId, quantity) => dispatch(editItem(productId, quantity)),
  saveOrder: (userId, email, shipping, billing, total, cart) =>
    dispatch(saveOrder(userId, email, shipping, billing, total, cart)),
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Cart)
