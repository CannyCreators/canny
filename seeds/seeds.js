const sequelize = require('../config/connection');
const {Locations, Reviews, Users} = require('../models');

const locationData = require('./locations-seeds.json');
const reviewData = require('./reviews-seeds.json');
const userData = require('./users-seeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Locations.bulkCreate(locationData, {
        individualHooks: true,
        returning: true,
    });

    await Users.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    await Reviews.bulkCreate(reviewData, {
        individualHooks: true,
        returning: true,
    });
};

seedDatabase();