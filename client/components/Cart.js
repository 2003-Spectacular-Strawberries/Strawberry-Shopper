import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder, deleteProduct} from '../store/order'
import {fetchCart, removeItem, updateCart} from '../store/cart'
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
  }

  async componentDidMount() {
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

  async componentDidUpdate(prevProps) {
    if (this.props.cart !== prevProps.cart) {
      await this.props.fetchOrder(this.props.user.id)
    }
  }

  handleChange(event) {
    this.setState({
      quantity: Number(event.target.value)
    })
  }

  handleRemoval(orderId, productId) {
    if (orderId === 'guest') {
      this.props.removeItem(productId)
    } else {
      this.props.deleteProduct(orderId, productId)
    }
  }

  render() {
    const orderId = this.props.orderId || 'guest'

    const cart = this.props.user.id
      ? Object.values(this.props.items)
      : Object.values(this.props.cart)

    let total = 0

    return (
      <div>
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
                        className=" quantity-input"
                        type="text"
                        name="quantity"
                        onChange={this.handleChange}
                      />
                    </td>
                    <td className="cart-item">{item.name}</td>
                    <td className="cart-item">
                      ${(quantity * item.price / 100).toFixed(2)}
                    </td>
                    <td className="cart-item">
                      <button
                        id="delete"
                        type="submit"
                        onClick={async () => {
                          this.props.updateCart(
                            item,
                            Math.abs(this.state.quantity)
                          )
                          this.props.addQuantity(
                            item.id,
                            this.props.user.id,
                            Math.abs(this.state.quantity)
                          )
                          await this.props.fetchOrder(this.props.user.id)
                        }}
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
        <Link to={`/checkout/${orderId}`}>
          <button type="submit" className="btn">
            Checkout
          </button>
        </Link>
      </div>
    )
  }
}

const mapState = state => {
  return {
    items: state.order.items,
    user: state.user,
    cart: state.cart,
    orderId: state.order.orderId
  }
}

const mapDispatch = dispatch => ({
  fetchOrder: userId => dispatch(fetchOrder(userId)),
  fetchCart: () => dispatch(fetchCart()),
  deleteProduct: (orderId, productId) =>
    dispatch(deleteProduct(orderId, productId)),
  addQuantity: (productId, userId, quantity) =>
    dispatch(addQuantity(productId, userId, quantity)),
  updateCart: (item, quantity) => dispatch(updateCart(item, quantity)),
  removeItem: productId => dispatch(removeItem(productId)),
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Cart)
