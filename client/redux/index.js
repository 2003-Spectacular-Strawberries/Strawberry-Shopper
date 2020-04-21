import {combineReducers} from 'redux'
import allUsersReducer from './allUsers'
import userReducer from '../store/user'
import singleUserReducer from './singleUser'

const appReducer = combineReducers({
  users: allUsersReducer,
  user: userReducer,
  singleUser: singleUserReducer
})

export default appReducer
