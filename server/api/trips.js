const router = require('express').Router()
const {Trip, Place} = require('../db/models')
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