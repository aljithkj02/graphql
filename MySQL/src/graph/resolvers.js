import { PrismaClient } from '@prisma/client'
import { signToken } from '../helpers/jwt.helper.js';

const Prisma = new PrismaClient();

export const resolvers = {
    Query: {
        async users() {
            return await Prisma.user.findMany();
        },
        async todos(_, __, context) {
            const { id } = context.req.user;
            return await Prisma.todo.findMany({
                where: {
                    userId: {
                        not: id
                    }
                }
            })
        },
        async myTodos(_, __, context) {
            const { id } = context.req.user;
            return await Prisma.todo.findMany({
                where: {
                    userId: id
                }
            })
        }
    },
    Todo: {
        async user(parent) {
            return await Prisma.user.findUnique({
                where: {
                    id: parent.userId
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

            const user = await Prisma.user.create({
                data: {
                    name, email, password
                }
            })

            const token = signToken({ id: user.id });
            return {
                status: true,
                token
            }
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
            const token = signToken({ id: user.id });
            return {
                status: true,
                token
            };
        },
        async addTodo(_, { Input }, context) {
            const { task } = Input;
            const { id } = context.req.user;
            await Prisma.todo.create({
                data: { task, userId: id }
            })

            return {
                status: true,
                message: "Todo created successfully!"
            }
        },
        async updateTodo(_, { Input }, context) {
            const { id, task, status } = Input;
            const { id: user } = context.req.user;
            const todo = await Prisma.todo.findUnique({
                where: { id: Number(id), userId: user }
            })

            if(!todo) {
                throw new Error('There is no such todo exist!');
            }
            await Prisma.todo.update({
                where: { id: Number(id) },
                data: {
                    task, status
                }
            })
            return {
                status: true,
                message: 'Todo updated successfully!'
            }
        }
    },
}