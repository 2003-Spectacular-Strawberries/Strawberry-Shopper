import axios from 'axios'

const initialState = {}

// Action Types
const SET_ORDER = 'SET_ORDER'

// Action Creators
export const setOrder = order => ({
  type: SET_ORDER,
  order
})

// Thunk Creators
export const fetchOrder = userId => {
  return async dispatch => {
    try {
      // We need the orderId in order to get the order
      // Look up order through userId first
      // we need to find the order that is not yet complete and is associated with the userId
      // const res = await axios.get(``)
    } catch (error) {
      console.log(error)
    }
  }
}

// Reducer

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}

export default orderReducer
