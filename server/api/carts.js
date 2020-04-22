const router = require('express').Router()
const {Cart, CartItems, Product} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const carts = await Cart.findAll()
    res.json(carts)
  } catch (err) {
    next(err)
  }
})

//get all products for a specific cart, get the quantities of each product
router.get('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {userId: req.params.id},
      include: {model: Product}
    })
    res.json(cart)
  } catch (err) {
    next(err)
  }
})
