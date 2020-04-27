import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/products'
import {changeCategory} from '../store/category'

class CategoryForm extends React.Component {
  constructor() {
    super()
    this.state = {
      category: 'all-products'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async handleChange(event) {
    event.preventDefault()
    this.setState({
      category: event.target.value
    })
    this.props.changeCategory(event.target.value)
    console.log('STATE CATEGORY', this.state.category)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Category:
          <select value={this.state.category} onChange={this.handleChange}>
            <option value="all-products">All Products</option>
            <option value="arts_and_craft">Arts and Craft</option>
            <option value="beverage">Beverage</option>
            <option value="clothing">Clothing</option>
            <option value="food">Food</option>
            <option value="frozen_food">Frozen Food</option>
            <option value="home_decorations">Home Decorations</option>
            <option value="personal_care">Personal Care</option>
            <option value="pet_care">Pet Care</option>
          </select>
        </label>
      </form>
    )
  }
}

const mapState = state => ({
  category: state.category
})

const mapDispatch = dispatch => ({
  changeCategory: category => dispatch(changeCategory(category)),
  fetchProducts: category => dispatch(fetchProducts(category))
})

export default connect(mapState, mapDispatch)(CategoryForm)
