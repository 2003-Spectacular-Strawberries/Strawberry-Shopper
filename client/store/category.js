import axios from 'axios'

const initialState = {
  category: 'all-products'
}

const SET_CATEGORY = 'SET_CATEGORY'

// ACTION CREATORS
export const setCategory = category => ({
  type: SET_CATEGORY,
  category
})

export const changeCategory = category => {
  return async dispatch => {
    await dispatch(setCategory(category))
  }
}

// REDUCER
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {...state, category: action.category}
    default:
      return state
  }
}

export default categoryReducer
