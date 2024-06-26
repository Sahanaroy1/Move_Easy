const { signToken } = require('../utils/auth');
const User = require('../models/User');
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
    user: async (_, { email }) => User.findOne({ email }).populate('properties')
    
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
    }
  }
};

module.exports = resolvers;
