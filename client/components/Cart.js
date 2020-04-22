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
  //   componentDidMount() {
  //     this.props.fetchOrder()
  //   }

  render() {
    // const {products} = this.props.products

    return (
      <table>
        <tbody>
          {testOrder.map(product => {
            return (
              <tr key={product.id}>
                <td>
                  <input type="text" placeholder={product.quantity} />
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

// const mapState = state => ({
//     orderProducts: state.orderProducts
// })

// const mapDispatch = dispatch => ({
//     fetchOrder: () => dispatch(fetchOrder())
// })

// export default connect(mapState, mapDispatch)(Cart)

export default Cart
