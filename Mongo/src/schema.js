
export const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: ID!
    }

    type Comment {
        id: ID!
        content: String!
        author: ID!
        post: ID!
    }

    type Query {
        users: [User]
        user(id: ID!): User
        posts: [Post]
        post(id: ID!): Post
        comments(postId: ID!): [Comment]
    }
`