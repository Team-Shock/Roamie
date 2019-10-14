// const { expect } = require('chai');
// const request = require('supertest');
// const db = require('../db');
// const app = require('../index');
// const User = db.model('user');
// const TripPlaces = db.model('tripplaces');
// const Places = db.model('place');
// const Trip = db.model('trip');


// describe.only('Places routes', () => {
//   beforeEach(() => {
//     return db.sync({ force: true });
//   });
//   it('GET places based on trip id', async () => {
//     const testUser = await User.create({
//       email: 'test@email.com',
//       password: 'test',
//     });
//     const trip = await Trip.create({
//         name: 'Costa Rica with Family',
//         imageUrl:
//             'http://amp.entercostarica.com/images/auto-sized/new_ecr/680x340/pages/18-costa-rica-volcanoes.jpg',
//         sharingUrl: '',
//         startDate: '2019-07-15 04:05:02',
//         endDate: '2019-07-20 14:15:00',
//         startLocation:
//             'Calle Central Alfredo Volio, Merced, San José Province, San José, Costa Rica',
//         endLocation: 'Guanacaste Province, Playa Hermosa, Costa Rica',
//         sharingUrl: '',
//         status: 'complete',
//         userId: 1
//     })

//     const places = await Places.create({
//         name: 'Restaurante Silvestre',
//         imageUrl: '',
//         description: '',
//         date: '2019-07-16 12:00:00',
//         locationAddress:
//           'Ave. 11 Calle 3A - 955, Barrio Amón, Amón, San José Province, San José, 10101, Costa Rica',
//         locationLat: '9.938935',
//         locationLong: '-84.076361',
//         visibility: 'true',
//     });
//     await TripPlaces.create({tripId: 1, placeId:1})

//     const res = await request(app).get(`/api/places/1`);
//     console.log("RES" , res.body)
//     expect(res.body[0].name).to.equal('Restaurante Silvestre');
//     // expect(res.body[0].places[0].name).to.equal('Restaurante Silvestre');

//   }); //end describe GET route
// }); //end describe pref routes
