import express from "express";

const router = express.Router();

router.post("/usuarios/signout", (req, res) => {
  //Borrar las cookies de usuario:
  req.session = null;
  res.send({})
});


export {router as signoutRouter}