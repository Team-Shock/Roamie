const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');
const UserPreferences = db.model('userpreferences');
const Preferences = db.model('preferences');
const defaultPreferences = require('../../utils/defaultPreferences');

describe('Preference routes', () => {
  beforeEach(() => {
    return db.sync({ force: true });
  });
  it('GET route returns a User instance with eagerly loaded userprefs', async () => {
    const testUser = await User.create({
      email: 'test@email.com',
      password: 'test',
    });

    const res = await request(app).get(`/api/preferences/${testUser.id}`);
    const preferences = await UserPreferences.findAll();

    expect(res.body.preferences.length).to.deep.equal(preferences.length);
    expect(res.body.id).to.deep.equal(testUser.id);
  }); //end describe GET route
  it('PUT route toggles the boolean on a specific userpreference instance', async () => {
    await Promise.all(
      defaultPreferences.map(pref => {
        return Preferences.create(pref);
      })
    );
    const testUser2 = await User.create({
      email: 'test2@email.com',
      password: 'test',
    });
    const prefSearch = await UserPreferences.findAll({
      where: {
        userId: testUser2.id,
      },
    });
    const res = await request(app).put(`/api/preferences/${testUser2.id}/16`);
    expect(res.body.selected).to.deep.equal(false);
  });
}); //end describe pref routes
