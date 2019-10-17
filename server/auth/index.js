const router = require("express").Router();
const User = require("../db/models/user");
module.exports = router;

router.post("/login", async (req, res, next) => {
  try {
    const data = await User.findAll({ where: { email: req.body.email } });

    if (data.length < 1) {
      res.status(401).send("No account found");
    } else if (!data[0].correctPassword(req.body.password)) {
      console.log("Incorrect password for user:", req.body.email);
      res.status(401).send("Wrong password!");
    } else {
      const user = await User.findByPk(data[0].id, {
        include: [{ all: true }]
      });
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post("/oauth", async (req, res, next) => {
  try {
    const data = await User.findAll({
      where: { email: req.body.email, name: req.body.name }
    });
    let user = data[0];
    if (!user) {
      user = await User.create({ email: req.body.email, name: req.body.name });
      res.json(user);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const user = await User.findByPk(newUser.id, { include: [{ all: true }] });
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      res.status(401).send("User already exists");
    } else {
      next(err);
    }
  }
});

router.post("/logout", (req, res) => {
  req.logout();
  req.session.destroy();
});

router.get("/me", (req, res) => {
  res.json(req.user);
});

router.use("/google", require("./google"));
