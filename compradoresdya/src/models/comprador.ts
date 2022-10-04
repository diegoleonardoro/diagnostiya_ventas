import mongoose from "mongoose";

const compradorSchema = new mongoose.Schema({
  asesor: { type: String, required: true },
  nombre: { type: String, required: true },
  telefono: { type: String, required: true },
  email: { type: String, required: true },
  direccion: { type: String, required: true },
  sectorEconomico: { type: String, required: true },
});

const Comprador = mongoose.model("Comprador", compradorSchema);

export { Comprador };
