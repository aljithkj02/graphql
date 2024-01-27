import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './graph/typeDef.js'
import { resolvers } from './graph/resolvers.js'

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: {
            port: 3000
        }
    })
    console.log("Server setup ", url)
}

startServer();