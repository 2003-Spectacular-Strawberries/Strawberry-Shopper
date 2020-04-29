import axios from 'axios'

const initialState = {
  orderId: null,
  items: {}
}

// Action Types
const SET_ORDER = 'SET_ORDER'
const DELETED_PRODUCT = 'DELETED_PRODUCT'

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
      const {data} = await axios.get(`/api/orders/${userId}/cart`)
      const order = {
        orderId: data.id,
        items: {}
      }

      data.products.forEach(function(item) {
        order.items[item.id] = {
          id: item.id,
          name: item.name,
          price: item.price,
          imageUrl: item.imageUrl,
          stock: item.stock,
          quantity: item.orderItems.quantity
        }
      })

      dispatch(setOrder(order))
    } catch (error) {
      console.log(error)
    }
  }
}

export const saveOrder = (
  userId = null,
  email,
  shipping,
  billing = shipping,
  price,
  products
) => {
  return async () => {
    try {
      if (userId) {
        await axios.put(`/api/orders/${userId}/cart/save`)
      } else if (products.length) {
        await axios.put(`/api/orders/guest/`, {
          email,
          shipping,
          billing,
          price,
          products
        })
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
      if (action.order) {
        return action.order
      } else {
        return state
      }
    }
    case DELETED_PRODUCT: {
      const {[action.productId]: removed, ...remainingOrder} = state.items
      if (removed) return {...state, items: {...remainingOrder}}
      else return state
    }
    default:
      return state
  }
}

export default orderReducer
