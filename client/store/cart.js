import axios from 'axios'

const initialState = {}

const UPDATE_CART = 'UPDATE_CART'
const FETCH_CART = 'FETCH_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'

// ACTION CREATORS
export const updateCart = (item, quantity) => ({
  type: UPDATE_CART,
  item,
  quantity
})

export const fetchCart = () => ({
  type: FETCH_CART
})

export const removeItem = productId => ({
  type: REMOVE_ITEM,
  productId
})

// REDUCER
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CART: {
      const item = {}
      item[action.item.id] = {
        id: action.item.id,
        name: action.item.name,
        price: action.item.price,
        imageUrl: action.item.imageUrl,
        stock: action.item.stock,
        quantity: action.quantity
      }

      return {...state, ...item}
    }
    case REMOVE_ITEM: {
      const {[action.productId]: removed, ...remainingCart} = state
      if (removed) return remainingCart
      else return state
    }
    default:
      return state
  }
}

export default cartReducer
