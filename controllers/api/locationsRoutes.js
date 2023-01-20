const router = require('express').Router();
const path = require('path');
const { Locations, Reviews, Tags, Users } = require('../../models');

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
    res.render('locationDisplay', { locationDisplay });
})

// //get all reviews for location

// router.get('/reviews/:id', async (req, res) => {
//     try {
//         const locationsReviews = await Locations.findByPk(req.params.id, {

//             attributes: ['location_name', 'description'],
//             include: [{
//                 model: Reviews, attributes: ['title', 'review'],
//                 include: [{
//                     model: Users, attributes: ['name']
//                 }]
//             }]
//         });

//         if (!locationsReviews) {
//             res.status(400).json({ message: 'No location found!' })
//             return;
//         }

//         const reviewDisplay = locationsReviews.get({ plain: true });
//         // res.render('locationReviews', { reviewDisplay });
//         res.json(reviewDisplay)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

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
