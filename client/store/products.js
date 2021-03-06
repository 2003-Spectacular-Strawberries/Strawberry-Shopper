import axios from 'axios'
import {setProduct} from './product'

const initialState = {
  products: []
}

// Action Types
const SET_PRODUCTS = 'SET_PRODUCTS'
const ADD_PRODUCTS = 'ADD_PRODUCTS'
const DELETE_PRODUCT = 'DELETE_PRODUCT'
const EDIT_PRODUCT = 'EDIT_PRODUCT'

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

export const updateProduct = product => {
  return {
    type: EDIT_PRODUCT,
    product
  }
}

// Thunk Creators
export const fetchProducts = category => {
  return async dispatch => {
    try {
      if (!category || category.category === 'all-products') {
        const res = await axios.get('/api/products')
        dispatch(setProducts(res.data))
      } else {
        const res = await axios.get(
          `/api/products/category/${category.category}`
        )
        dispatch(setProducts(res.data))
      }
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

export const editProduct = product => {
  return async dispatch => {
    const {data} = await axios.put('/api/products/' + product.id, product)
    dispatch(updateProduct(data))
    dispatch(setProduct(data))
  }
}

// Products Reducer
const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return {...state, products: action.products}
    case ADD_PRODUCTS:
      return {...state, products: state.products.concat([action.product])}
    case DELETE_PRODUCT: {
      const allProducts = state.products
      const filteredProducts = allProducts.filter(
        product => product.id !== action.productId
      )
      state.products = filteredProducts
      return {...state}
    }
    case EDIT_PRODUCT:
      return {
        ...state,
        products: state.products.map(product => {
          if (product.id === action.product.id) {
            return action.product
          } else {
            return product
          }
        })
      }
    default:
      return state
  }
}

export default productsReducer
