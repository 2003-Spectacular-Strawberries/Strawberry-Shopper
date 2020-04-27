import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import AddButton from './AddButton'
import CategoryForm from './productsByCategory'

class AllProducts extends React.Component {
  componentDidMount() {
    this.props.fetchProducts(this.props.category)
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.props.fetchProducts(this.props.category)
    }
  }

  render() {
    const {products} = this.props.products
    console.log('THIS IS PRODUCTS IN STORE', products)
    console.log('THIS IS CATEGORY IN STORE', this.props.category)

    return (
      <div className="all-products-container">
        <CategoryForm />
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

                {/* <AddButton productId={product.id} /> */}
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
  user: state.user,
  category: state.category
})

const mapDispatch = dispatch => ({
  fetchProducts: category => dispatch(fetchProducts(category))
})

export default connect(mapState, mapDispatch)(AllProducts)
