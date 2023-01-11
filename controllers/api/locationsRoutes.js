const router = require('express').Router();
const path = require('path');
const { Locations, Reviews, Tags } = require('../../models');

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
    const allLocations = locationsDB.get({plain: true});
    res.render('locationSearch', {allLocations})
})

router.get('/:id', async (req, res) => {
    const searchedLocation = await Locations.findByPk(req.params.id, {
        include: [
            {
                model: Reviews,
                attributes: [
                    'id',
                    'location_name',
                    'review',
                    ''
                ]
            },
            {
                model: Tags,
                attributes: [
                    'id',
                    'tag_name'
                ]
            }
        ]
    });
    const locationDisplay = searchedLocation.get({plain: true});
    res.render('locationDisplay', {locationDisplay});
})

module.exports = router;