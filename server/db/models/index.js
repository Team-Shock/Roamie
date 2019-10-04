const User = require('./user')
const Trip = require('./trip')
const Place = require('./place')
const Preferences = require('./preferences')
const TripPlaces = require('./tripplaces')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
//A user may have multiple prefences
Preferences.belongsToMany(User, {through: 'userprefences'})
User.belongsToMany(Preferences , {through: 'userprefences'})

User.belongsTo(Trip)

Trip.belongsToMany(Place, {through: TripPlaces})
Place.belongsToMany(Trip, {through: TripPlaces})


module.exports = {
  User,
  Trip,
  Place,
  Preferences,
  TripPlaces

}
