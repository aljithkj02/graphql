
export const typeDefs = `#graphql
    scalar Date

    type User {
        id: Int!
        name: String!
        email: String!
        role: String!
        createdAt: Date!
        updatedAt: Date!
    }

    type Query {
        users: [User]
    }

    type Mutation {
        registerUser(Input: registerUserInput!): User
        loginUser(Input: loginUserInput!): User
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
`