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
    city: String
    postcode: String
    price: Float
    description: String
    createdAt: String
    agent: Agent
    images: [String] # Array of image URLs
    latitude: Float
    longitude: Float
    bedrooms: Int
    propertyType: String
    saved: Boolean 
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
    savedProperties: [Property]

  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, type: String!): Auth
    login(email: String!, password: String!): Auth
    addProperty(
      address: String!, 
      city: String!, 
      postcode: String!, 
      price: Float!, 
      description: String!, 
      images: [String], 
      latitude: Float!, 
      longitude: Float!, 
      bedrooms: Int!,
      propertyType: String!
    ): Property
    editProperty(
      propertyId: ID!, 
      address: String, 
      city: String, 
      postcode: String, 
      price: Float, 
      description: String, 
      images: [String], 
      latitude: Float!, 
      longitude: Float!,
      bedrooms: Int,
      propertyType: String
    ): Property
    removeProperty(propertyId: ID!): Property
    toggleSaveProperty(propertyId: ID!): Property

  }
`;

module.exports = typeDefs;
