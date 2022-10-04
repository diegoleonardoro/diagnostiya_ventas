import express from "express";

import {currentUser, requireAuth} from "@diagnostiya/commmon";

// import { currentUser } from "../middlewares/current-user";
// import { requireAuth } from "../middlewares/require-auth";

import { User } from "../models/usuario";

const router = express.Router();

router.get("/usuarios/usuarioactual", currentUser, (req, res) => {
  //requireAuth
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
