const router = require('express').Router()
const {Trip, Place, TripPlaces} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({});
    res.json(trips);
  } catch (err) {
    next(err);
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
        userId: req.params.userId,
      },
      include: [{ model: Place }],
    });
    res.json(trips);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/current', async (req, res, next) => {
  try {
    const tripSearch = await Trip.findAll({
      where: {
        userId: req.params.userId,
        status: 'in progress',
      },
      include: [{ model: Place }],
    });
    const currentTrip = tripSearch[0];
    if (!currentTrip) {
      res.json({});
    } else {
      res.json(currentTrip);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/:userId', async (req, res, next) => {
  try {
    const newTrip = await Trip.create({
      userId: req.params.userId,
      name: 'New Trip',
    });
    console.log('NEW TRIP IN POST ROUTE', newTrip);
    res.json(newTrip);
  } catch (error) {
    next(error);
  }
<<<<<<< HEAD
});
=======
})
>>>>>>> a1708ba8375d07b0ba2afe51be3c39c7f523f2d9
