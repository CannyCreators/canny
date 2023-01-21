const router = require('express').Router();
const path = require('path');
const { Locations } = require('../../models');

router.get('/', async (req, res) => {
    const locationsDB = await Locations.findAll({
        include: [
            {
                model: Tags,
                attributes: [
                    'id',
                    'tag_name'
                ]
            }
        ]
    });
    const allLocations = locationsDB.get({ plain: true });
    res.render('locationSearch', { allLocations })
})

router.get('/:id', async (req, res) => {
    const searchedLocation = await Locations.findByPk(req.params.id);
    const locationDisplay = searchedLocation.get({ plain: true });
    res.render('locationDisplay', { locationDisplay, 
        users_id: req.session.users_id, 
        logged_in: req.session.logged_in });
})

// Search by location name

router.post('/', async(req, res) => {
    try {
        const location = Locations.create(req.body);
        res.status(200).json(location);
    } catch (err) {
        res.status(400).json(err);
    }
})

module.exports = router;
