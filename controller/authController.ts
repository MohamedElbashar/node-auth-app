/** @format */

import { Request, Response } from "express";

const register_get = (req: Request, res: Response) => {
  res.render("register");
};

const login_get = (req: Request, res: Response) => {
  res.render("login");
};

const register_post = (req: Request, res: Response) => {
  res.send("new register");
};

const login_post = (req: Request, res: Response) => {
  res.send("  user login");
};

export default { register_get, login_get, register_post, login_post };
