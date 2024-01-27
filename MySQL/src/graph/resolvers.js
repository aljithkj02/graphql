import { PrismaClient } from '@prisma/client'

const Prisma = new PrismaClient();

export const resolvers = {
    Query: {
        async users() {
            return await Prisma.user.findMany();
        },
        async todos(_, { id }) {
            return await Prisma.todo.findMany({
                where: {
                    ...(id && { userId: Number(id)  }),
                }
            })
        }
    },
    Mutation: {
        async registerUser(_, { Input }) {
            const { name, email, password } = Input;
            const isUserExist = await Prisma.user.findUnique({ where: { email }})
            
            if(isUserExist) {
                throw new Error('User with this email already exist!');
            }

            return await Prisma.user.create({
                data: {
                    name, email, password
                }
            })
        },
        async loginUser(_, { Input }) {
            const { email, password } = Input;
            const user = await Prisma.user.findUnique({
                where: { email }    
            });

            if(!user) {
                throw new Error('User doesn\'t exist!');
            }

            if(user.password !== password) {
                throw new Error('Incorrect password!');
            }
            return user;
        },
        async addTodo(_, { Input }) {
            const { task, userId } = Input;
            return await Prisma.todo.create({
                data: { task, userId: Number(userId) }
            })
        }
    },
}