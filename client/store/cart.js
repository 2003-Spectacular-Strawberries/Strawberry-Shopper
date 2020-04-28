import axios from 'axios'

const initialState = {}

const UPDATE_CART = 'UPDATE_CART'
const FETCH_CART = 'FETCH_CART'

// ACTION CREATORS
export const updateCart = (item, quantity) => ({
  type: UPDATE_CART,
  item,
  quantity
})

export const fetchCart = () => ({
  type: FETCH_CART
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
    default:
      return state
  }
}

export default cartReducer
