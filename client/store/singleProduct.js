import axios from 'axios'

const initialState = {
  product: {}
}

// Action Types
const SET_PRODUCT = 'SET_PRODUCT'

// Actions Creators
export const setProduct = product => {
  return {
    type: SET_PRODUCT,
    product
  }
}

// Thunk Creators
export const fetchProduct = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/products/${id}`)
      dispatch(setProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// Products Reducer
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCT:
      return {...state, product: action.product}
    default:
      return state
  }
}

export default productReducer
