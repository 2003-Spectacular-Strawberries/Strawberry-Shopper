import axios from 'axios'

const initialState = {
  quantity: 0
}

const SET_QUANTITY = 'SET_QUANTITY'

const setQuantity = quantity => ({
  type: SET_QUANTITY,
  quantity
})

// THUNK

export const addQuantity = (productId, userId, quantity) => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/carts/${userId}`)
      const cartId = res.data.id
      await axios.put(`/api/${cartId}/${productId}`, quantity)
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
