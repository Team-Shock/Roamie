const router = require('express').Router();
module.exports = router;
const { Preferences, User, UserPreferences } = require('../db/models');

router.put('/:userId/change', async (req, res, next) => {
  try {
    let newPreferences = req.body.preferences
    newPreferences = await Promise.all(newPreferences.map(pref => {
      const oldPref = UserPreferences.findByPk(pref.id)
      if (pref.selected !== oldPref.selected){
      oldPref.toggleSelected();}
    }))
    // const prefSearch = await UserPreferences.findAll({
    //   where: {
    //     userId: req.params.userId,
    //     preferenceId: req.params.prefId,
    //   },
    // });

    res.json(newPreferences);
  } catch (error) {
    next(error);
  }
});
