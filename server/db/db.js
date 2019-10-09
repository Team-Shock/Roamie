const Sequelize = require('sequelize');
const pkg = require('../../package.json');
const { pass, username, host, database } = require('../../secrets');

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

  //Sequelize initialization using individual variables exported and required from secrets file:

const db = new Sequelize(database, username, pass, {
  host: host,
  port: 5432,
  dialect: 'postgres',
  logging: false,
});

module.exports = db;

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close());
}
