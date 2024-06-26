const { Schema, model } = require('mongoose');

const propertySchema = new Schema({
  address: {
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
    type: String,
    required: true,
  },
  agent: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

const Property = model('Property', propertySchema);

module.exports = Property;
