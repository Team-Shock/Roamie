const router = require('express').Router()
const {Trip, Place, TripPlaces} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
    })
    res.json(trips)
  } catch (err) {
    next(err)
  }
})
//MOVE TO TRIP_PLACES API
router.get('/places/:tripId', async (req, res, next) => {
  try {
    const userNotes = await TripPlaces.findAll({
      where: {
        tripId: req.params.tripId
      }
    })
    res.json(userNotes)
  } catch (err) {
    next(err)
  }
})

router.get('/:userId/:tripId', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      where: {
        id: req.params.tripId,
        userId: req.params.userId
      },
      include: [{model: Place}]
    })
    res.json(trips[0])
  } catch (err) {
    next(err)
  }
})



router.get('/:userId', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      where: {
        userId: req.params.userId
      },
      include: [{model: Place}]
    })
    res.json(trips)
  } catch (err) {
    next(err)
  }
})
