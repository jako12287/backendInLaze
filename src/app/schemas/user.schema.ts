import { Schema, Document } from "mongoose";

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isDeleted: { type: Boolean, default: false },
  favorites: [{ type: String }],
});

export interface User extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
  isDeleted?: boolean;
  favorites?: string[]
}
