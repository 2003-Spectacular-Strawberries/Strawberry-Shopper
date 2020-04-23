import React from 'react'
import {createProduct} from '../store/products'
import {connect} from 'react-redux'

class NewProduct extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      price: 0,
      stock: 0,
      imageUrl: '',
      description: ''
    }
  }

  render() {
    return (
      <form className="newProductForm-container">
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

        <div className="newProductCreateButton-container">
          <button
            className="newProductCreateButton"
            type="submit"
            onClick={event => {
              event.preventDefault()
              this.props.createProduct(this.state)
              this.setState({
                name: '',
                price: 0,
                stock: 0,
                imageUrl: '',
                description: ''
              })
            }}
          >
            Create
          </button>
        </div>
      </form>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    createProduct: newProduct => {
      return dispatch(createProduct(newProduct))
    }
  }
}

export default connect(null, mapDispatch)(NewProduct)
