import { JwtPayload } from "jsonwebtoken";

export type TUser = {
  name: string;
  password?: string;
  github_url?: string;
  points?: number;
  email: string;
  _id: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
};

export type TPayload = string | JwtPayload | null | undefined;
