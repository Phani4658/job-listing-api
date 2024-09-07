import { Schema, model } from "mongoose";

interface IUser {
  name: string;
  password: string;
  email: string;
  points: number;
  github_url: string;
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    github_url: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", UserSchema);
