const router = require('express').Router()

router.get('/', async (req, res) => {
    res.render('homepage');
});

router.get('/locationSearch', async (req, res)=> {
    res.render('locationSearch');
})

router.get('locationReviews')

module.exports = router;