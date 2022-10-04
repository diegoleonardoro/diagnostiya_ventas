import express, { Request, Response, NextFunction } from "express";
import { Comprador } from "../models/comprador";
import { Placa } from "../models/placa";

const router = express.Router();

router.post(
  "/compradores/save",
  async (req: Request, res: Response, next: NextFunction) => {
    const { asesor, nombre, direccion, telefono, email, sectorEconomico } =
      req.body;

    const comprador = await Comprador.create({
      asesor,
      nombre,
      direccion,
      telefono,
      email,
      sectorEconomico,
    });

    res.status(201).send({ comprador });
  }
);

router.get(
  "/compradores/getClientes/:asesor",
  async (req: Request, res: Response, next: NextFunction) => {
    const asesor = req.params.asesor;

    const compradores = await Comprador.find({ asesor });

    res.status(201).send({ compradores });
  }
);

// save the placas:
router.post("/compradores/savePlacas", async (req: Request, res: Response) => {
  // CREATE PLACA SCHEMA AND SAVE THE PLACA HERE
  console.log("jejeje");

  const placa = await Placa.create(req.body);

  res.status(201).send({ placa });
});

// get placas:
// router.get(
//   "/compradores/getplacas/:asesor",
//   async (req: Request, res: Response) => {
    
//     console.log('jajaja')
//     const asesor = req.params.asesor;
//     console.log(asesor);


//     res.status(201).send({});
//   }
// );

export { router as compradoresRouter };
