const router = require('express').Router();
const { Users, Reviews, Locations } = require('../../models');

//get reviews of one user
router.get('/reviews/:name', async (req, res) => {
  try {
    const userReveiws = await Users.findAll({
      where: {
        name: req.params.name
      },
      attributes: ['name', 'email'],
      include: [{
        model: Reviews, attributes: ['title', 'review'],
        include: [{model:Locations, attributes: ['location_name']}]
      }]
  });

if (!userReveiws) {
  res.status(400).json({ message: 'No user found with that name!' })
  return;
}

res.status(200).json(userReveiws)
  } catch (err) {
  res.status(500).json(err);
}
})

router.post('/', async (req, res) => {
  try {
    const dbUserData = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;

      res.status(200).json(dbUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await Users.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
