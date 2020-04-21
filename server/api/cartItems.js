const router = require('express').Router()
const {CartItems} = require('../db/models')
module.exports = router

//this id will have to be the cart id, which will have been pulled from the cart table
//using someone's user id
router.get('/:cartId/:productId', async (req, res, next) => {
  try {
    const cartItem = await CartItems.findOne({
      where: {
        cartId: req.params.cartId,
        productId: req.params.productId
      }
    })
    res.json(cartItem)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    await CartItems.create({
      userId: req.body.userId,
      productId: req.body.productId,
      quantity: req.body.quantity
    })
    res.status(201).send('Item added!')
  } catch (err) {
    next(err)
  }
})

router.put('/:cartId/:productId', async (req, res, next) => {
  try {
    const cartItem = await CartItems.findOne({
      where: {
        cartId: req.params.cartId,
        productId: req.params.productId
      }
    })
    await cartItem.update(req.body)
    res.status(200).json(cartItem)
  } catch (err) {
    next(err)
  }
})

router.delete('/:cartId/:productId', async (req, res, next) => {
  try {
    const cartItem = await CartItems.findOne({
      where: {
        cartId: req.params.cartId,
        productId: req.params.productId
      }
    })
    await cartItem.destroy()
    res.status(200).send('Item removed from cart.')
  } catch (err) {
    next(err)
  }
})
