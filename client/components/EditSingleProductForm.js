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
      <form className="editSingleProductAdminForm-container">
        <h1 className="newProducFormInputHeader">Name</h1>
        <input
          className="newProducFormInput"
          value={this.state.name}
          onChange={event => {
            this.setState({
              name: event.target.value
            })
          }}
        />
        <h1 className="newProducFormInputHeader">Price</h1>
        <input
          className="newProducFormInput"
          value={this.state.price}
          onChange={event => {
            this.setState({
              price: event.target.value
            })
          }}
        />
        <h1 className="newProducFormInputHeader">Stock</h1>
        <input
          className="newProducFormInput"
          value={this.state.stock}
          onChange={event => {
            this.setState({
              stock: event.target.value
            })
          }}
        />
        <h1 className="newProducFormInputHeader">ImageUrl</h1>
        <input
          className="newProducFormInput"
          value={this.state.imageUrl}
          onChange={event => {
            this.setState({
              imageUrl: event.target.value
            })
          }}
        />
        <h1 className="newProducFormInputHeader">Description</h1>
        <input
          className="newProducFormInput"
          value={this.state.description}
          onChange={event => {
            this.setState({
              description: event.target.value
            })
          }}
        />

        <div className="newProductCreateButton-container">
          <button
            className="newProductCreateButton"
            type="submit"
            onClick={event => {
              event.preventDefault()
              this.props.editProduct(this.state)
            }}
          >
            Edit
          </button>
        </div>
      </form>
    )
  }
}

export default EditSingleProductForm
