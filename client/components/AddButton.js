import React from 'react'
import {connect} from 'react-redux'
import {addQuantity} from '../store/addToCart'

class AddButton extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      quantity: Number(event.target.value)
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    try {
      const quantity = this.state.quantity
      const {productId} = this.props
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    console.log('BUTTON')

    return (
      <form onSubmit={this.handleSubmit}>
        <input
          className="quantity-input"
          name="quantity"
          type="text"
          onChange={this.handleChange}
        />
        <button className="btn" type="submit">
          Add
        </button>
      </form>
    )
  }
}

const mapState = state => ({
  addToCart: state.addToCart
})

const mapDispatch = dispatch => ({
  addQuantity: (productId, userId, quantity) =>
    dispatch(addQuantity(productId, userId, quantity))
})

export default connect(mapState, mapDispatch)(AddButton)
