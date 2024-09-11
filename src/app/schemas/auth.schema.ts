import { Schema, Document } from 'mongoose';

export interface RevokedToken extends Document {
  token: string;
  revokedAt: Date;
}

export const RevokedTokenSchema = new Schema<RevokedToken>({
  token: { type: String, required: true },
  revokedAt: { type: Date, default: Date.now },
});
