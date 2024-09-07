import { Schema, Types, model } from "mongoose";
import { User } from "./user.model";

interface IJob {
  title: string;
  date: Date;
  link: string;
  applied_users: Types.ObjectId[];
}

const JobSchema = new Schema<IJob>(
  {
    title: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    link: {
      type: String,
      required: true,
    },
    applied_users: {
      type: [Schema.Types.ObjectId],
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

export const Job = model<IJob>("Job", JobSchema);
