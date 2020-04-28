import axios from 'axios'

const initialState = {}

const UPDATE_GUEST_CART = 'UPDATE_GUEST_CART'
const FETCH_GUEST_CART = 'FETCH_GUEST_CART'

// ACTION CREATORS
export const updateGuestCart = (item, quantity) => ({
  type: UPDATE_GUEST_CART,
  item,
  quantity
})

export const fetchGuestCart = () => ({
  type: FETCH_GUEST_CART
})

// REDUCER
const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_GUEST_CART: {
      const item = {}
      item[action.item.id] = {
        id: action.item.id,
        name: action.item.name,
        price: action.item.price,
        imageUrl: action.item.imageUrl,
        stock: action.item.stock,
        quantity: action.quantity
      }

      console.log('old state', state)
      console.log('item', item)
      console.log('new state', {...state, ...item})
      return {...state, ...item}
    }
    default:
      return state
  }
}

export default cartReducer
