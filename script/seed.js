'use strict'

const db = require('../server/db')
const {User, Product, Review, Cart, CartItems} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({email: 'straw@berry.com', password: '123'})
  ])

  const products = await Promise.all([
    Product.create({name: 'Strawberry Smoothie', price: 1.99, stock: 4}),
    Product.create({name: 'Strawberry Soap', price: 2.99, stock: 5}),
    Product.create({
      name: 'Strawberry Pattern Boardshorts',
      price: 0.99,
      stock: 3
    })
  ])

  const reviews = await Promise.all([
    Review.create({rating: 5, userId: 1, productId: 1})
  ])

  const carts = await Promise.all([
    Cart.create({userId: 1}),
    Cart.create({userId: 2}),
    Cart.create({userId: 3})
  ])

  const cartItems = await Promise.all([
    CartItems.create({cartId: 1, productId: 1, quantity: 2}),
    CartItems.create({cartId: 2, productId: 1, quantity: 1}),
    CartItems.create({cartId: 2, productId: 2, quantity: 2}),
    CartItems.create({cartId: 2, productId: 3, quantity: 1}),
    CartItems.create({cartId: 3, productId: 3, quantity: 1})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded ${carts.length} carts`)
  console.log(`seeded ${cartItems.length} cartItems`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
