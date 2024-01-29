import { PrismaClient } from '@prisma/client'
import { pubsub } from './typedefs.js';

const Prisma = new PrismaClient();

export const resolvers = {
    Query: {
        async users() {
            return await Prisma.user.findMany();
        },
        async messages() {
            return await Prisma.message.findMany();
        }
    },
    Mutation: {
        async register(_, { Input }) {
            const { name, email, password } = Input;
            const isUserExist = await Prisma.user.findUnique({ where: { email }});
            if(isUserExist){
                throw new Error("User with this email already exist!");
            }
            await Prisma.user.create({ data: { name, email, password }});
            return {
                status: true,
                message: "User registered successfully!"
            }
        },
        async login(_, { Input }) {
            const { email, password } = Input;
            const user = await Prisma.user.findUnique({ where: { email }});
            if(!user) {
                throw new Error('No such user exist!');
            }
            if(user.password !== password) {
                throw new Error('Incorrect password!');
            }
            return {
                status: true,
                message: "User login successfully!"
            }
        },
        async sendMessage(_, { Input }) {
            const { group, sendBy, text } = Input;
            await Prisma.message.create({ data: { group, sendBy, text }});
            return { 
                status: true,
                message: 'Successfully sent!'
            }
        }
    },
    Subscription: {
        newMessage: {
            subscribe: () => pubsub.asyncIterator(['NEW_MESSAGE'])
        }
    }
}