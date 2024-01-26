
export const typeDefs = `#graphql
    type User {
        id: ID!
        name: String!
        email: String!
    }

    type Post {
        id: ID!
        title: String!
        content: String!
        author: User!
    }

    type Comment {
        id: ID!
        content: String!
        commentedBy: User!
        post: Post!
    }

    type Query {
        users: [User]
        user(id: ID!): User
        posts: [Post]
        post(id: ID!): Post
        comments(postId: ID!): [Comment]
    }

    type Mutation {
        deletePost(id: ID!) : DeletedPostResponse
        addUser(user: AddUserInput!) : User
    }

    type DeletedPostResponse {
        acknowledged: Boolean, 
        deletedCount: Int
    }

    input AddUserInput {
        name: String!
        email: String!
        password: String!
    }
`