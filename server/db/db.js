const Sequelize = require('sequelize');
const pkg = require('../../package.json');




const databaseName =
  pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '');

const db = new Sequelize(
  `postgres://postgres:RoamieShock1907@roamie-db.ccsldvj96dsk.us-east-1.rds.amazonaws.com:5432/roamie`,
  { logging: false }
);
//'postgres://postgres:RoamieShock1907@roamie-db.ccsldvj96dsk.us-east-1.rds.amazonaws.com:5432/roamie'

module.exports = db;

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close());
}
