const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');
const { AuthenticationError } = require('apollo-server');


const secret = 'mysecretssshhhhhhh';
const expiration = '2h';

module.exports = {
  AuthenticationError: new GraphQLError('Could not authenticate user.', {
    extensions: {
      code: 'UNAUTHENTICATED',
    },
  }),
  authMiddleware: function ({req}) {
    // allows token to be sent via  req.query or headers
    let token = req.body.token || req.query.token || req.headers.authorization;

    // ["Bearer", "<tokenvalue>"]
    if (req.headers.authorization) {
      token = token.split(' ').pop().trim();
    }
    if (!token) {
      return req;
    }
    try {
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch(error) {
      console.log('Invalid token', error.message);
    }

    return req;
  },
  signToken: function ({ email, username, _id, type }) {
    const payload = { email, username, _id, type };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};
