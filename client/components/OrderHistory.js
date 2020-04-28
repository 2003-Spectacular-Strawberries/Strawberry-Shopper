import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const orders = [
  {
    id: 1,
    email: 'pink@gmail.com',
    shipping: '23 Berry Boulevard, Straw, SB, 11123',
    billing: '23 Berry Boulevard, Straw, SB, 11123',
    date: '12/26/2026',
    price: '$150',
    isCart: false,
    userId: 2
  },
  {
    id: 2,
    email: 'pink@gmail.com',
    shipping: '23 Berry Boulevard, Straw, SB, 11123',
    billing: '23 Berry Boulevard, Straw, SB, 11123',
    date: '12/19/2026',
    price: '$35',
    isCart: false,
    userId: 2
  },
  {
    id: 3,
    email: 'pink@gmail.com',
    shipping: '23 Berry Boulevard, Straw, SB, 11123',
    billing: '23 Berry Boulevard, Straw, SB, 11123',
    date: '12/3/2026',
    price: '$70',
    isCart: false,
    userId: 2
  }
]

class OrderHistory extends React.Component {
  render() {
    return (
      <div className="order-history-container">
        <div className="orders">
          {orders.map(order => {
            return (
              <div className="single-order" key={order.id}>
                <ul>
                  <li>{order.date}</li>
                  <li>{order.price}</li>
                  <li>
                    <Link className="btn" to="/order-summary">
                      View Order
                    </Link>
                  </li>
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default OrderHistory
