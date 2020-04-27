import axios from 'axios'

const initialState = {
  cart: {},
  quantity: 0
}

const SET_QUANTITY = 'SET_QUANTITY'
const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART'

const setQuantity = quantity => ({
  type: SET_QUANTITY,
  quantity
})

export const updateGuestCart = (productId, quantity) => ({
  type: UPDATE_GUEST_CART,
  productId,
  quantity
})

// THUNK

export const addQuantity = (productId, userId, quantity) => {
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
    case UPDATE_GUEST_CART:
      const quantity = state.cart.includes(action.productId)
        ? (state.cart.productId.quantity += action.quantity)
        : action.quantity
      return {...state, [action.productid]: {quantity: quantity}}
    default:
      return state
  }
}

export default addToCartReducer
