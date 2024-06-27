const bcrypt = require('bcrypt');
const { signToken } = require('../utils/auth');
const User = require('../models/User');
const Property = require('../models/Property');
const { AuthenticationError } = require('apollo-server');

const resolvers = {
  User: {
    __resolveType(obj) {
      if (obj.properties) {
        return 'Agent';
      }
      return 'Customer';
    },
  },
  Query: {
    users: async () => User.find({}).populate('properties'),
    user: async (_, { email }) => User.findOne({ email }).populate('properties'),
    properties: async () => Property.find({}),
    property: async (_, { propertyId }) => Property.findById(propertyId),
  },
  Mutation: {
    addUser: async (_, { username, email, password, type }) => {
      const existingUser = await User.findOne({ email });
      if (existingUser) throw new AuthenticationError('User already exists');

      
      const user = new User({ username, email, password, type });

      await user.save();
      const token = signToken(user);
      return { token, user };
    },
    login: async (_, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Invalid credentials');
      }

      const valid = await user.isCorrectPassword(password);
      if (!valid) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addProperty: async (_, { email, address, price, description }) => {
      // Find the user by email to check if they are an agent
      const user = await User.findOne({ email });
      if (!user || user.type !== 'AGENT') {
        throw new AuthenticationError('Only agents can add properties');
      }

      // Create a new property document
      const property = new Property({
        address,
        price,
        description,
        createdAt: new Date().toISOString(),
        agent: user._id, // Assign the agent ID to the property
      });

      // Save the property to the database
      await property.save();

      // Update the user's properties array
      user.properties.push(property);
      await user.save();

      return property;
    },
    editProperty: async (_, { propertyId, address, price, description }) => {
      const property = await Property.findById(propertyId);
      if (!property) throw new Error('Property not found');

      if (address) property.address = address;
      if (price) property.price = price;
      if (description) property.description = description;
      await property.save();

      return property;
    },
    removeProperty: async (_, { propertyId }) => {
      const property = await Property.findById(propertyId);
      if (!property) throw new Error('Property not found');

      await Property.findByIdAndRemove(propertyId);
      return property;
    }
  }
};

module.exports = resolvers;
