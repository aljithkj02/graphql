import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient();

export const resolvers = {
    Query: {
        async users() {
            return await Prisma.user.findMany();
        },
        async messages() {
            return await Prisma.message.findMany();
        }
    }
}