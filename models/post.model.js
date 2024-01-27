import { model, Schema } from 'mongoose';

const postSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ret: 'User' },
    title: { type: String, required: true },
    body: { type: String, required: true },
});

const PostModel = model('Post', postSchema);

export default PostModel;