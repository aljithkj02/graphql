import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import { typeDefs } from './schema'
import { authors, games, reviews } from './_db'

const resolvers = {
    Query: {
        games() {
            return games;
        },
        reviews() {
            return reviews;
        },
        authors() {
            return authors;
        },
        review(_: any, args: any) {
            return reviews.find((item) => item.id === args.id);
        }
    }
};

(async () => { 
    const server = new ApolloServer({
        // typeDefs -- Definitions of types of data 
        // resolvers
        typeDefs,
        resolvers
    })
    
    const { url } = await startStandaloneServer(server, {
        listen: {
            port: 4000
        }
    })
    
    console.log('Server ready at port: 4000')
})()