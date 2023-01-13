const router = require('express').Router();
const path = require('path');
const { Reviews } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const createReview = await Reviews.create({
            title: req.body.title,
            review: req.body.review,
        });
        res.status(200).json(createReview)
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
