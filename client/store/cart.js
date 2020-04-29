import axios from 'axios'

const initialState = {}

const UPDATE_CART = 'UPDATE_CART'
const FETCH_CART = 'FETCH_CART'
const REMOVE_ITEM = 'REMOVE_ITEM'
const ADD_FROM_ALLPRODUCS = 'ADD_FROM_ALLPRODUCTS'

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

export const addFromAllProducts = (item, quantity) => ({
  type: ADD_FROM_ALLPRODUCS,
  item,
  quantity
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
    case ADD_FROM_ALLPRODUCS: {
      const cartArray = Object.values(state)
      const added = cartArray.filter(item => item.id === action.item.id)
      const item = {}
      if (added.length >= 1) {
        item[action.item.id] = {
          id: action.item.id,
          name: action.item.name,
          price: action.item.price,
          imageUrl: action.item.imageUrl,
          stock: action.item.stock,
          quantity: action.quantity + added[0].quantity
        }
      } else {
        item[action.item.id] = {
          id: action.item.id,
          name: action.item.name,
          price: action.item.price,
          imageUrl: action.item.imageUrl,
          stock: action.item.stock,
          quantity: action.quantity
        }
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
