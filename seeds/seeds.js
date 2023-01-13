const sequelize = require('../config/connection');
const {Locations} = require('../models');

const locationData = require('./locations-seeds.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    await Locations.bulkCreate(locationData, {
        individualHooks: true,
        returning: true,
    });
};

seedDatabase();