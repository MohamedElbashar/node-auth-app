/** @format */

import express from "express";
import { Request, Response } from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(express.json());
app.use(express.static("public"));
app.use(cookieParser());
// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://mohamed:mohamed@cluster0.ab9zd.mongodb.net/node-auth";
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("/", (req: Request, res: Response) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);

//cookies
app.get("/set-cookies", (req: Request, res: Response) => {
  res.cookie("newUser", false);
  res.cookie("isEmpolyee", true, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  // res.setHeader("Set-Cookie", "newUser=true");
  res.send("you got the cookies!");
});

app.get("/read-cookies", (req: Request, res: Response) => {
  const cookies = req.cookies;
  console.log(cookies.newUser);
  res.json(cookies);
});
