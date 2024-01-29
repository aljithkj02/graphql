import { ApolloServer  } from 'apollo-server-express'
import express from 'express';
import { WebSocketServer } from 'ws'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { createServer } from 'http'
import { useServer } from 'graphql-ws/lib/use/ws'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import { expressMiddleware } from '@apollo/server/express4'

import { typeDefs } from './typedefs.js'
import { resolvers } from './resolvers.js'

const schema = makeExecutableSchema({ typeDefs, resolvers });

const startServer = async () => {
    const app = express();

    const httpServer = createServer(app);

    app.get('/', (req, res) => {
        res.json({
            status: true,
            message: "Welcome to my server!"
        })
    })

    const wsServer = new WebSocketServer({
        server: httpServer,
        path: '/graphql'
    })

    const wsServerCleanup = useServer({ schema }, wsServer);


    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            {
                async serverWillStart() {
                    return {
                        async drainServer(){
                            await wsServerCleanup.dispose();
                        }
                    }
                }
            }
        ]
    })
    
    await server.start();
    server.applyMiddleware({ app, path: '/graphql'})
    app.use('/graphql', express.json(), expressMiddleware(server));

    httpServer.listen(4000, () => {
        console.log('Server started on port 4000');
    })
}

startServer();