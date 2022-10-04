const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const clientes = {};

app.get("/clientes", (req, res) => {
  console.log(clientes);
  res.send(clientes);
});

app.post("/clientes", (req, res) => {


  const id = randomBytes(4).toString("hex");

  console.log(clientes);

  const {
    nombre,
    direccion,
    telefono,
    sectorEconomico,
    email
  } = req.body.formVals;

  clientes[id] = {
    id,
    nombre,
    direccion,
    telefono,
    sectorEconomico,
    email
  };

  res.status(201).send(clientes[id]);

  
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
