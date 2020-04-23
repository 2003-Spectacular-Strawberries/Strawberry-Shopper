const {User} = require('../db/models')

const isAdminMiddleware = async (req, res, next) => {
  try {
    const currentUser = await User.findOne({
      where: {id: req.user.dataValues.id}
    })
    if (currentUser && currentUser.isAdmin) {
      next()
    } else {
      const error = new Error('Unautherized Operation')
      error.status = 401
      next(error)
    }
  } catch (error) {
    next(error)
  }
}

module.exports = isAdminMiddleware
