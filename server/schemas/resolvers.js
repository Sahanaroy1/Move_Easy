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
    agentProperties: async (_, __, context) => {
      // Ensure the user is authenticated as an agent
      console.log(context.user);
      if (!context.user || context.user.type !== 'AGENT') {
        throw new AuthenticationError('Unauthorized access');
      }

      // Fetch properties belonging to the logged-in agent
      const agentId = context.user._id; // Assuming user._id represents the agent's ID
      const properties = await Property.find({ agent: agentId });

      return properties;
    },
  
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
    addProperty: async (_, { email, address, price, description }, context) => {
      const user = await User.findOne({ email });
      if (!user || user.type !== 'AGENT') {
        throw new AuthenticationError('Only agents can add properties');
      }

      const property = new Property({
        address,
        price,
        description,
        createdAt: new Date().toISOString(),
        agent: user._id,
      });

      await property.save();

      user.properties.push(property);
      await user.save();

      return property;
    },
    editProperty: async (_, { propertyId, address, price, description }, context) => {
      const property = await Property.findById(propertyId);
      if (!property) throw new Error('Property not found');

      if (context.user._id.toString() !== property.agent.toString()) {
        throw new AuthenticationError('You do not have permission to edit this property');
      }

      if (address) property.address = address;
      if (price) property.price = price;
      if (description) property.description = description;

      await property.save();

      return property;
    },
    removeProperty: async (_, { propertyId }, context) => {
      const property = await Property.findById(propertyId);
      if (!property) throw new Error('Property not found');

      if (context.user._id.toString() !== property.agent.toString()) {
        throw new AuthenticationError('You do not have permission to remove this property');
      }

      await Property.findByIdAndRemove(propertyId);
      return property;
    },
  },
};

module.exports = resolvers;
