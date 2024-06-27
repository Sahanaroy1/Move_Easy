const { gql } = require('apollo-server');

const typeDefs = gql`
  interface User {
    _id: ID
    username: String
    email: String
    password: String
    type: String
  }

  type Agent implements User {
    _id: ID
    username: String
    email: String
    password: String
    type: String
    properties: [Property]!
  }

  type Customer implements User {
    _id: ID
    username: String
    email: String
    password: String
    type: String
  }

  type Property {
    _id: ID
    address: String
    price: Float
    description: String
    createdAt: String
    agent: Agent
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(email: String!): User
    properties: [Property]
    property(propertyId: ID!): Property
    agentProperties: [Property]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, type: String!): Auth
    login(email: String!, password: String!): Auth
    addProperty(email: String!, address: String!, price: Float!, description: String!): Property
    editProperty(propertyId: ID!, address: String, price: Float, description: String): Property
    removeProperty(propertyId: ID!): Property
  }
`;

module.exports = typeDefs;
