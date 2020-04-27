import axios from 'axios'

const initialState = {
  order: {}
}

// Action Types
const SET_ORDER = 'SET_ORDER'
const DELETED_PRODUCT = 'DELETE_PRODUCT'
const SAVE_ORDER = 'SAVE_ORDER'

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
  console.log('fetching via thunk')
  console.log('userId', userId)
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/orders/${userId}/cart`)
      console.log('data', data)
      dispatch(setOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const saveOrder = (
  userId,
  email,
  shipping,
  billing,
  price,
  products
) => {
  return async dispatch => {
    try {
      if (userId) {
        console.log('have userId')
        const data = await axios.put(`/api/orders/${userId}/cart/save`)
        dispatch(setOrder(data))
      } else if (products.length) {
        console.log('have products.length')
        const data = await axios.put(`/api/orders/guest/`, {
          email,
          shipping,
          billing,
          price,
          products
        })
        dispatch(setOrder(data))
      }
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
    case SAVE_ORDER: {
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
