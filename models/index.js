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

Ratings.belongsTo(Reviews, {
    foreignKey: 'review_id'
})


Reviews.belongsTo(Locations, {
    foreignKey: 'locations_id',
});
Reviews.belongsTo(Users, {
    foreignKey: 'users_id',
});
Reviews.belongsToMany(Tags, {
    foreignKey: 'tags_id',
    through: LocationTags,
});
Reviews.hasMany(Ratings, {
    foreignKey: 'rating_id'
});


Tags.belongsTo(Locations, {
    foreignKey: 'locations_id',
});
Tags.belongsToMany(Reviews, {
    foreignKey: 'reviews_id',
    through: LocationTags,
});


Users.hasMany(Reviews, {
    foreignKey: 'reviews_id',
});


module.exports = { Users, Locations, Ratings, Reviews, Tags, LocationTags };