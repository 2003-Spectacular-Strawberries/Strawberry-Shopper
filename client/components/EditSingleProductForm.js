import React from 'react'

class EditSingleProductForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: props.product.name,
      price: props.product.price,
      stock: props.product.stock,
      imageUrl: props.product.imageUrl || '',
      description: props.product.description || '',
      id: props.product.id
    }
  }

  render() {
    return (
      <form>
        <h1>Name</h1>
        <input
          value={this.state.name}
          onChange={event => {
            this.setState({
              name: event.target.value
            })
          }}
        />
        <h1>Price</h1>
        <input
          value={this.state.price}
          onChange={event => {
            this.setState({
              price: event.target.value
            })
          }}
        />
        <h1>Stock</h1>
        <input
          value={this.state.stock}
          onChange={event => {
            this.setState({
              stock: event.target.value
            })
          }}
        />
        <h1>ImageUrl</h1>
        <input
          value={this.state.imageUrl}
          onChange={event => {
            this.setState({
              imageUrl: event.target.value
            })
          }}
        />
        <h1>Description</h1>
        <input
          value={this.state.description}
          onChange={event => {
            this.setState({
              description: event.target.value
            })
          }}
        />

        <button
          type="submit"
          onClick={event => {
            event.preventDefault()
            this.props.editProduct(this.state)
          }}
        >
          Edit
        </button>
      </form>
    )
  }
}

export default EditSingleProductForm
