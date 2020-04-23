import axios from 'axios'

export const SET_USER = 'SET_USER'
export const FETCH_USER = 'FETCH_USER'
export const DELETE_USER = 'DELETE_USER'

export const setUser = user => {
  return {type: SET_USER, user}
}

export const fetchUser = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${id}`)
      return dispatch(setUser(data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteUser = id => {
  return async dispatch => {
    try {
      await axios.delete(`/api/users/${id}`)
      return dispatch(setUser({}))
    } catch (err) {
      console.log(err)
    }
  }
}

const initialState = {}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    case FETCH_USER:
      return action.user
    case DELETE_USER:
      return action.user
    default:
      return state
  }
}
