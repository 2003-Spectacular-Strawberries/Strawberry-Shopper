import axios from 'axios'

const initialState = {
  order: {}
}

// Action Types
const SET_ORDER = 'SET_ORDER'
const DELETED_PRODUCT = 'DELETE_PRODUCT'

// Action Creators
export const setOrder = order => ({
  type: SET_ORDER,
  order
})

export const deletedProduct = productId => ({
  type: DELETED_PRODUCT,
  productId
})

// Thunk Creators
export const fetchOrder = userId => {
  return async dispatch => {
    try {
      console.log('ORDER THUNK RAN')
      const {data} = await axios.get(`/api/orders/${userId}/cart`)
      dispatch(setOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteProduct = (orderId, productId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/orderItems/${orderId}/product/${productId}`)
      dispatch(deletedProduct(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

// Reducer
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER: {
      return {...state, order: action.order}
    }
    case DELETED_PRODUCT:
      const orderProducts = state.order.products

      const filteredOrder = orderProducts.filter(
        product => product.id !== action.productId
      )

      state.order.products = filteredOrder

      return {
        ...state
      }
    default:
      return state
  }
}

export default orderReducer
