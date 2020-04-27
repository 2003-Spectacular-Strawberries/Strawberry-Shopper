const {User, Order} = require('../db/models')

const onlyUserMiddleware = async (req, res, next) => {
  if (req.params.userId) {
    if (parseInt(req.params.userId, 10) === req.user.dataValues.id) {
      next()
    } else if (req.params.orderId && req.params.productId) {
      // const currentOrder = await Order.findOne({
      //   where: {id: req.params.orderId},
      // })
      // if (parseInt(currentOrder.userId, 10) === req.user.dataValues.id) {
      //   next()
      // }
      console.log('ORDER ID', req.params.orderId)
    }
  } else {
    console.log('ORDER ID', req.params.orderId)
    console.log('ORDER ID', req.params.userId)
    const error = new Error('Unautherized Operation')
    error.status = 401
    next(error)
  }
}

module.exports = onlyUserMiddleware