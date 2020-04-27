import {combineReducers, createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productsReducer from './products'
import productReducer from './singleProduct'
import singleUser from './singleUser'
import allUsers from './allUsers'
import addToCartReducer from './addToCart'
import orderReducer from './order'
import categoryReducer from './category'

const reducer = combineReducers({
  user: user,
  users: allUsers,
  singleUser: singleUser,
  products: productsReducer,
  product: productReducer,
  category: categoryReducer,
  addToCart: addToCartReducer,
  order: orderReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
