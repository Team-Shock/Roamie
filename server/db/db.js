const Sequelize = require('sequelize');
const pkg = require('../../package.json');
const RDSTokens = require('../../secrets');

const pass = RDSTokens.password
const username = RDSTokens.username
const host = RDSTokens.host
const port = RDSTokens.port
const database = RDSTokens.database

const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const db = new Sequelize(`postgres://postgres:pass@roamie-db.ccsldvj96dsk.us-east-1.rds.amazonaws.com:5432/roamie`, {
  // host: host,
  // port: port,
  logging: false
  // dialect: 'postgres'
})


module.exports = db;

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close());
}
