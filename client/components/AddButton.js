import React from 'react'
import {connect} from 'react-redux'
import {addQuantity} from '../store/addToCart'

class AddButton extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
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

    this.props.addQuantity(this.props.productId, 3, this.state.quantity)
  }

  render() {
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
  addToCart: state.addToCart,
  user: state.user
})

const mapDispatch = dispatch => ({
  addQuantity: (productId, userId, quantity) =>
    dispatch(addQuantity(productId, userId, quantity))
})

export default connect(mapState, mapDispatch)(AddButton)
