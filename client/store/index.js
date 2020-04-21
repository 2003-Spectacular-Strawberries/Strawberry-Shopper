import {combineReducers, createStore, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productsReducer from './products'
import productReducer from './singleProduct'
import singleUser from '../redux/singleUser'
import allUsers from '../redux/allUsers'

const reducer = combineReducers({
  user: user,
  users: allUsers,
  singleUser: singleUser,
  products: productsReducer,
  product: productReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
