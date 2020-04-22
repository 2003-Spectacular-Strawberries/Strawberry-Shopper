const {User} = require('../db/models')

const isUserMiddleware = (req, res, next) => {
  const currentUser = User.findOne({
    where: {id: req.body.userId}
  })
  if (currentUser && currentUser.id) {
    next()
  } else {
    const error = new Error('Unautherized Operation')
    error.status = 401
    next(error)
  }
}

module.exports = isUserMiddleware
