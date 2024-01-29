import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();

const publishNewMessage = (message, user, id) => {
    pubsub.publish('NEW_MESSAGE', {
        newMessage: { message, user, id }
    })
}

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

    type Mutation {
        register(Input: RegisterUserInput!) : Response
        login(Input: LoginUserInput!) : Response
        sendMessage(Input: SendMessageInput!): Response
    }

    type Subscription {
        newMessage: Message!
    }

    type Response {
        status: Boolean!
        message: String!
    }

    input RegisterUserInput {
        name: String!
        email: String!
        password: String!
    }

    input LoginUserInput {
        email: String!
        password: String!
    }

    input SendMessageInput {
        group: Int!
        text: String!
        sendBy: Int!
    }
`
  