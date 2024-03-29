import { PrismaClient } from '@prisma/client';
import { authorizeToken } from '../helpers/jwt.helper.js'

const prisma = new PrismaClient();

export const authMiddleware = async (req, res, next) => {
    try {
        const operationName = req?.body?.operationName;
        if(['loginUser', 'registerUser'].includes(operationName)) {
            return next();
        }
        
        const token = req?.headers?.authorization?.split(' ').pop();

        if(!token) {
            return res.status(401).json({
                status: false,
                message: 'No token provided!'
            })
        }

        const data = authorizeToken(token);
        const user = await prisma.user.findUnique({
            where: { id: data?.id },
            select: {
                id: true,
                name: true,
                email: true,
                password: false
            }
        });
        
        if(!user) {
            return res.status(404).json({
                status: false,
                message: 'No such user exist!'
            })
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: 'Unauthorized!'
        })
        next(error);
    }
}