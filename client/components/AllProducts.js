import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/products'
import CategoryForm from './productsByCategory'
import {addQuantity} from '../store/add'

class AllProducts extends React.Component {
  constructor() {
    super()

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts(this.props.category)
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.props.fetchProducts(this.props.category)
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    const {user} = this.props
    // This will add one item to the cart on the AllProducts page for the selected item with the corresponding add button
    let productId = Number(event.target.parentNode.id)

    await this.props.addQuantity(productId, user.id, 1)
    this.props.history.push('/cart')
  }

  render() {
    const {products} = this.props.products

    return (
      <div className="all-products-container">
        <CategoryForm />
        <div className="all-products">
          {products.map(product => {
            return (
              <div className="single-product" id={product.id} key={product.id}>
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
                <form onSubmit={this.handleSubmit}>
                  <button className="btn">Add</button>
                </form>
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
  fetchProducts: category => dispatch(fetchProducts(category)),
  addQuantity: (productId, userId, quantity) =>
    dispatch(addQuantity(productId, userId, quantity))
})

export default connect(mapState, mapDispatch)(AllProducts)
