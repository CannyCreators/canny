const router = require('express').Router();
const { Locations, Tags } = require('../models');

router.get('/', async (req, res) => {
    const locationsDB = await Locations.findAll()
    const locations = locationsDB.map((location) => location.get({ plain: true }));
    res.render('homepage', { locations });
});

router.get('/locationSearch', async (req, res) => {
    const locationsList = [];
    res.render('locationSearch', { locationsList });
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

    res.render('locationSearch', { locationsList });
})

router.get('/locationCreate', async (req, res) => {
    res.render('locationCreate');
})

router.get('/reviewCreate/:id', async (req, res) => {
    res.render('reviewCreate');
})

router.get('/login', async (req, res) => {
    res.render('login');
})

router.get('/signup', async (req, res) => {
    res.render('signup');
})

router.get('locationReviews')

module.exports = router;