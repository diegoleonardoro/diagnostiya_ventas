const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const placas_porId_cliente = {};

app.get("/clientes/:id/placas", (req, res) => {
  res.send(placas_porId_cliente[req.params.id] || []);
});

app.post("/clientes/:id/placas", (req, res) => {
  const placaId = randomBytes(4).toString("hex");
  const { placa, tipoVehiculo, fecha, hora, coordenadas, foto } = req.body;
  const placas = placas_porId_cliente[req.params.id] || [];

  placas.push({
    id: placaId,
    placa,
    tipoVehiculo,
    fecha,
    hora,
    coordenadas,
    foto
  });

  placas_porId_cliente[req.params.id] = placas;

  res.status(201).send(placas);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
