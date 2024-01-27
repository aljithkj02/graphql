import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const server = new ApolloServer({

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