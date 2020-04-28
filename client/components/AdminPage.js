import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts, deleteProduct, editProduct} from '../store/products'
import AllUsers from './AllUsers'
import NewProduct from './NewProduct'

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
            Edit Products
          </h1>
          <h1
            className="adminHeaders"
            onClick={() => {
              this.setState({section: 'newproduct'})
            }}
          >
            New Product Form
          </h1>
        </div>

        {this.state.section === 'products' ? (
          <div className="all-products-container">
            <div className="all-products">
              {this.props.products.products.map(product => {
                return (
                  <div className="single-product" key={product.id}>
                    <Link to={`/admin-singleproduct/${product.id}`}>
                      {product.name}
                    </Link>
                    <Link to={`/admin-singleproduct/${product.id}`}>
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
                    <button
                      className="btn"
                      type="submit"
                      // onClick={event => {
                      //   event.preventDefault()
                      //   this.props.editProduct(product.id)
                      // }}
                    >
                      Edit
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
  deleteProduct: id => dispatch(deleteProduct(id)),
  editProduct: id => dispatch(editProduct(id))
})

export default connect(mapState, mapDispatch)(AdminPage)
