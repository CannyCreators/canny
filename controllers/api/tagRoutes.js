const router = require('express').Router();
const path = require('path');
const { Reviews, Users, Locations, Tags } = require('../../models');

//get all tags from a single location by location id
router.get('/locations/:locations_id', async (req, res) => {
    console.log("----testing----")
    try {
        const locationTags = await Tags.findAll({
            where: {
                locations_id: req.params.locations_id
            },
            include: [
                {
                    model: Locations,
                }
            ]
        });

        if (!locationTags) {
            res.status(400).json({ message: 'No location found with that tag!' })
            return;
        }
        //maping over array of all reviews for user
          const locationTagDisplay = locationTags.map((reviews) => 
          reviews.get({plain: true})
          );

          res.render('locationTagDisplay', {
            locationTagDisplay
          });
        
        // res.status(200).json(locationDisplay)
        // console.log(locationDisplay)
    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
});
