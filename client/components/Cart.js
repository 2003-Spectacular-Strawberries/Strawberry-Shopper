import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder, deleteProduct} from '../store/order'

class Cart extends React.Component {
  componentDidMount() {
    //alter backend API to get current user from session

    if (this.props.user.id) {
      this.props.fetchOrder(this.props.user.id)
    }
  }

  render() {
    const products = this.props.order.order.products || []
    const {id} = this.props.order.order

    return (
      //<h1>Shopping Cart</h1>

      <table className="cart-container">
        <tbody className="cart">
          {this.props.user.id ? (
            products.map(product => {
              return (
                <tr key={product.id}>
                  <td className="cart-item">
                    {product.orderItems.quantity}
                    {/* <input type="text" value={product.orderItems.quantity} /> */}
                  </td>
                  <td className="cart-item">{product.name}</td>
                  <td className="cart-item">
                    $
                    {(product.price / 100).toFixed(2) *
                      product.orderItems.quantity}
                  </td>
                  <td className="cart-item">
                    <button
                      id="delete"
                      type="submit"
                      onClick={() => this.props.deleteProduct(id, product.id)}
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
              <td>No Cart</td>
            </tr>
          )}
        </tbody>
      </table>
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
