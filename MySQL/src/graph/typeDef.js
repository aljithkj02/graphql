
export const typeDefs = `#graphql
    scalar Date

    # Queries
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
        user: User!
    }

    type Query {
        users: [User]
        todos: [Todo]
        myTodos: [Todo]
    }

    # Mutations
    type Mutation {
        registerUser(Input: registerUserInput!): AuthResponse
        loginUser(Input: loginUserInput!): AuthResponse
        addTodo(Input: addTodoInput!): Todo
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