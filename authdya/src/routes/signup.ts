import express, { Request, Response, NextFunction } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { validationResult } from "express-validator";

import { BadRequestError, NotAuthorizedError } from "@diagnostiya/commmon";
// import { BadRequestError } from "../errors/bad-request-error";
// import { NotAuthorizedError } from "../errors/not-authorized-error";

import { User } from "../models/usuario";

const router = express.Router();

const usuarios = [
  {
    nombre: "Juan Ramirez",
    email: "juan@diagnostiya.com",
    area: "commercial",
  },

  {
    nombre: "Pedro Hernandez",
    email: "pedro@diagnostiya.com",
    area: "commercial",
  },

  {
    nombre: "Daniel Arias",
    email: "daniel@diagnostiya.com",
    area: "commercial",
  },

  {
    nombre: "Diana Gomez",
    email: "diana@diagnostiya.com",
    area: "caja",
  },

  {
    nombre: "Maria Rodriguez",
    email: "maria@diagnostiya.com",
    area: "caja",
  },

  {
    nombre: "Tatiana Martinez",
    email: "tatiana@diagnostiya.com",
    area: "caja",
  },

  {
    nombre: "Consuelo Reyes",
    email: "consuelo@diagnostiya.com",
    area: "caja",
  },
];

router.post(
  "/usuarios/signup",
  [
    body("email").isEmail().withMessage("Email tiene que ser valido"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Contrasena debe tener entre 4 y 20 caracteres"),
  ],
  async (req: Request, res: Response, next: NextFunction) => {


    const { email, password } = req.body;
    console.log(email, password);
    const errors = validationResult(req);

    // Error 'BadRequestError' si el correo o la contrasena no tienen formato requeridos
    if (!errors.isEmpty()) {
      throw new BadRequestError("Correo electronico o contrasena invalidos");
    }

    // Mirar si el correo electronico enviado pertence a una base de datos interna que incluye los empledos
    let usuarioExiste = false;
    let role;
    let nombre;
    for (var i = 0; i < usuarios.length; i++) {
      if (usuarios[i].email === email) {
        usuarioExiste = true;
        role = usuarios[i].area;
        nombre = usuarios[i].nombre;
        break;
      }
      if (i === usuarios.length - 1) {
        usuarioExiste = false;
      }
    }

    // Error 'NotAuthorizedError' si el correo electronico no esta dentro la base de datos
    if (!usuarioExiste) {
      throw new NotAuthorizedError();
    }

    // Si no hay errores ingresar usuario en la base de datos
    const user = await User.create({ nombre, email, password, role });

    // Crear JSON Web Token
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        role: user.role,
      },
      process.env.JWT_KEY!
    );

    // Anadir JSON Web Token a las Cookies del usuario:
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send({ user });
  }
);

export { router as signupRouter };
