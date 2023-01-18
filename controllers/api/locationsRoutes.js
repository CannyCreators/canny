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
    console.log('test');
    const searchedLocation = await Locations.findByPk(req.params.id, {
        // include: [
        //     {
        //         model: Reviews,
        //         attributes: [
        //             'id',
        //             'location_name',
        //             'review',
        //             ''
        //         ]
        //     },
        //     {
        //         model: Tags,
        //         attributes: [
        //             'id',
        //             'tag_name'
        //         ]
        //     }
        // ]
    });
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

router.get('/names/:location_name', async (req, res) => {
    const searchedLocation = await Locations.findOne({
        where: {
            location_name: req.params.location_name
        }
    });
    const location = searchedLocation.get({ plain: true });
    res.json(location);
})

module.exports = router;
