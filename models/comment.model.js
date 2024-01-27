import { model, Schema } from 'mongoose';

const CommentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ret: 'Post' },
    userName: { type: String, required: true },
    message: { type: String, required: true },
});

const CommentModel = model('Comment', CommentSchema);

export default CommentModel;