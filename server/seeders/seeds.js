const propertySeeds = require('./propertySeeds.json');
const { Property } = require('../models');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  await cleanDB('Property', 'property');

  await Property.create(propertySeeds);

console.log('properties seeded');

process.exit(0);
});
