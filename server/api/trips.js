const router = require('express').Router()
const {Trip} = require('../db/models')
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

router.get('/:tripId', async (req, res, next) => {
  try {
    const trip = await Trip.findByPk(req.params.tripId)
    res.json(trip)
  } catch (err) {
    next(err)
  }
})

router.create('/', async (req, res, next) => {
  try {
    await Trip.create();
  } catch (err) {
next(err)
  }
})
