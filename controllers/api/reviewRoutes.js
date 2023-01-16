const router = require('express').Router();
const path = require('path');
const { Reviews, Users, Locations } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const createReview = await Reviews.create({
            title: req.body.title,
            review: req.body.review,
            //when this post is called by script with event listener, include locations_id, pull it from URL from locaiton page
            locations_id: req.body.locations_id,
            // users_id: req.session_users_id
            users_id: req.body.users_id
        });
        // res.status(200).json(createReview)
        const reviewDisplay = createReview.get({ plain: true });
    res.render('reviews', { reviewDisplay });
    } catch (err) {
        res.status(400).json(err);
    }
});

// router.get('/', async (req, res) => {
//     try {
//         const allUserReviews = await Reviews.findAll({

//         })
//     }
// })
module.exports = router;
