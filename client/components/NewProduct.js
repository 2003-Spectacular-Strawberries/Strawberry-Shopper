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
      <form className="form-container">
        <div className="form-inner-container">
          <div className="form-item">
            <label>Name</label>
            <input
              value={this.state.name}
              onChange={event => {
                this.setState({
                  name: event.target.value
                })
              }}
            />
          </div>
          <div className="form-item">
            <label>Description</label>
            <input
              value={this.state.description}
              onChange={event => {
                this.setState({
                  description: event.target.value
                })
              }}
            />
          </div>
          <div className="form-item">
            <label>ImageUrl</label>
            <input
              value={this.state.imageUrl}
              onChange={event => {
                this.setState({
                  imageUrl: event.target.value
                })
              }}
            />
          </div>
          <div className="form-item">
            <label>Price</label>
            <input
              value={this.state.price}
              onChange={event => {
                this.setState({
                  price: event.target.value
                })
              }}
            />
          </div>
          <div className="form-item">
            <label>Stock</label>
            <input
              value={this.state.stock}
              onChange={event => {
                this.setState({
                  stock: event.target.value
                })
              }}
            />
          </div>

          <div className="">
            <button
              className="newProductCreateButton btn"
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
