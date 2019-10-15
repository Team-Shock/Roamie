const { green, red } = require('chalk');
const db = require('../server/db');
const { Trip, User, Place, Preferences, UserPreferences, TripPlaces } = require('../server/db/models');
const defaultPreferences = require('../utils/defaultPreferences');

//Trips dummy data for development
const trips = [
  {
    name: 'Australia & New Zealand Honeymoon ❤️',
    imageUrl: 'https://www.sabre.com/locations/anz/wp/wp-content/uploads/uploadsaus_nz.jpg-720x290.jpg',
    startDate: '2015-12-16 04:05:02',
    endDate: '2016-01-04 14:15:00',
    startLocation: 'Sydney, Australia',
    endLocation: 'Sydney, Australia',
    status: 'complete'
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
    status: 'complete'
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

//Places dummy data for development
const places = [
  {
    name: 'Restaurante Silvestre',
    // imageUrl: '',
    description: '',
    date: '2019-07-16 12:00:00',
    locationAddress:
      'Ave. 11 Calle 3A - 955, Barrio Amón, Amón, San José Province, San José, 10101, Costa Rica',
    locationLat: '9.938935',
    locationLong: '-84.076361',
    visibility: 'true',
  }
];

const aznzPlaces = [
  {
    name: 'Bondi Beach',
    imageUrl: 'https://www.sydneycoastwalks.com.au/wp-content/uploads/2015/07/BondiCoogeewalk.jpg',
    description: 'Coastal Walk',
    date: '2015-12-16 12:00:00',
    locationAddress:
      'Bondi Beach',
    // locationLat: '9.938935',
    // locationLong: '-84.076361',
    visibility: 'true',
  }
];

async function seed() {
  await db.sync({ force: true });
  console.log('db synced!');

  const prefs = await Promise.all(
    defaultPreferences.map(pref => {
      return Preferences.create(pref);
    })
  );

  const users = await Promise.all([
    User.create({
      name: 'Shiba Doo',
      email: 'shiba@email.com',
      password: '123',
    }),
    // User.create({ name: 'Cody', email: 'cody@email.com', password: '123' }),
  ]);

  const userpreferences = await UserPreferences.findAll()
  console.log(`established ${userpreferences.length} user-preferences`)

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

  const allTrips = await Trip.findAll()
  await Promise.all(
    allTrips.map(trip => {
      return trip.update({
        userId: 1
      });
    })
  );

  //COSTA RICA
  const place1 = await Place.findAll({
    where : {
      name: places[0].name
    }
  })

  const trip1 = await Trip.findAll({
    where : {
      name: trips[1].name
    }
  })
  await TripPlaces.create({rating: "thumbs up", notes:"Delicious food!", tripId: trip1[0].id, placeId: place1[0].id})

  // //SYDNEY AZ
  const bondiBeach = await Place.create(aznzPlaces[0])

  const azNzTrip = await Trip.findAll({
    where : {
      name: trips[0].name
    }
  })

  await TripPlaces.create({rating: "thumbs up",
                           notes:"Bondi beach was the perfect place after landing to get brekkie (breakfast). We loved the Bondi to Coogree Beach coastal walk and enjoyed all the beautiful beaches along the way",
                          tripId: azNzTrip[0].id, placeId: bondiBeach.id})


  const tripPlaces = await TripPlaces.findAll();
  

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${trips.length} trips`);
  console.log(`seeded ${places.length} places`);

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
