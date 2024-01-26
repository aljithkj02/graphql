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
    },
    Post: {
        async author(parent) {
            return User.findOne({ _id: parent.author });
        }
    },
    Comment: {
        async commentedBy(parent) {
            return User.findOne({ _id: parent.author })
        },
        async post(parent) {
            return await Post.findOne({ _id: parent.post });
        }
    }
}