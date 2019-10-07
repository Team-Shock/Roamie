const Sequelize = require("sequelize");
const pkg = require("../../package.json");
const RDSTokens = require('../../secrets')

const pass = RDSTokens.password
const username = RDSTokens.username
const host = RDSTokens.host
const port = RDSTokens.port
const database = RDSTokens.database

const databaseName =
  pkg.name + (process.env.NODE_ENV === "test" ? "-test" : "");

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://${username}:${pass}@${host}:${port}/${database}`,
  {
    logging: false
  }
);
module.exports = db;

// This is a global Mocha hook used for resource cleanup.
// Otherwise, Mocha v4+ does not exit after tests.
if (process.env.NODE_ENV === "test") {
  after("close database connection", () => db.close());
}
