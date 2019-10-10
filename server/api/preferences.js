const router = require('express').Router();
module.exports = router;
const { Preferences, User } = require('../db/models');

router.get('/:userId', async (req, res, next) => {
  try {
    const preferences = await User.findByPk(req.params.userId, {
      include: [{ all: true }],
    });
    res.json(preferences);
  } catch (error) {
    next(error);
  }
});

