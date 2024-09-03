import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
    id: number;
    email: string;
    passwordHash: string;
    username: string;
}

const UserSchema: Schema = new Schema({
    id: { type: Number },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    username: { type: String, required: true, unique: true }
});

export const User = mongoose.model<IUser>("User", UserSchema);