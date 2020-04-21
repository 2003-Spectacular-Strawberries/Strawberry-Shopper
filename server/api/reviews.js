const router = require('express').Router()
const {Review} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const review = await Review.findOne({
      where: {
        id: req.params.id
      }
    })
    res.json(review)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create({
      rating: req.body.rating,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      userId: req.body.userId
    })
    res.status(201).json(review)
  } catch (err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const review = await Review.findOne({
      where: {
        id: req.params.id
      }
    })
    await review.update(req.body)
    res.status(200).json(review)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const review = await Review.findOne({
      where: {
        id: req.params.id
      }
    })
    await review.destroy()
    res.status(200).send('Review deleted.')
  } catch (err) {
    next(err)
  }
})
