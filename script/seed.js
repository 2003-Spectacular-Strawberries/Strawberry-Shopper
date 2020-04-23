'use strict'

const db = require('../server/db')
const {
  User,
  Product,
  Review,
  Order,
  OrderItems
} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      firstName: 'Blue',
      lastName: 'Ghost',
      email: 'blue@gmail.com',
      password: '123',
      imageUrl: 'https://i.imgur.com/zhBKT0q.png'
    }),
    User.create({
      firstName: 'Pink',
      lastName: 'Ghost',
      email: 'pink@gmail.com',
      password: '123',
      imageUrl: 'https://i.imgur.com/HENTupr.png'
    }),
    User.create({
      firstName: 'Orange',
      lastName: 'Ghost',
      email: 'orange@gmail.com',
      password: '123',
      imageUrl: 'https://i.imgur.com/fO5EXxD.png'
    }),
    User.create({
      firstName: 'Purple',
      lastName: 'Ghost',
      email: 'purple@gmail.com',
      password: '123',
      imageUrl: 'https://i.imgur.com/FTJk5rI.png'
    }),
    User.create({
      firstName: 'Red',
      lastName: 'Ghost',
      email: 'red@gmail.com',
      password: '123',
      imageUrl: 'https://i.imgur.com/gzhGxcv.png'
    }),
    User.create({
      firstName: 'Ms.',
      lastName: 'Pac-Man',
      email: 'mrspacman@gmail.com',
      password: '123',
      imageUrl: 'https://i.imgur.com/BAaVxuO.png'
    }),
    User.create({
      firstName: 'Pac-Man',
      lastName: 'Pac-Man',
      email: 'pacman@gmail.com',
      password: '123',
      imageUrl: 'https://i.imgur.com/tLoC848.png'
    }),
    User.create({
      firstName: 'Junior',
      lastName: 'Pac-Man',
      email: 'junior@gmail.com',
      password: '123',
      imageUrl: 'https://i.imgur.com/nMgRVeA.png'
    }),
    User.create({
      firstName: 'Daniel',
      lastName: 'McNelis',
      email: 'dan@gmail.com',
      password: '123',
      isAdmin: 'true'
    }),
    User.create({
      firstName: 'Edward',
      lastName: 'Haddican',
      email: 'ed@gmail.com',
      password: '123',
      isAdmin: 'true'
    }),
    User.create({
      firstName: 'Branden',
      lastName: 'Sherman',
      email: 'branden@gmail.com',
      password: '123',
      isAdmin: 'true'
    }),
    User.create({
      firstName: 'Damir',
      lastName: 'Robert',
      email: 'damir@gmail.com',
      password: '123',
      isAdmin: 'true'
    }),
    User.create({
      firstName: 'Add',
      lastName: 'Min',
      email: 'admin@gmail.com',
      password: '123',
      isAdmin: 'true'
    })
  ])

  const products = await Promise.all([
    Product.create({
      name: 'Strawberry Cheesecake',
      price: 1999,
      stock: 100,
      description: 'A delicious cheesecake. Not too sweet. Very rich.',
      imageUrl: 'https://i.imgur.com/obInsr9.jpg'
    }),
    Product.create({
      name: 'Cocolate-Covered Strawberries',
      price: 1199,
      stock: 1000,
      description:
        'Milk, white, and dark chocolate-covered strawberries. Organic.',
      imageUrl: 'https://i.imgur.com/Bygn79R.jpg'
    }),
    Product.create({
      name: 'Strawberry Decal Sticker',
      price: 99,
      stock: 800,
      description:
        'Show off your strawberry pride with this black and white strawberry decal sticker.',
      imageUrl: 'https://i.imgur.com/W3crUmI.jpg'
    }),
    Product.create({
      name: 'Pet Strawberry',
      price: 349,
      stock: 5,
      description: 'The perfect companion for children or adults.',
      imageUrl: 'https://i.imgur.com/8MckSnZ.jpg'
    }),
    Product.create({
      name: 'Strawberry Ice-Cream',
      price: 1199,
      stock: 320,
      description:
        '1 Gallon of organic, gourmet ice-cream. Made in Burlington, Vermont.',
      imageUrl: 'https://i.imgur.com/RBBaPHa.jpg'
    }),
    Product.create({
      name: 'Strawberry Jam',
      price: 499,
      stock: 90,
      description: 'Homemade strawberry jam. Very sweet.',
      imageUrl: 'https://i.imgur.com/7ZxNSGg.jpg'
    }),
    Product.create({
      name: 'Strawberry Margarita Mix',
      price: 599,
      stock: 10,
      description: 'Perfect for a Sunday afternoon!',
      imageUrl: 'https://i.imgur.com/0JPIdYt.jpg'
    }),
    Product.create({
      name: 'Strawberry Throw Pillow',
      price: 899,
      stock: 100,
      description: 'Ergonmically designed for maximum spinal support.',
      imageUrl: 'https://i.imgur.com/MjLOKcc.jpg'
    }),
    Product.create({
      name: 'Strawberry Plush Toy',
      price: 499,
      stock: 75,
      description: 'Is he upside-down or right-side-up? You decide!',
      imageUrl: 'https://i.imgur.com/Cyue632.jpg'
    }),
    Product.create({
      name: 'Strawberry Bed Sheets',
      price: 1899,
      stock: 3,
      description:
        '4-Piece Set (1 Fitted Sheet, 1 Top Sheet, and 2 Pillow Cases). 200 Thread Count, 100% Organic Cotton.',
      imageUrl: 'https://i.imgur.com/3DyPY76.jpg'
    }),
    Product.create({
      name: 'Strawberry Short Cake',
      price: 1299,
      stock: 100,
      description: 'A delicious shortcake. Moderately sweet. Light.',
      imageUrl: 'https://i.imgur.com/tnLle5M.jpg'
    }),
    Product.create({
      name: 'Strawberry Board Shorts',
      price: 2499,
      stock: 10,
      description: 'Hit the beach in style this summer!',
      imageUrl: 'https://i.imgur.com/YhmDR0c.jpg'
    }),
    Product.create({
      name: 'Strawberry Bikini',
      price: 2999,
      stock: 10,
      description: 'Hit the beach in style this summer!',
      imageUrl: 'https://i.imgur.com/uJMphV8.jpg'
    }),
    Product.create({
      name: 'Strawberry Fruit Snacks',
      price: 699,
      stock: 100,
      description: "Welch's brand strawberry fruit snacks. Pack of 10.",
      imageUrl: 'https://i.imgur.com/Ri34D1e.jpg'
    }),
    Product.create({
      name: 'Strawberry Soap',
      price: 199,
      stock: 23,
      description: 'Organic strawberry-infused bar soap. 1 bar.',
      imageUrl: 'https://i.imgur.com/u5pAKyh.jpg'
    }),
    Product.create({
      name: 'Strawberry Vodka',
      price: 2899,
      stock: 150,
      description:
        'Absolut Strawberry Juice Vodka - 2 Liters. Must be 21 or over to order.',
      imageUrl: 'https://i.imgur.com/xkEv3ry.jpg'
    })
  ])

  const reviews = await Promise.all([
    Review.create({rating: 5, userId: 1, productId: 1})
  ])

  const orders = await Promise.all([
    Order.create({
      userId: 1,
      email: 'sbaddict@gmail.com',
      shipping: '23 Berry Boulevard, Straw, SB, 11123',
      billing: '23 Berry Boulevard, Straw, SB, 11123',
      price: 10.99,
      isCart: false
    }),
    Order.create({
      userId: 2,
      email: 'strawberrySommelier@gmail.com',
      shipping: '107 Straw Street, Berry, SB, 10003',
      billing: '107 Straw Street, Berry, SB, 10003',
      price: 99.99,
      isCart: false
    }),
    Order.create({userId: 3, isCart: true})
  ])

  const orderItems = await Promise.all([
    OrderItems.create({orderId: 1, productId: 1, quantity: 2}),
    OrderItems.create({orderId: 2, productId: 1, quantity: 1}),
    OrderItems.create({orderId: 2, productId: 2, quantity: 2}),
    OrderItems.create({orderId: 2, productId: 3, quantity: 1}),
    OrderItems.create({orderId: 3, productId: 3, quantity: 1})
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
  console.log(`seeded ${reviews.length} reviews`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded ${orderItems.length} orderItems`)
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
