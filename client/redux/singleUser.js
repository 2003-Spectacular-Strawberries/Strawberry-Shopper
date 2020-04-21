import axios from 'axios'

export const SET_USER = 'SET_USER'
export const FETCH_USER = 'FETCH_USER'

export const setUser = user => {
  return {type: SET_USER, user}
}

export const fetchUser = id => {
  return async dispatch => {
    try {
      console.log('trying to fetch user #', id)
      const {data} = await axios.get(`/api/users/${id}`)
      console.log(data)
      return dispatch(setUser(data))
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
    default:
      return state
  }
}
