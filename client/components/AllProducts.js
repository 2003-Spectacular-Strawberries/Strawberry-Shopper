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
      <div className="all-products">
        <div className="all-products-container">
          {products.map(product => {
            return (
              <div className="single-product" key={product.id}>
                <Link to={`/singleproduct/${product.id}`}>{product.name}</Link>
                <Link to="/singleproduct/id">
                  <img src={product.image} alt="" />
                </Link>
                <p>Price: ${product.price}</p>
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
  products: state.products
})

const mapDispatch = dispatch => ({
  fetchProducts: () => dispatch(fetchProducts())
})

export default connect(mapState, mapDispatch)(AllProducts)
