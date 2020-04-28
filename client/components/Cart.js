import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder, deleteProduct} from '../store/order'
import {fetchCart} from '../store/cart'
import {addQuantity} from '../store/add'
import {me} from '../store/user'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }

    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    try {
      await this.props.me()
      if (this.props.user.id) {
        this.props.fetchOrder(this.props.user.id)
      }

      this.props.fetchCart()
    } catch (err) {
      console.log(err)
    }
  }

  handleChange(event) {
    this.setState({
      quantity: Number(event.target.value)
    })
  }

  render() {
    console.log('this.props.cart', this.props.cart)
    const cart = Object.values(this.props.cart) || []
    const id = this.props.order.id || 'guest'
    let total = 0

    return (
      <div>
        <table className="cart-container">
          <tbody className="cart">
            {cart.length ? (
              cart.map(item => {
                console.log('item', item)
                console.log('item.price', item.price)
                console.log('item.quantity', item.quantity)
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
                      $
                      {(item.price / 100).toFixed(2) * quantity}
                    </td>
                    <td className="cart-item">
                      <button
                        id="delete"
                        type="submit"
                        onClick={() =>
                          this.props.addQuantity(
                            item.id,
                            this.props.user.id,
                            this.state.quantity
                          )
                        }
                        className="btn-outline"
                      >
                        Update
                      </button>
                    </td>
                    <td className="cart-item">
                      <button
                        id="delete"
                        type="submit"
                        onClick={() => this.props.deleteProduct(id, item.id)}
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
        <Link to={`/checkout/${id}`}>
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
    order: state.order,
    user: state.user,
    cart: state.cart
  }
}

const mapDispatch = dispatch => ({
  fetchOrder: userId => dispatch(fetchOrder(userId)),
  fetchCart: () => dispatch(fetchCart()),
  deleteProduct: (orderId, productId) =>
    dispatch(deleteProduct(orderId, productId)),
  addQuantity: (productId, userId, quantity) =>
    dispatch(addQuantity(productId, userId, quantity)),
  me: () => dispatch(me())
})

export default connect(mapState, mapDispatch)(Cart)
