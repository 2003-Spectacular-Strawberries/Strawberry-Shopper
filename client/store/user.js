import axios from 'axios'
import history from '../history'

// ACTION TYPES
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const SET_USER = 'SET_USER'
const FETCH_USER = 'FETCH_USER'
const DELETE_USER = 'DELETE_USER'

// INITIAL STATE
const initialState = {}

// ACTION CREATORS
const getUser = user => ({
  type: GET_USER,
  user
})

const removeUser = () => ({
  type: REMOVE_USER
})

export const setUser = user => ({
  type: SET_USER,
  user
})

// THUNK CREATORS
export const fetchUser = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/users/${id}`)
      const order = await axios.get(`/api/orders/${id}/cart`)
      return dispatch(setUser({...data, order}))
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

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || initialState))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (
  email,
  password,
  firstName,
  lastName,
  method
) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/${method}`, {
      email,
      password,
      firstName,
      lastName
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

// REDUCER
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return {}
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

export default userReducer
