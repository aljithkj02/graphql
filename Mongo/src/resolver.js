import { User } from './model/user.js'
import { Post } from './model/post.js'
import { Comment } from './model/comment.js'

export const resolvers = {
    Query: {
        async users() {
            return await User.find();
        },
        async user(_, { id }) {
            return await User.findOne({ _id: id })
        },
        async posts() {
            return await Post.find();
        },
        async post(_, { id }) {
            return await Post.findOne({ _id: id });
        },
        async comments(_, { postId }) {
            return await Comment.find({ post: postId });
        }
    }
}