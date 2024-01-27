import { Schema, model } from 'mongoose';

const tokenSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ret: 'User' },
    refreshToken: { type: String, required: true },
})

const TokenModel = model('Token', tokenSchema);

export default TokenModel;