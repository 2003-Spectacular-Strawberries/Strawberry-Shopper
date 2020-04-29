import axios from 'axios'

const initialState = {}

const SAVE_INFO = 'SAVE_INFO'

// ACTION CREATORS
export const saveInfo = info => ({
  type: SAVE_INFO,
  info
})

// REDUCER
const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_INFO: {
      return action.info
    }
    default:
      return state
  }
}

export default infoReducer
