const router = require('express').Router();
const path = require('path');
const { Reviews, Users, Locations } = require('../../models');
const withAuth = require('../../utils/auth');

//get all reviews
router.get('/', async (req, res) => {
    try {
        const allreviews = await Reviews.findAll()

        res.status(200).json(allreviews)
    } catch (err) {
        res.status(400).json(err)
    }
});

//post review
router.post('/', withAuth, async (req, res) => {
    try {
        const createReview = await Reviews.create({

            ...req.body,
            users_id: req.session.users_id

        });
        res.status(200).json(createReview)
        console.log(createReview);
    } catch (err) {
        res.status(400).json(err);
    }
});

//get single review by review id
router.get('/:id', async (req, res) => {
    console.log('testing')
    try {
        const oneReview = await Reviews.findByPk(req.params.id, {
            include: [
                {
                    model: Locations,
                },
                {
                    model: Users,
                }
            ]
        });
        const oneReviewDisplay = oneReview.get({ plain: true });

        res.render('oneReviewDisplay', {
            oneReviewDisplay, 
            users_id: req.session.users_id, 
            logged_in: req.session.logged_in
        });
        console.log(oneReviewDisplay)
    } catch (err) {
        res.status(500).json(err);
    }
});

//get all reviews from one user by user id
router.get('/users/:users_id', async (req, res) => {
    console.log("testing")
    try {
        const userReveiws = await Reviews.findAll({
            where: {
                users_id: req.params.users_id
            },
            include: [
                {
                    model: Locations,
                },
                {
                    model: Users,
                }
            ]
        });

        //maping over array of all reviews for user
        const userDisplay = userReveiws.map((reviews) =>
            reviews.get({ plain: true })
        );

        if (userDisplay.length == 0) {
            res.render('noUserReviews', {
                users_id: req.session.users_id, 
                logged_in: req.session.logged_in
            })
            return;
        }
        else {
            //pulling name and id from userDisplay array to pass to handlebar
            const userName = userDisplay[0].user.name;
            const userID = userDisplay[0].user.id;

            res.render('userReviews', {
                userDisplay,
                userName,
                userID, 
                users_id: req.session.users_id, 
                logged_in: req.session.logged_in
            });
        }
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//get all reviews from a single location by location id
router.get('/locations/:locations_id', async (req, res) => {
    console.log("testing")

    try {
        const locationReviews = await Reviews.findAll({
            where: {
                locations_id: req.params.locations_id
            },
            include: [
                {
                    model: Locations,
                },
                {
                    model: Users,
                }
            ]
        });

        //maping over array of all reviews for user
        const locationDisplay = locationReviews.map((reviews) =>
            reviews.get({ plain: true })
        );

        if (locationDisplay.length == 0) {
            const location_id = req.params.locations_id;

            res.render('noLocationReviews', {
                location_id, 
                users_id: req.session.users_id, 
                logged_in: req.session.logged_in
            })
            console.log(locationReviews)
            return;
        }
        else {
            const locationName = locationDisplay[0].location.location_name;
            const locationID = locationDisplay[0].location.id;

            res.render('locationReviews', {
                locationDisplay,
                locationName,
                locationID,
                users_id: req.session.users_id,
                logged_in: req.session.logged_in
            });
        }

        console.log(locationDisplay)
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});

//delete a single review by review id
router.delete('/:id', async (req, res) => {
    console.log('testing')
    try {
        const deleteReview = await Reviews.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deleteReview) {
            res.status(404).json({ message: 'No review found with that id!' })
            return;
        }

        res.render('deleteReviewDisplay');

    } catch (err) {
        res.status(500).json(err);
    }
})

//update single review by review id
router.put('/:id', async (req, res) => {
    console.log('testing')
    try {
        const updateReview = await Reviews.update(req.body, {
            where: {
                id: req.params.id
            },
            include: [
                {
                    model: Locations,
                },
                {
                    model: Users,
                }
            ]
        });
        const updateReviewDisplay = updateReview.get({ plain: true });

        res.render('updateReviewDisplay', {
            updateReviewDisplay
        });
        console.log(updateReviewDisplay)
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;