import {combineReducers} from 'redux'
import allUsersReducer from './allUsers'
import userReducer from './user'

const appReducer = combineReducers({
  users: allUsersReducer,
  user: userReducer
})

export default appReducer
