const router = require('express').Router();
module.exports = router;

router.get('/preferences', async (req, res, next) => {
  try {
    const preferences = await UserPreferences.findAll({
      where: {
        userId: req.sessions.userId,
      },
    });
    res.json(preferences);
  } catch (error) {
    next(error);
  }
});
