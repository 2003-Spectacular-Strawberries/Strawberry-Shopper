import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder, deleteProduct} from '../store/order'
import {addQuantity} from '../store/addToCart'

class Cart extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }

    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    //alter backend API to get current user from session

    if (this.props.user.id) {
      this.props.fetchOrder(this.props.user.id)
    }
  }

  handleChange(event) {
    this.setState({
      quantity: Number(event.target.value)
    })
  }

  render() {
    const products = this.props.order.order.products || []
    const {id} = this.props.order.order
    let total = 0
    return (
      <table className="cart-container">
        <tbody className="cart">
          {this.props.user.id ? (
            products.map(product => {
              // total += (product.price / 100).toFixed(2)
              return (
                <tr key={product.id} className="cart-row">
                  <td className="cart-item">{product.orderItems.quantity}</td>
                  <td className="cart-item">
                    <input
                      className=" quantity-input"
                      type="text"
                      name="quantity"
                      onChange={this.handleChange}
                    />
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
                      onClick={() =>
                        this.props.addQuantity(
                          product.id,
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
          <tr>
            <td className="cart-checkout">Total: ${total}</td>
            <td className="cart-checkout">
              <button className="btn">Checkout</button>
            </td>
          </tr>
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
    dispatch(deleteProduct(orderId, productId)),
  addQuantity: (productId, userId, quantity) =>
    dispatch(addQuantity(productId, userId, quantity))
})

export default connect(mapState, mapDispatch)(Cart)
