const router = require('express').Router();
const {Locations, Tags} = require('../models');

router.get('/', async (req, res) => {
    const locationsDB = await Locations.findAll()
    const locations = locationsDB.map((location) => location.get({ plain: true }));
    res.render('homepage', {locations});
});

router.get('/locationSearch', async (req, res)=> {
    res.render('locationSearch');
})

router.get('/locationCreate', async (req, res)=> {
    res.render('locationCreate');
})

router.get('/api/reviews/location/', async (req, res)=> {
    res.render('/locationReviews/');
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
