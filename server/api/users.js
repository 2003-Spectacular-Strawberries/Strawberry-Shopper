const router = require('express').Router()
const {User} = require('../db/models')
const isAdminMiddleware = require('../auth/isAdmin')
module.exports = router

router.get('/', isAdminMiddleware, async (req, res, next) => {
  try {
    const users = await User.findAll()
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    await User.create({
      email: req.body.email,
      password: req.body.password,
      // salt: {},
      imageUrl: req.body.imageUrl,
      googleId: req.body.googleId
    })
    res.status(201).redirect('/login')
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    await user.update(req.body)
    res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id
      }
    })
    await user.destroy()
    res.status(200).send('User deleted.')
  } catch (err) {
    next(err)
  }
})
