const router = require('express').Router();

const userRoutes = require('./userRoutes');
const locationsRoutes = require('./locationsRoutes');
// const ratingRoutes = require('./ratingRoutes');
const reviewRoutes = require('./reviewRoutes');
// const tagRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/locations', locationsRoutes);
// router.use('/ratings', ratingRoutes);
router.use('/reviews', reviewRoutes);
// router.use('/tags', tagRoutes);

module.exports = router;
