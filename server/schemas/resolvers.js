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
      if (!context.user || context.user.type !== 'AGENT') {
        throw new AuthenticationError('Unauthorized access');
      }
      const agentId = context.user._id;
      const properties = await Property.find({ agent: agentId });
      return properties;
    },
    properties: async () => Property.find({}),
    property: async (_, { propertyId }) => Property.findById(propertyId),
    savedProperties: async (_, __, context) => {
      if (!context.user) {
        throw new AuthenticationError('Unauthorized access');
      }
      const savedProperties = await Property.find({ saved: true });
      return savedProperties;
    },
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

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new AuthenticationError('Invalid credentials');
      }

      const token = signToken(user);
      return { token, user };
    },
    addProperty: async (
      _,
      {
        address,
        city,
        postcode,
        price,
        description,
        images,
        latitude,
        longitude,
        bedrooms,
        propertyType
      },
      context
    ) => {
      const user = await User.findOne({ email: context.user.email });
      if (!user || user.type !== 'AGENT') {
        throw new AuthenticationError('Only agents can add properties');
      }

      const property = new Property({
        address,
        city,
        postcode,
        price,
        description,
        createdAt: new Date().toISOString(),
        agent: user._id,
        images: images || [], // Ensure images are initialized as an empty array if not provided
        latitude,
        longitude,
        bedrooms,
        propertyType
      });

      await property.save();

      user.properties.push(property);
      await user.save();

      return property;
    },
    editProperty: async (
      _,
      {
        propertyId,
        address,
        city,
        postcode,
        price,
        description,
        images,
        latitude,
        longitude,
        bedrooms,
        propertyType
      },
      context
    ) => {
      const property = await Property.findById(propertyId);
      if (!property) throw new Error('Property not found');

      if (context.user._id.toString() !== property.agent.toString()) {
        throw new AuthenticationError('You do not have permission to edit this property');
      }

      if (address) property.address = address;
      if (city) property.city = city;
      if (postcode) property.postcode = postcode;
      if (price) property.price = price;
      if (description) property.description = description;
      if (images) property.images = images;
      if (latitude) property.latitude = latitude;
      if (longitude) property.longitude = longitude;
      if (bedrooms) property.bedrooms = bedrooms;
      if (propertyType) property.propertyType = propertyType;

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
    toggleSaveProperty: async (_, { propertyId }, context) => {
      const { user } = context;

      // Check if user is authenticated
      if (!user) {
        throw new AuthenticationError('Authentication required');
      }

      try {
        // Find the property by ID
        const property = await Property.findById(propertyId);
        if (!property) {
          throw new Error('Property not found');
        }

      
        // Toggle the saved status
        property.saved = !property.saved;
        await property.save();

        return property;
      } catch (err) {
        throw new Error(`Error toggling saved status: ${err.message}`);
      }
    },
  },
};
 
module.exports = resolvers;
