import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
require("dotenv").config();

import { compradoresRouter } from "./routes/compradores";

const app = express();

app.get("/compradores/jiji", (req, res) => {
  res.send("hola tu ");
});

app.use(json());


app.use(compradoresRouter);

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("connected to mongo");
  } catch (err) {
    console.error(err);
  }
  app.listen(3000, () => {
    console.log("Hola, bebe,  listening on port 3000!!!");
  });
};
start();
