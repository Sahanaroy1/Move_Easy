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
  mutation addProperty($address: String!, $price: Float!, $description: String!) {
    addProperty(address: $address, price: $price, description: $description) {
      _id
      address
      price
      description
    }
  }
`;
