import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
require("dotenv").config();

import { Request, Response, NextFunction } from "express";
import { currentUserRouter } from "./routes/current-user";
import { signupRouter } from "./routes/signup";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";

import { errorHandler } from "@diagnostiya/commmon";

// import { errorHandler } from "./middlewares/error-handler";

const app = express();
// app.set("trust proxy", true);

app.get("/usuarios/hola", (req, res) => {
  res.send("hola tu ");
});

app.use(json());

app.use(
  cookieSession({
    signed: false,
    // secure: true,
  })
);

app.use(currentUserRouter);
app.use(signupRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("connected to mongo");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Hola, bebe, listening on port 3000!!!");
  });
};
start();
