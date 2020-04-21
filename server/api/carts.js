const router = require('express').Router()
const { Cart } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll({
      attributes: ['id', 'email', 'imageUrl', 'isAdmin']
    })
    res.json(carts)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
    try {
      const cart = await Cart.findOne({
          where: { 
              id: req.params.id
          }
      })
      res.json(cart)
    } catch (err) {
      next(err)
    }
})

router.put('/:id', async (req, res, next) => {
    try {
        const cart = await Cart.findOne({
        where: {
            id: req.params.id
        }
        })
        await cart.update(req.body)
        res.status(200).json(cart)
    } catch (err) {
        next(err)
    }
})