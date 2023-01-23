const router = require('express').Router();
const { Locations } = require('../models');
const withAuth = require('../utils/auth');

router.get('/:userCity', async (req, res) => {
    const userCity = req.params.userCity;
    const locationsDB = await Locations.findAll({
        where: {
            city: userCity
        }
    });
    const locations = locationsDB.map((location) => location.get({ plain: true }));
    res.render('homepage', { 
        locations,
        userCity,
        logged_in: req.session.logged_in
    });
});

router.get('/', async (req, res) => {
    const locations = [];
    res.render('homepage', {locations});
})

router.get('/locationSearch', async (req, res) => {
    const locationsList = [];
    res.render('locationSearch', { 
        locationsList, 
        users_id: req.session.users_id, 
        logged_in: req.session.logged_in });
});

router.get('/locationSearch/:city_name', async (req, res) => {

    const locationsData = await Locations.findAll({
        where: {
            city: req.params.city_name
        }
    });
    const locationsList = locationsData.map((location) =>
        location.get({ plain: true })
    );

    res.render('locationSearch', { 
        locationsList, 
        users_id: req.session.users_id, 
        logged_in: req.session.logged_in });
})

router.get('/locationCreate', withAuth, async (req, res) => {
    res.render('locationCreate', {
        users_id: req.session.users_id, 
        logged_in: req.session.logged_in
    });
})

// router.get('/locationDisplay', async (req, res) => {
//     res.render('locationDisplay',)
// })

router.get('/api/locations/', async (req, res) => {
    res.render('locationDisplay')
})

router.get('/api/reviews/location/:id', async (req, res)=> {
    res.render('/locationReviews/');
})

router.get('/reviewCreate/:id', withAuth, async (req, res) => {
    res.render('reviewCreate', {
        logged_in: req.session.logged_in,
    });
})

router.get('/api/users/all', async (req, res) => {
    res.render('userDisplay')
})

router.get('/login', async (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage')
    }
    res.render('login');
})

router.get('/signup', async (req, res) => {
    res.render('signup');
})

module.exports = router;
