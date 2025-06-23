// models/SessionToken.ts

import mongoose, { Schema, Document } from 'mongoose';

export interface ISessionToken extends Document {
  userId: mongoose.Types.ObjectId;
  accessToken: string;
  refreshToken: string;
  createdAt: Date;
  updatedAt: Date;
}

const sessionTokenSchema = new Schema<ISessionToken>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  accessToken: { type: String, required: true },
  refreshToken: { type: String, required: true },
}, { timestamps: true });

export const SessionToken = mongoose.models.SessionToken || mongoose.model('SessionToken', sessionTokenSchema);
