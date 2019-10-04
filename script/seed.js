const {green, red} = require('chalk')
const db = require('../server/db')
const {Trip, User} = require('../server/db/models')

// here's some sample candies to get you started
// feel free to edit these or add your own!
const trips = [
  {
    name: 'Barcelona Trip with Friends',
    imageUrl:
      'https://cdn.cnn.com/cnnnext/dam/assets/170706113411-spain.jpg',
    sharingUrl: ''
  },
  {
    name: 'Costa Rica with Family',
    imageUrl:
    'http://amp.entercostarica.com/images/auto-sized/new_ecr/680x340/pages/18-costa-rica-volcanoes.jpg',
    sharingUrl: ''
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  await Promise.all(
    trips.map(trip => {
      return Trip.create(trip)
    })
  )


  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${trips.length} trips`)

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
