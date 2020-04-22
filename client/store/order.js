import axios from 'axios'

const initialState = {
  order: {}
}

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
      const {data} = await axios.get(`/api/orders/${userId}/cart`)
      dispatch(setOrder(data))
    } catch (error) {
      console.log(error)
    }
  }
}

// Reducer
const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDER: {
      return {...state, order: action.order}
    }
    default:
      return state
  }
}

export default orderReducer
