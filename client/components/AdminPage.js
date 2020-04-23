import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, deleteProduct} from '../store/products'
import AllUsers from './AllUsers'
import NewProduct from './NewProduct'

//in order to test this you need to first go to server/auth/index.js and comment out lines 8-14.  (this is the if/else statement inside of the router.post(./login))  this appears to be fixed, but i am leaving this note here until i am sure

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
      <div className="adminPage-container">
        <div className="adminHeadersContainer">
          <h1
            className="adminHeaders"
            onClick={() => {
              this.setState({section: 'products'})
            }}
          >
            Products
          </h1>
          <h1
            className="adminHeaders"
            onClick={() => {
              this.setState({section: 'newproduct'})
            }}
          >
            New Product Form
          </h1>
          <h1
            className="adminHeaders"
            onClick={() => {
              this.setState({section: 'users'})
            }}
          >
            Users
          </h1>
        </div>

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
                    <button
                      className="btn"
                      type="submit"
                      onClick={event => {
                        event.preventDefault()
                        this.props.deleteProduct(product.id)
                      }}
                    >
                      Delete
                    </button>
                    <p>Price ${(product.price / 100).toFixed(2)}</p>
                  </div>
                )
              })}
            </div>
          </div>
        ) : this.state.section === 'newproduct' ? (
          <NewProduct />
        ) : (
          <AllUsers />
        )}
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts()),
  deleteProduct: id => dispatch(deleteProduct(id))
})

export default connect(mapState, mapDispatch)(AdminPage)
