import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const {products} = this.props.products

    return (
      <div className="all-products-container">
        <div className="all-products">
          {products.map(product => {
            return (
              <div className="single-product" key={product.id}>
                <Link
                  to={`/singleproduct/${product.id}`}
                  className="single-product-name"
                >
                  {product.name}
                </Link>
                <Link to={`/singleproduct/${product.id}`}>
                  <img
                    src={product.imageUrl}
                    alt=""
                    className="product-image"
                  />
                </Link>
                <p>Price ${(product.price / 100).toFixed(2)}</p>
                <button className="btn">Add</button>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  products: state.products,
  user: state.user
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
