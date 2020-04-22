import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import AllUsers from './AllUsers'
import AllProducts from './AllProducts'

//in order to test this you need to first go to server/auth/index.js and comment out lines 8-14.  (this is the if/else statement inside of the router.post(./login))

class AdminPage extends React.Component {
  constructor() {
    super()

    this.state = {
      section: 'products'
    }
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div className="adminPage">
        <h1
          onClick={() => {
            this.setState({section: 'products'})
          }}
        >
          Products
        </h1>
        <h1
          onClick={() => {
            this.setState({section: 'users'})
          }}
        >
          Users
        </h1>

        {this.state.section === 'products' ? (
          <div className="all-products">
            <div className="all-products-container">
              {this.props.products.products.map(product => {
                return (
                  <div className="single-product" key={product.id}>
                    <Link to={`/singleproduct/${product.id}`}>
                      {product.name}
                    </Link>
                    <Link to="/singleproduct/id">
                      <img
                        src={product.imageUrl}
                        alt=""
                        className="product-image"
                      />
                    </Link>
                    <p>Price ${(product.price / 100).toFixed(2)}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <AllUsers />
        )}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AdminPage)
