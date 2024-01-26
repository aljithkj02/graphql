import { connect } from 'mongoose'

export const connectDB = async () => {
    try {
        const connection = await connect(process.env.MONGO_URL);
        console.log("MongoDB connected successfully!")
    } catch (error) {
        console.log(error.message);
    }
}