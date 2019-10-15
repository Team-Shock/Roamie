const { expect } = require('chai');
const db = require('../index');
const Tripplaces = db.model('tripplaces');
const Trip = db.model('trip');
const Place = db.model('place');

describe('Trip Places join table', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  describe('fields', () => {
    let testPlace;
    let testTrip;
    let testInstance;
    beforeEach(async () => {
      testPlace = await Place.create({ name: 'testPlace' });
      testTrip = await Trip.create({ name: 'testTrip' });
    });
    it('forms an association between existing Trip and Place instances', async () => {
      testInstance = await Tripplaces.create({
        tripId: testTrip.id,
        placeId: testPlace.id,
      });
      let testSearch = await Tripplaces.findAll({
        where: {
          tripId: testTrip.id,
        },
      });
      expect(testInstance.rating).to.deep.equal('thumbs up');
      expect(testSearch[0].placeId).to.equal(testPlace.id);
    }); //end test association
  }); //end describe fields
}); //end describe model
