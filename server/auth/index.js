const router = require('express').Router();
const User = require('../db/models/user');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    console.log(req.body);
    const data = await User.findAll({ where: { email: req.body.email } });

    if (data.length < 1) {
      console.log('No such user found:', req.body.email);
      res.status(401).send('No account found');
    } else if (!data[0].correctPassword(req.body.password)) {
      console.log('Incorrect password for user:', req.body.email);
      res.status(401).send('Wrong password!');
    } else {
      const user = await User.findByPk(data[0].id, {
        include: [{ all: true }],
      });
      req.login(user, err => (err ? next(err) : res.json(user)));
    }
  } catch (err) {
    next(err);
  }
});

router.post('/oauth', async (req, res, next) => {
  try {
<<<<<<< HEAD
    const data = await User.findAll(
      { where: { email: req.body.email,
        name: req.body.name } });
    let userInfo;
    userInfo.user = data[0] 
    if (!userInfo.user) {
      userInfo.user = await User.create(
        { email: req.body.email,
          name: req.body.name } );
      userInfo.user.firstTime = true;
      res.json(userInfo);
=======
    const data = await User.findAll({
      where: { email: req.body.email, name: req.body.name },
    });
    let user = data[0];
    if (!user) {
      user = await User.create({ email: req.body.email, name: req.body.name });
      res.json(user);
>>>>>>> 3db433450dc992d905789b9c0c8ddce5725e72b7
    } else {
      userInfo.firstTime = false;
      res.json(userInfo);
    }
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
<<<<<<< HEAD
    const user = await User.create(req.body);

=======
    console.log('SIGNUP', req.body);
    const newUser = await User.create(req.body);
    const user = await User.findByPk(newUser.id, { include: [{ all: true }] });
>>>>>>> 3db433450dc992d905789b9c0c8ddce5725e72b7
    req.login(user, err => (err ? next(err) : res.json(user)));
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.post('/logout', (req, res) => {
  req.logout();
  req.session.destroy();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  res.json(req.user);
});

router.use('/google', require('./google'));
