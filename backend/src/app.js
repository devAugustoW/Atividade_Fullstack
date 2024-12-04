import express from "express";
import mongoose from "mongoose";
import routes from "./routes.js";
import dotenv from "dotenv";

dotenv.config();

class App {
  constructor() {
    this.server = express();

    this.database();
    this.middleware();
    this.routes();
  }

  database() {
    mongoose
		.connect(process.env.API_KEY)
		.then(() => console.log("Conectado ao MongoDB"))
		.catch((err) => console.error("Erro ao conectar ao MongoDB:", err));
  }

  middleware() {
    this.server.use(express.json());
  }

  routes() {
    this.server.use(routes);
  }
}

export default new App().server;