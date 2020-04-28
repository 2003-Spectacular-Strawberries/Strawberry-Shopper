import {combineReducers, createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import userReducer from './user'
import usersReducer from './users'
import productReducer from './product'
import productsReducer from './products'
import categoryReducer from './category'
import cartReducer from './cart'
import orderReducer from './order'
import addReducer from './add'

const reducer = combineReducers({
  add: addReducer,
  user: userReducer,
  users: usersReducer,
  product: productReducer,
  products: productsReducer,
  category: categoryReducer,
  cart: cartReducer,
  order: orderReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
