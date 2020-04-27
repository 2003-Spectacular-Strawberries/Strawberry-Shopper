import axios from 'axios'

const initialState = {
  quantity: 0,
  cart: []
}

const SET_QUANTITY = 'SET_QUANTITY'

const setQuantity = quantity => ({
  type: SET_QUANTITY,
  quantity
})

// THUNK

export const addQuantity = (productId, userId, quantity) => {
  console.log('STATE QUANTITY')

  return async dispatch => {
    try {
      // Get current quantity of selected item
      // Add that quantity to the incoming quantity

      await axios.put(`/api/orders/user/${userId}/product/${productId}`, {
        quantity
      })
      dispatch(setQuantity(quantity))
    } catch (error) {
      console.log(error)
    }
  }
}

const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUANTITY:
      return {...state, quantity: action.quantity}
    default:
      return state
  }
}

export default addToCartReducer
