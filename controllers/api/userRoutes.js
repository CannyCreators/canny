const router = require('express').Router();
const path = require('path');
const { Reviews, Users, Locations } = require('../../models');
const withAuth = require('../../utils/auth');

//sign-up for new users
router.post('/', async (req, res) => {
  try {
    const dbUserData = await Users.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.users_id = dbUserData.id;
      req.session.logged_in = true;

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
        email: req.body.email
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
      req.session.users_id = dbUserData.id;
      req.session.logged_in = true;
      
      res.json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

//get all users
router.get('/', async (req, res) => {
  try {
      const allUsers = await Users.findAll()

      const allUsersDisplay = allUsers.map((user) =>
      user.get({plain: true})
      );
      res.render('userDisplay', {
        allUsersDisplay, 
        users_id: req.session.users_id, 
        logged_in: req.session.logged_in
      })
      // allUsers.json(allUsers)
      // console.log(allUsers)
  } catch (err) {
      res.status(400).json(err)
  }
})

//get one user by id
router.get('/:id', async (req, res) => {
  try {
    const userDB = await Users.findByPk(req.params.id, {
      incldue: [
        {
          model: Reviews
        }, 
        // {
        //   model: Locations
        // }
      ]
    });
    const oneUser = userDB.get({plain: true});

    res.render('userProfile', {
      oneUser, 
      users_id: req.session.users_id, 
      logged_in: req.session.logged_in
    })
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;
