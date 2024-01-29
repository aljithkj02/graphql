
export const typeDefs = `#graphql
    type User {
        id: Int!
        name: String!
        email: String!
        password: String!
    }

    type Message {
        id: Int!
        group: Int!
        text: String!
        sendBy: Int!
        user: User!
    }

    type Query {
        users: [User]
        messages: [Message]
    }
`
  