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
