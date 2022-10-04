import mongoose from "mongoose";

const placaSchema = new mongoose.Schema({
  cliente: { type: String, required: true },
  placa: { type: String, required: true },
  tipoVehiculo: { type: String, required: true },
  foto: { type: String },
});

const Placa = mongoose.model("Placa", placaSchema);
export { Placa };
