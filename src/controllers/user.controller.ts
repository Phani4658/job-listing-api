import bcrypt from "bcrypt";
import { User } from "../models/user.model";
import { RefreshToken } from "../models/refresh-token.model";
import { generateTokens } from "../utils";
import type { Request, Response } from "express";
import { getTokenInfo } from "../utils";

export const signup = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const user_email = await User.findOne({ email: body.email });

    console.log(user_email);

    if (user_email) {
      let message = "Email already exists";
      return res.status(400).json({ error: true, message });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(body.password, salt);
    const new_user = await User.create({ ...body, password: hashedPassword });

    return res.status(201).json({
      error: false,
      message: "User created successfully",
      user: {
        username: new_user.name,
        email: new_user.email,
        points: new_user.points,
        github_url: new_user.github_url,
        _id: new_user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const invalid_error_object = {
      error: true,
      message: "Email or password is wrong",
    };

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json(invalid_error_object);
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      return res.status(400).json(invalid_error_object);
    }

    const tokens = await generateTokens(user);

    res.status(200).json({
      error: false,
      access_token: tokens?.access_token,
      message: "User logged in successfully",
      user: {
        name: user.name,
        email: user.email,
        points: user.points,
        github_url: user.github_url,
        _id: user._id,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const refresh = async (req: Request, res: Response) => {
  const current_user = req.body.user;
  const user_id = JSON.parse(current_user)._id;

  try {
    const refresh_token_doc = await RefreshToken.findOne({ user_id: user_id });
    const token_info = getTokenInfo({
      token: refresh_token_doc?.refresh_token || "",
      token_type: "refresh",
    });

    if (token_info?.user && token_info?.is_valid_token) {
      const tokens = await generateTokens(token_info?.user);
      return res.status(200).json({
        error: false,
        user: token_info?.user,
        access_token: tokens?.access_token,
        message: "Token refreshed successfully",
      });
    }

    return res.status(200).json({
      error: true,
      status: 407,
      message: "Refresh token is not valid or not found. Login Again.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const validate = async (req: Request, res: Response) => {
  const token = req.body.access_token;

  const is_valid_token = getTokenInfo(token)?.is_valid_token;

  if (is_valid_token) {
    res.status(200).json({
      error: false,
      message: "Token is valid",
    });
  } else {
    refresh(req, res);
  }
};

export const users = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).sort({ points: 1 });
    res.status(200).json({ error: false, users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const likeUser = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;

  try {
    const like_user = await User.findByIdAndUpdate(
      user_id,
      { $inc: { points: 1 } },
      { new: true }
    );

    if (!like_user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    res.status(200).json({ error: false, message: "User liked successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;
  const update_data = req.body.update_data;

  try {
    const updated_user = await User.findByIdAndUpdate(user_id, update_data, {
      new: true,
    });

    if (!updated_user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    res.status(200).json({ error: false, user: updated_user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;

  try {
    const deleted_user = await User.findByIdAndDelete(user_id);

    if (!deleted_user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    res
      .status(200)
      .json({ error: false, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

export const getUserData = async (req: Request, res: Response) => {
  const user_id = req.params.user_id;

  try {
    const user_data = await User.findById(user_id);

    if (!user_data) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    res.status(200).json({ error: false, user: user_data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

