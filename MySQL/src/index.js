import { ApolloServer } from '@apollo/server'
import { ApolloServer as ApolloServerExpress } from 'apollo-server-express'
import { startStandaloneServer } from '@apollo/server/standalone'
import express from 'express'
import { typeDefs } from './graph/typeDef.js'
import { resolvers } from './graph/resolvers.js'



const startServer = async () => {
    const server = new ApolloServer({
        typeDefs,
        resolvers
    })

    const { url } = await startStandaloneServer(server, {
        listen: {
            port: 3000
        }
    })
    console.log("Server setup ", url)
}

const startExpressServer = async () => {
    const server = new ApolloServerExpress({
        typeDefs,
        resolvers
    })

    const app = express();
    await server.start();

    server.applyMiddleware({ app });

    app.get('/', (req, res) => {
        res.json({
            status: true,
            message: "Welcome to my Todo Application"
        })
    })
    
    app.listen(4000, () => {
        console.log("Server started on: localhost:4000");
        console.log(server.graphqlPath);
    })
}


// startServer();
startExpressServer();
