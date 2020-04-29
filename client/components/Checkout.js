import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {saveInfo} from '../store/info'

class Checkout extends React.Component {
  constructor() {
    super()

    this.state = {
      name: '',
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zip: '',
      email: '',
      payment: 'credit'
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    await this.props.saveInfo(this.state)
    this.props.history.push(`/cart`)
  }

  render() {
    return (
      <div>
        <h2 style={{textAlign: 'center'}}>
          Please provide your shipping, payment, and contact information:
        </h2>
        <form className="newProductForm-container">
          <h3 className="newProducFormInputHeader">Name:</h3>
          <input
            className="newProducFormInput"
            value={this.state.name}
            onChange={event => {
              this.setState({
                name: event.target.value
              })
            }}
          />
          <h3 className="newProducFormInputHeader">Email:</h3>
          <input
            className="newProducFormInput"
            value={this.state.email}
            onChange={event => {
              this.setState({
                email: event.target.value
              })
            }}
          />
          <h3 className="newProducFormInputHeader">Address Line 1:</h3>
          <input
            className="newProducFormInput"
            value={this.state.addressLine1}
            onChange={event => {
              this.setState({
                addressLine1: event.target.value
              })
            }}
          />
          <h3 className="newProducFormInputHeader">Address Line 2:</h3>
          <input
            className="newProducFormInput"
            value={this.state.addressLine2}
            onChange={event => {
              this.setState({
                addressLine2: event.target.value
              })
            }}
          />
          <h3 className="newProducFormInputHeader">City:</h3>
          <input
            className="newProducFormInput"
            value={this.state.city}
            onChange={event => {
              this.setState({
                city: event.target.value
              })
            }}
          />
          <h3 className="newProducFormInputHeader">State:</h3>
          <input
            className="newProducFormInput"
            value={this.state.state}
            onChange={event => {
              this.setState({
                state: event.target.value
              })
            }}
          />
          <h3 className="newProducFormInputHeader">Postal Code:</h3>
          <input
            className="newProducFormInput"
            value={this.state.zip}
            onChange={event => {
              this.setState({
                zip: event.target.value
              })
            }}
          />
          <h3 className="newProducFormInputHeader">Payment Method:</h3>
          <select
            className="newProducFormInput"
            onChange={event => {
              this.setState({
                payment: event.target.value
              })
            }}
          >
            <option value="credit">Credit</option>
            <option value="credit">Debit</option>
            <option value="paypal">Paypal</option>
            <option value="venmo">Venmo</option>
            <option value="braintree">Braintree</option>
            <option value="bitcoin">Bitcoin</option>
          </select>

          <div className="newProductCreateButton-container">
            <button
              className="newProductCreateButton"
              type="submit"
              onClick={() => this.handleSubmit(event)}
            >
              Submit Info
            </button>
          </div>
        </form>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    info: state.info
  }
}

const mapDispatch = dispatch => ({
  saveInfo: info => dispatch(saveInfo(info))
})

export default connect(mapState, mapDispatch)(Checkout)
