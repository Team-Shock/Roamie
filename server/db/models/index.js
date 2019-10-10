const User = require('./user');
const Trip = require('./trip');
const Place = require('./place');
const Preferences = require('./preferences');
const TripPlaces = require('./tripplaces');
const UserPreferences = require('./userpreferences');

//A user may have multiple prefences, and a preference can belong to many users:
Preferences.belongsToMany(User, { through: UserPreferences });
User.belongsToMany(Preferences, { through: UserPreferences });

//Users have many trips:
User.hasMany(Trip);

//Trips have many places and places can be visited on multiple trips:
Trip.belongsToMany(Place, { through: TripPlaces });
Place.belongsToMany(Trip, { through: TripPlaces });

//export all models here:
module.exports = {
  User,
  Trip,
  Place,
  Preferences,
  TripPlaces,
  UserPreferences,
};
