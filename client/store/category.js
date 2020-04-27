import axios from 'axios'

const initialState = {
  category: 'all-products'
}

const SET_CATEGORY = 'SET_CATEGORY'

export const setCategory = category => {
  return {
    type: SET_CATEGORY,
    category
  }
}

export const changeCategory = category => {
  return async dispatch => {
    await dispatch(setCategory(category))
  }
}

// Products Reducer
const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY:
      return {...state, category: action.category}
    default:
      return state
  }
}

export default categoryReducer
