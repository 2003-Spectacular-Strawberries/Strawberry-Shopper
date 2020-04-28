import axios from 'axios'

const initialState = {
  quantity: 0
}

const SET_QUANTITY = 'SET_QUANTITY'

// ACTION CREATORS
const setQuantity = quantity => ({
  type: SET_QUANTITY,
  quantity
})

// THUNKS
export const addQuantity = (productId, userId, quantity) => {
  return async dispatch => {
    try {
      await axios.put(`/api/orders/user/${userId}/product/${productId}`, {
        quantity
      })
      dispatch(setQuantity(quantity))
    } catch (error) {
      console.log(error)
    }
  }
}

// REDUCER
const addReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUANTITY:
      return {...state, quantity: action.quantity}
    default:
      return state
  }
}

export default addReducer
