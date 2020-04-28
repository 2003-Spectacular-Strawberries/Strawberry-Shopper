import axios from 'axios'

const initialState = []

export const SET_USERS = 'SET_USERS'
export const FETCH_USERS = 'FETCH_USERS'
export const REMOVE_USER = 'REMOVE_USER'
export const DELETE_USER = 'DELETE_USER'

// ACTION CREATORS
export const setUsers = users => {
  return {type: SET_USERS, users}
}

export const removeUser = id => {
  return {type: REMOVE_USER, id}
}

// THUNKS
export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/`)
      return dispatch(setUsers(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteUser = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${id}`)
      return dispatch(fetchUsers())
    } catch (err) {
      console.log(err)
    }
  }
}

// REDUCER
const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USERS:
      return action.users
    case DELETE_USER: {
      const users = state.filter(function(user) {
        return user.id !== action.id
      })
      return users
    }
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

export default usersReducer
