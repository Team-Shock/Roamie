const { expect } = require('chai');
const db = require('../index');
const Place = db.model('place');

describe('Place model', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  describe('fields', () => {
    let testPlace;
    beforeEach(async () => {
      testPlace = await Place.create({ name: 'testPlace' });
    });
    it('has a name field of type string', () => {
      expect(typeof testPlace.name).to.deep.equal('string');
    }); //end describe name field
    it('has an imageUrl with a default value', () => {
      expect(testPlace.imageUrl).to.deep.equal(
        'https://staceylarsen.typepad.com/.a/6a015390d3bc08970b016768711edf970b-pi'
      );
    }); //end describe imageUrl
  }); //end describe fields
}); //end describe model
