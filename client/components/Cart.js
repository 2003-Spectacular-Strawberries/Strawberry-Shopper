import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder, deleteProduct} from '../store/order'

class Cart extends React.Component {
  componentDidMount() {
    if (this.props.user.id) {
      this.props.fetchOrder(this.props.user.id)
    }
  }

  render() {
    const products = this.props.order.order.products || []
    const order = this.props.order.order
    const user = this.props.user

    return (
      <div>
        <h1>Shopping Cart</h1>
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
        <Link to={`/checkout/${order.id}`}>
          <button type="button" className="btn">
            Checkout
          </button>
        </Link>
      </div>
    )
  }
}

const mapState = state => ({
  order: state.order,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchOrder: userId => dispatch(fetchOrder(userId)),
  deleteProduct: (orderId, productId) =>
    dispatch(deleteProduct(orderId, productId))
})

export default connect(mapState, mapDispatch)(Cart)
