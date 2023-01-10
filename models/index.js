const Users = require('./Users');
const Locations = require('./Locations');
const Ratings = require('./Ratings');
const Reviews = require('./Reviews');
const Tags = require('./Tags');
const LocationTags = require('./LocationTags');

Locations.hasMany(Tags, {
    foreignKey: 'tags_id',
});
Locations.hasMany(Reviews, {
    foreignKey: 'reviews_id',
});


Reviews.belongsTo(Locations, {
    foreignKey: 'locations_id',
});
Reviews.belongsTo(Users, {
    foreignKey: 'users_id',
});
Reviews.hasMany(Tags, {
    foreignKey: 'tags_id',
    through: LocationTags,
});


Tags.belongsTo(Locations, {
    foreignKey: 'locations_id',
});
Tags.hasMany(Reviews, {
    foreignKey: 'reviews_id',
    through: LocationTags,
});


Users.hasMany(Reviews, {
    foreignKey: 'reviews_id',
});


module.exports = { Users, Locations, Ratings, Reviews, Tags, LocationTags };