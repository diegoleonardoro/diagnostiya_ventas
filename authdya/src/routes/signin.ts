import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/usuario";

import { BadRequestError } from "@diagnostiya/commmon";

// import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/usuarios/signin",

  [
    body("email").isEmail().withMessage("Email tiene que ser valido"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Tiene que proveer una contrasena"),
  ],

  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const usuarioExistente = await User.findOne({ email });

    // Si el usuario no existe en la base de datos, "Credenciales invalidas"
    if (!usuarioExistente) {
      throw new BadRequestError("Credenciales invalidas");
    }

    const passwordsMatch = await Password.compare(
      usuarioExistente.password,
      password
    );

    // Si la contrasena enviada no concuerda con la contrasena en la base de datos:
    if (!passwordsMatch) {
      throw new BadRequestError("Credenciales invalidas");
    }

    // Si el usuario existe en la base de datos y las contrasenas concuerdan
    // Crear in Json Web Token
    const userJwt = jwt.sign(
      {
        id: usuarioExistente.id,
        email: usuarioExistente.email,
        nombre: usuarioExistente.nombre,
        role: usuarioExistente.role,
      },
      process.env.JWT_KEY!
    );

    // Guardar el Json Web Token en las cookies del usuario:
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(usuarioExistente);
  }
);

export { router as signinRouter };
