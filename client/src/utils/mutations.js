import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $type: String!) {
    addUser(username: $username, email: $email, password: $password, type: $type) {
      token
      user {
        _id
        username
        email
        type
      }
    }
  }
`;

export const ADD_PROPERTY = gql`
  mutation addProperty(
    $address: String!, 
    $city: String!, 
    $postcode: String!, 
    $price: Float!, 
    $description: String!, 
    $images: [String],
    $latitude: Float!,
    $longitude: Float!,
    $bedrooms: Int!,
    $propertyType: String!
  ) {
    addProperty(
      address: $address, 
      city: $city, 
      postcode: $postcode, 
      price: $price, 
      description: $description, 
      images: $images,
      latitude: $latitude,
      longitude: $longitude,
      bedrooms: $bedrooms,
      propertyType: $propertyType
    ) {
      _id
      address
      city
      postcode
      price
      description
      images
      latitude
      longitude
      bedrooms
      propertyType
    }
  }
`;

export const EDIT_PROPERTY = gql`
  mutation editProperty(
    $propertyId: ID!,
    $address: String,
    $city: String,
    $postcode: String,
    $price: Float,
    $description: String,
    $images: [String],
    $latitude: Float!,
    $longitude: Float!,
    $bedrooms: Int,
    $propertyType: String
  ) {
    editProperty(
      propertyId: $propertyId,
      address: $address,
      city: $city,
      postcode: $postcode,
      price: $price,
      description: $description,
      images: $images,
      latitude: $latitude,
      longitude: $longitude,
      bedrooms: $bedrooms,
      propertyType: $propertyType
    ) {
      _id
      address
      city
      postcode
      price
      description
      images
      latitude
      longitude
      bedrooms
      propertyType
    }
  }
`;
export const DELETE_PROPERTY = gql`
  mutation removeProperty($propertyId: ID!) {
    removeProperty(propertyId: $propertyId) {
      _id
    }
  }
`;
export const TOGGLE_SAVE_PROPERTY = gql`
  mutation ToggleSaveProperty($propertyId: ID!) {
    toggleSaveProperty(propertyId: $propertyId) {
      _id
      saved
    }
  }
`;