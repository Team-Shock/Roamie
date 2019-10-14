const router = require('express').Router()
const {Place, TripPlaces} = require('../db/models')
module.exports = router


router.get('/:tripId', async (req, res, next) => {
    try {
      const tripPlaces = await TripPlaces.findAll({
        where: {
          tripId: req.params.tripId
        },
        include: [{model: Place}]
      })
      res.json(trips)
    } catch (err) {
      next(err)
    }
  })