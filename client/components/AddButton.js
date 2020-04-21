import React from 'react'

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
    // try {
    //   const quantity = this.state.quantity3
    // } catch (error) {
    //   console.log(error)
    // }
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

export default AddButton
