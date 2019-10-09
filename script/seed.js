const { green, red } = require('chalk');
const db = require('../server/db');
const { Trip, User, Place } = require('../server/db/models');

// here's some sample candies to get you started
// feel free to edit these or add your own!
const trips = [
  {
    name: 'Barcelona Trip with Friends',
    imageUrl: 'https://cdn.cnn.com/cnnnext/dam/assets/170706113411-spain.jpg',
    sharingUrl: '',
    startLocation: 'Carrer de Mallorca, 401, 08013 Barcelona, Spain',
    endLocation: 'Parc de la Ciutadella, 08003 Barcelona, Spain',
    sharingUrl: '',
    status: 'complete',
  },
  {
    name: 'Costa Rica with Family',
    imageUrl:
      'http://amp.entercostarica.com/images/auto-sized/new_ecr/680x340/pages/18-costa-rica-volcanoes.jpg',
    sharingUrl: '',
    startDate: '2019-07-15 04:05:02',
    endDate: '2019-07-20 14:15:00',
    startLocation:
      'Calle Central Alfredo Volio, Merced, San José Province, San José, Costa Rica',
    endLocation: 'Guanacaste Province, Playa Hermosa, Costa Rica',
    sharingUrl: '',
    status: 'complete',
  },
  {
    name: 'Naoshima Solo Trip',
    imageUrl:
      'https://photos.smugmug.com/Kyoto/Naoshima/i-pqm9V63/0/a0e01e81/L/shutterstock_568757074-L.jpg',
    sharingUrl: '',
  },
  {
    name: 'Dumbo Date Night',
    imageUrl:
      'http://blog.newyorkpass.com/wp-content/uploads/2017/03/Brooklyn_-_The_Dumbo_View-wikipedia.jpg',
    sharingUrl: '',
  },
  {
    name: 'Red Rocks Climbing Trip',
    imageUrl:
      'https://www.mountainphotography.com/images/xl/20180317-Red-Rock-Canyon-Sunrise.jpg',
    sharingUrl: '',
  },
];

const places = [
  {
    name: 'Restaurante Silvestre',
    imageUrl: '',
    description: '',
    date: '2019-07-16 12:00:00',
    locationAddress:
      'Ave. 11 Calle 3A - 955, Barrio Amón, Amón, San José Province, San José, 10101, Costa Rica',
    locationLat: '9.938935',
    locationLong: '-84.076361',
    visibility: 'true',
  },
  {
    name: 'Onna Cafe',
    imageUrl: '',
    description: '',
    date: '2019-09-16 12:00:00',
    locationAddress: 'Carrer de Santa Teresa, 1, 08012 Barcelona, Spain',
    locationLat: '41.400135',
    locationLong: '2.159935',
    visibility: 'true',
  },
];

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const users = await Promise.all([
    User.create({
      name: 'Shiba Doo',
      email: 'shiba@email.com',
      password: '123',
    }),
    User.create({ name: 'Cody', email: 'cody@email.com', password: '123' }),
  ]);

  await Promise.all(
    trips.map(trip => {
      return Trip.create(trip);
    })
  );

  await Promise.all(
    places.map(place => {
      return Place.create(place);
    })
  );

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${trips.length} trips`);

  console.log(`seeded successfully`);
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
