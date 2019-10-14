const { expect } = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const User = db.model('user');
const Preferences = db.model('preferences');
const defaultPreferences = require('../../utils/defaultPreferences');

describe('Auth routes', () => {
  beforeEach(async () => {
    await db.sync({ force: true });
    await Promise.all(
      defaultPreferences.map(pref => {
        return Preferences.create(pref);
      })
    );
  });
  describe('login route', async () => {
    const testEmail = 'test@email.com';
    const testPassword = 'test';
    beforeEach(() => {
      return User.create({ email: testEmail, password: testPassword });
    });
    it('returns a User instance when the email and password are correct', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@email.com',
          password: 'test',
        });
      const preferences = await Preferences.findAll();

      expect(res.body.preferences.length).to.be.equal(preferences.length);
      expect(res.body.email).to.deep.equal(testEmail);
    });
    it('sends a 401 and an error message when the email is not associated with a user', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'wrong@email.com',
          password: 'test',
        })
        .expect(401);
      expect(res.text).to.deep.equal('No account found');
    });
    it('send a 401 and an error message when the password is incorrect', async () => {
      const res = await request(app)
        .post('/auth/login')
        .send({
          email: 'test@email.com',
          password: 'wrong',
        })
        .expect(401);
      expect(res.text).to.deep.equal('Wrong password!');
    });
  }); //end describe login route
  describe('signup route', () => {
    it('creates a new User instance from a new email and user', async () => {
      const res = await request(app)
        .post('/auth/signup')
        .send({ email: 'signup@email.com', password: 'signup' });
      const preferences = await Preferences.findAll();
      // expect(res.body.preferences.length).to.be.equal(preferences.length);
      expect(res.body.email).to.deep.equal('signup@email.com');
    });
  }); //end describe signup route
}); //end describe auth routes
