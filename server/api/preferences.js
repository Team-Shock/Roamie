const router = require('express').Router();
module.exports = router;
const { Preferences, User, UserPreferences } = require('../db/models');

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

router.put('/:userId/:prefId', async (req, res, next) => {
  try {
    const prefSearch = await UserPreferences.findAll({
      where: {
        userId: req.params.userId,
        preferenceId: req.params.prefId,
      },
    });
    const pref = prefSearch[0];
    await pref.toggleSelected();
    res.json(pref);
  } catch (error) {
    next(error);
  }
});
