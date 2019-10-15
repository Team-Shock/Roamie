const router = require("express").Router();
module.exports = router;
const { Preferences, User, UserPreferences } = require("../db/models");

router.put("/:userId/change", async (req, res, next) => {
  try {
    console.log("REQ BODY FROM API !!!!!!", req.body);
    let preferencesArr = req.body.preferences;
    newPreferences = await Promise.all(
      preferencesArr.map(pref => {
        const oldPref = UserPreferences.findByPk(pref.id);
        if (pref.selected !== oldPref.selected) {
          oldPref.toggleSelected();
        }
      })
    );

    res.json(newPreferences);
  } catch (error) {
    next(error);
  }
});
