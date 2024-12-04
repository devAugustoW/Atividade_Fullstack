import { Router } from "express";
import LocationController from "./controllers/LocationController.js";

const routes = new Router();

// Testar API
routes.get("/", (req, res) => {
  return res.json({ message: "API Diário de Viagens funcionando!" });
});

// Rotas de Locations
routes.get("/locations", LocationController.index); // Listar todos os locais
routes.post("/locations", LocationController.store); // Criar novo local

// Novas rotas
routes.get("/locations/:id", LocationController.show); // Buscar um local específico
routes.put("/locations/:id", LocationController.update); // Atualizar um local
routes.delete("/locations/:id", LocationController.delete); // Deletar um local

export default routes;