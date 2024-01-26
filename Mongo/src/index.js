import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import dotenv from 'dotenv'
dotenv.config();
import { typeDefs } from './schema.js'
import { resolvers } from './resolver.js'
import { connectDB } from './config/db.js'

const server = new ApolloServer({
    typeDefs,
    resolvers
})

const startServer = async () => {
    await connectDB();
    const { url } = await startStandaloneServer(server, {
        listen: {
            port: 3000
        }
    });
    console.log('Server started', url);
}
 
startServer();