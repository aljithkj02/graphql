import { Schema, model } from "mongoose";
import { Comment } from "./comment.js";

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true
});

postSchema.pre('deleteOne', { document: true, query: true }, async function(next) {
    await Comment.deleteMany({ post: this._id });
    next();
})

export const Post = model('Post', postSchema);