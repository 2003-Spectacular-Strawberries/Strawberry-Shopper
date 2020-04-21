import axios from 'axios'

export const SET_USERS = 'SET_USERS'
export const FETCH_USERS = 'FETCH_USERS'
export const REMOVE_USER = 'REMOVE_USER'

export const setUsers = users => {
  return {type: SET_USERS, users}
}

export const removeUser = id => {
  return {type: REMOVE_USER, id}
}

export const fetchUsers = () => {
  return async dispatch => {
    try {
      console.log('!!!!!!')
      const {data} = await axios.get('/api/users')
      console.log('!!!!!!after data', data)
      return dispatch(setUsers(data))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = []

export default function allUsersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case REMOVE_USER: {
      const users = state.filter(function(user) {
        return user.id !== action.id
      })
      return users
    }
    default:
      return state
  }
}
