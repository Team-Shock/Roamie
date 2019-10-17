const router = require("express").Router();
module.exports = router;
const { Preferences, User, UserPreferences } = require("../db/models");

router.put("/:userId/change", async (req, res, next) => {
  try {
    let preferencesArr = req.body;
    newPreferences = await Promise.all(
      preferencesArr.map(pref => {
        const oldPref = UserPreferences.findByPk(pref.id);
        if (pref.selected !== oldPref.selected) {
          oldPref.selected = true;
        }
      })
    );

    res.json(newPreferences);
  } catch (error) {
    next(error);
  }
});
