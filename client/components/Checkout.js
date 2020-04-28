import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder, deleteProduct, saveOrder} from '../store/order'

class Checkout extends React.Component {
  constructor() {
    super()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchOrder(this.props.user.id)
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.saveOrder(
      this.props.user.id,
      this.props.order.order.products
    )
  }

  render() {
    const products = this.props.order.products || []
    const order = this.props.order
    const user = this.props.user

    return (
      <div>
        <h1>Review Your Order and Select Payment</h1>
        <table className="cart-container">
          <tbody className="cart">
            {user.id && order.id ? (
              products.map(product => {
                return (
                  <tr key={product.id}>
                    <td className="cart-item">{product.orderItems.quantity}</td>
                    <td className="cart-item">{product.name}</td>
                    <td className="cart-item">
                      ${(product.price / 100).toFixed(2) *
                        product.orderItems.quantity}
                    </td>
                    <td className="cart-item">
                      <button
                        id="delete"
                        type="submit"
                        onClick={() =>
                          this.props.deleteProduct(order.id, product.id)
                        }
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
          </tbody>
        </table>
        <button type="button" className="btn" onClick={this.handleSubmit}>
          Submit Order
        </button>
      </div>
    )
  }
}

const mapState = state => ({
  order: state.order.order,
  user: state.user
})

const mapDispatch = dispatch => ({
  saveOrder: (userId, products) => dispatch(saveOrder(userId, products)),
  fetchOrder: userId => dispatch(fetchOrder(userId)),
  deleteProduct: (orderId, productId) =>
    dispatch(deleteProduct(orderId, productId))
})

export default connect(mapState, mapDispatch)(Checkout)
