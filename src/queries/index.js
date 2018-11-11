import { gql } from 'apollo-boost';

// Todo queries

export const GET_ALL_TODOS = gql`
query {
  getAllTodos {
    _id
    name
    imageUrl
    category
    description
    createdDate
    completion
    due
    username
  }
}
`;

export const GET_TODO_ITEM = gql`
query($_id: ID!) {
  getTodoItem(_id: $_id) {
    _id
    name
    imageUrl
    description
    createdDate
    due
    completion
    username
  }
}
`;

export const SEARCH_TODOS = gql`
query($searchTerm: String) {
  searchTodos(searchTerm: $searchTerm) {
    _id
    name
  }
}
`;

// Todo mutations

export const ADD_TODO = gql`
  mutation(
    $name: String!
    $category: String!
    $imageUrl: String!
    $description: String
    $due: String
    $username: String
  ) {
    addTodo(
      name: $name
      category: $category
      imageUrl: $imageUrl
      description: $description
      due: $due
      username: $username
    ) {
      _id
      name
      imageUrl
      description
      createdDate
      due
      username
    }
  }
`;

export const UPDATE_USER_TODO = gql`
  mutation(
    $_id: ID!
    $name: String!
    $imageUrl: String!
    $category: String!
    $description: String
    $due: String
  ) {
    updateUserTodo(
      _id: $_id
      name: $name
      category: $category
      imageUrl: $imageUrl
      description: $description
      due: $due
    ) {
      _id
      name
      imageUrl
      description
      category
      due
    }
  }
`;

export const DELETE_TODO = gql`
  mutation(
    $_id: ID!
  ) {
    deleteTodo(
      _id: $_id
    ) {
      _id
      name
    }
  }
`;

export const UPDATE_TODO = gql`
  mutation(
    $_id: ID!
    $username: String!
  ) {
    updateTodo(
      _id:  $_id
      username: $username
    ) {
      _id
      completion
    }
  }
`;

export const UNCOMPLETE_TODO = gql`
mutation(
  $_id: ID!
  $username: String!
) {
  uncompleteTodo(
    _id:  $_id
    username: $username
  ) {
    _id
    completion
  }
}
`;

// User queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      username
      email
      joinDate
      completed {
        _id
        name
        completion
      }
    }
  }
`;

export const GET_USER_TODOS = gql`
  query($username: String!) {
    getUserTodos(
      username: $username
    ) {
      _id
      name
      imageUrl
      completion
      due
    }
  }
`;


// User mutations

export const SIGNIN_USER = gql`
mutation(
  $username: String!,
  $password: String!
  ) {
    signinUser(
      username: $username,
      password: $password
    ) {
      token
    }
    }
`;


export const SIGNUP_USER = gql`
mutation(
  $username: String!,
  $email: String!,
  $password: String!
  ) {
    signupUser(
      username: $username,
      email: $email,
      password: $password
    ) {
      token
    }
    }
`;
