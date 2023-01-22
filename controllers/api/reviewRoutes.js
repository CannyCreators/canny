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
            // locations_id: req.body.locations_id,
            users_id: req.session.users_id
            // users_id: 1
        });
        res.status(200).json(createReview)
        // const reviewDisplay = createReview.get({ plain: true });
        // res.render('submitedReview', { reviewDisplay });
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
            oneReviewDisplay
        });
        console.log(oneReviewDisplay)
        // res.status(200).json(oneReview)
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

        if (!userReveiws) {
            res.status(400).json({ message: 'No user found with that name!' })
            return;
        }
        
        //maping over array of all reviews for user
          const userDisplay = userReveiws.map((reviews) => 
          reviews.get({plain: true})
          );

          //pulling name and id from userDisplay array to pass to handlebar
          const userName = userDisplay[0].user.name;
          const userID = userDisplay[0].user.id;

          res.render('userReviews', {
            userDisplay, 
            userName, 
            userID
          });
        
        // res.status(200).json(userDisplay)
        // console.log(userDisplay)
        // console.log(userDisplay[0].user.name)
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

        if (!locationReviews) {
            res.status(400).json({ message: 'No location found with that id!' })
            return;
        }
        //maping over array of all reviews for user
          const locationDisplay = locationReviews.map((reviews) => 
          reviews.get({plain: true})
          );

          const locationName = locationDisplay[0].location.location_name;
          const locationID = locationDisplay[0].location.id;

          res.render('locationReviews', {
            locationDisplay, 
            locationName,
            locationID,
            users_id: req.session.users_id, 
            logged_in: req.session.logged_in
          });
        
        // res.status(200).json(locationDisplay)
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
                id:req.params.id
            }
        });

        if (!deleteReview) {
            res.status(404).json({ message: 'No review found with that id!'})
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
        // res.status(200).json(oneReview)
    } catch (err) {
        res.status(500).json(err);
    }
})
module.exports = router;
