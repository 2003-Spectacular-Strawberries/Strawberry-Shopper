const router = require('express').Router()
const { Product } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findOne({
        where: { 
            id: req.params.id
        }
    })
    res.json(product)
  } catch (err) {
    next(err)
  }
})
  
router.post('/', async (req, res, next) => {
try {
    await Product.create({
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
    const product = await Product.findOne({
    where: {
        id: req.params.id
    }
    })
    await product.update(req.body)
    res.status(200).json(product)
} catch (err) {
    next(err)
}
})

router.delete('/:id', async (req, res, next) => {
try {
    const product = await Product.findOne({
    where: {
        id: req.params.id
    }
    })
    await product.destroy(product)
    res.status(200).send('Product deleted.')
} catch (err) {
    next(err)
}
})