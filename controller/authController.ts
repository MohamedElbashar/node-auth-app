/** @format */

import { EEXIST } from "constants";
import { Request, Response } from "express";
import user from "../models/user";

const handleErrors = (err: any) => {
  console.log(err.message, err.code);
  let errors: any = { email: "", password: "" };

  //duplicate error code
  if (err.code === 11000) {
    errors.email = "that email is already registered";
    return errors;
  }

  //validation error
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }: any) => {
      console.log(properties);
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};
const register_get = (req: Request, res: Response) => {
  res.render("register");
};

const login_get = (req: Request, res: Response) => {
  res.render("login");
};

const register_post = async (req: any, res: Response) => {
  const { email, password } = req.body;

  try {
    const created_user = await user.create({ email, password });
    res.status(201).json(created_user);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const login_post = (req: Request, res: Response) => {
  res.send("  user login");
};

export default { register_get, login_get, register_post, login_post };
