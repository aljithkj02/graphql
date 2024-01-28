
export const typeDefs = `#graphql
    scalar Date

    type User {
        id: ID!
        name: String!
        email: String!
        role: String!
        createdAt: Date!
        updatedAt: Date!
    }

    type Todo {
        id: ID!
        task: String!
        status: String!
        createdAt: Date!
        updatedAt: Date!
        userId: ID!
    }

    type Query {
        users: [User]
        todos(id: ID): [Todo]
    }

    type Mutation {
        registerUser(Input: registerUserInput!): User
        loginUser(Input: loginUserInput!): AuthResponse
        addTodo(Input: addTodoInput!): AuthResponse
    }

    type AuthResponse {
        status: Boolean!
        token: String!
    }

    input registerUserInput {
        name: String!
        email: String!
        password: String!
    }

    input loginUserInput {
        email: String!
        password: String!
    }

    input addTodoInput {
        task: String!
        userId: ID!
    }
`