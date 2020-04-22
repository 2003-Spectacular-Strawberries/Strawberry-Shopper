import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchOrder} from '../store/order'

const testOrder = [
  {id: 1, name: 'Strawberry Board Shorts', quantity: 1, price: 1999},
  {id: 2, name: 'Strawberry Shortcake', quantity: 1, price: 1099},
  {id: 3, name: 'Strawberry Jam', quantity: 4, price: 299}
]

class Cart extends React.Component {
  componentDidMount() {
    // const userId = this.match.params
    this.props.fetchOrder(3)
  }

  render() {
    const products = this.props.order.order.products || []
    console.log(products)

    return (
      <table>
        <tbody>
          {products.map(product => {
            return (
              <tr key={product.id}>
                <td>
                  <input
                    type="text"
                    placeholder={product.orderItems.quantity}
                  />
                </td>
                <td>{product.name}</td>
                <td>${(product.price / 100).toFixed(2)}</td>
                <td>
                  <button
                    id="delete"
                    type="submit"
                    onClick={() => this.props.deleteItem(product.id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

const mapState = state => ({
  order: state.order
})

const mapDispatch = dispatch => ({
  fetchOrder: userId => dispatch(fetchOrder(userId))
})

export default connect(mapState, mapDispatch)(Cart)
