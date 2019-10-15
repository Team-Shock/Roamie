const router = require('express').Router();
const { Trip, Place, TripPlaces } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({});
    res.json(trips);
  } catch (err) {
    next(err);
  }
});
//MOVE TO TRIP_PLACES API
router.get('/places/:tripId', async (req, res, next) => {
  try {
    const userNotes = await TripPlaces.findAll({
      where: {
        tripId: req.params.tripId,
      },
    });
    res.json(userNotes);
  } catch (err) {
    next(err);
  }
});

router.get('/:userId/:tripId', async (req, res, next) => {
  try {
    const trips = await Trip.findAll({
      where: {
        id: req.params.tripId,
        userId: req.params.userId,
      },
      include: [{ model: Place }],
    });
    res.json(trips[0]);
  } catch (err) {
    next(err);
  }
});

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

//Starts a new Trip associated with a User
router.post('/:userId', async (req, res, next) => {
  try {
    const { latitude, longitude } = req.body.location;
    const newTrip = await Trip.create({
      userId: req.params.userId,
      name: 'New Trip',
      startLat: latitude,
      startLong: longitude,
    });

    res.json(newTrip);
  } catch (error) {
    next(error);
  }
});

//Adds a trip-place instance to a trip, and creates a Place instance if that user has not visited the place before
router.post('/places/:tripId', async (req, res, next) => {
  let nextPlace;
  try {
    const place = req.body.place;
    const placeSearch = await Place.findAll({
      where: {
        uniqueId: place.id,
      },
    });
    if (placeSearch[0]) {
      nextPlace = placeSearch[0];
    } else {
      nextPlace = await Place.create({
        name: place.name,
        imageUrl: place.image_url,
        locationAddress: place.location.address1,
        locationLat: place.coordinates.latitude,
        locationLong: place.coordinates.longitude,
        visibility: true,
        uniqueId: place.id,
      });
    }
    await TripPlaces.create({
      placeId: nextPlace.id,
      tripId: req.params.tripId,
    });
    res.json(nextPlace);
  } catch (error) {
    next(error);
  }
});
