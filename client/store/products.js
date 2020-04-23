import axios from 'axios'

const initialState = {
  products: []
}

// Action Types
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCTS = 'ADD_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

// Actions Creators
export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products
  }
}

export const addProduct = product => {
  return {
    type: ADD_PRODUCTS,
    product
  }
}

export const removeProduct = productId => {
  return {
    type: DELETE_PRODUCT,
    productId
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

export const createProduct = newProductData => {
  return async dispatch => {
    const {data} = await axios.post('/api/products', newProductData)
    dispatch(addProduct(data))
  }
}

export const deleteProduct = id => {
  return async dispatch => {
    await axios.delete('/api/products/' + id)
    dispatch(removeProduct(id))
  }
}

// Products Reducer
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.products}
    case ADD_PRODUCTS:
      return {...state, products: state.products.concat([action.product])}
    case DELETE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(product => {
          return product.id !== action.productId
        })
      }
    default:
      return state
  }
}

export default productsReducer
