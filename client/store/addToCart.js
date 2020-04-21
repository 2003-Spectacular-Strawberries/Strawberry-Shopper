import axios from 'axios'

intitalState = {
  quantity: 0
}

const SET_QUANTITY = 'SET_QUANTITY'

const setQuantity = quantity => ({
  type: SET_QUANTITY,
  quantity
})

// THUNK

export const addQuantity = (productId, userId, quantity) => {
  return async dispatch => {
    try {
      const res = await axios.get(`/api/users/${userId}`)
      console.log(res.data)

      const res2 = await axios.get(`/api/carts/${res.data.id}`)

      const cartId = res2.data.id
      await axios.put(`/api/${cartId}/${productId}`, quantity)
    } catch (error) {
      console.log(error)
    }
  }
}

const addToCartReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_QUANTITY:
      return state

    default:
      return state
  }
}
