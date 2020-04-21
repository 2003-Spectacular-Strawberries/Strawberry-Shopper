import axios from 'axios'

const initialState = {
  products: []
}

// Action Types
const SET_PRODUCTS = 'SET_PRODUCTS'

// Actions Creators
export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

// Thunk Creators
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/products')
      dispatch(setProducts(res.data))
    } catch (error) {
      console.log(error)
    }
  }
}

// Products Reducer
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.products}
    default:
      return state
  }
}

export default productsReducer
