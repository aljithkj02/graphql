import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient();

export const resolvers = {
    Query: {
        async users() {
            return await Prisma.user.findMany();
        }
    },
    Mutation: {
        async registerUser(_, { Input }) {
            const { name, email, password } = Input;
            return await Prisma.user.create({
                data: {
                    name, email, password
                }
            })
        }
    }
}