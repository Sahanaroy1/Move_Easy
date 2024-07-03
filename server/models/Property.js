const { Schema, model } = require('mongoose');

const propertySchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  postcode: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    required: true,
  },
  agent: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  images: {
    type: [String], // Array of image URLs
    default: [],
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  bedrooms: {
    type: Number,
    required: true,
  },
  propertyType: {
    type: String,
    enum: ['Detached', 'Semi-Detached', 'Terraced', 'Bungalow', 'Flat', 'Apartment'],
    required: true,
  },
  propertyTitle: {
    type: String,
    required: true,
  },
  propertyUrl: {
    type: String,
  },
  contactUrl: {
    type: String,
  },
});

const Property = model('Property', propertySchema);

module.exports = Property;
