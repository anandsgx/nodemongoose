import mongoose, { Schema } from "mongoose";

const skillSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: false },
    skill: { type: String, required: false },
    exp: { type: Number, required: false }
}, { timestamps: true });

const skillModel = mongoose.model('skills', skillSchema, 'skills');

export default skillModel;