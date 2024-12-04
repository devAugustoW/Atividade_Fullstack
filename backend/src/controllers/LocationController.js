import Location from "../models/LocationSchema.js";

class LocationController {
  async index(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      console.log(`[GET] Buscando locais - Página: ${page}, Limite: ${limit}`);
      
      const locations = await Location.find()
        .sort({ createdAt: -1 })
        .limit(limit * 1)
        .skip((page - 1) * limit);
      
      const total = await Location.countDocuments();
      console.log(`[GET] Total de locais encontrados: ${total}`);
      
      return res.status(200).json({
        locations,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      console.error('[GET] Erro ao buscar locais:', error);
      return res.status(500).json({ error: "Erro ao buscar locais" });
    }
  }

  async store(req, res) {
    try {
      const { title, description, photo, location } = req.body;
      console.log('[POST] Dados recebidos:', { title, description, photo, location });

      // Validação mais específica dos campos
      const validationErrors = [];
      
      if (!title?.trim()) validationErrors.push("Título é obrigatório");
      if (!description?.trim()) validationErrors.push("Descrição é obrigatória");
      if (!photo) validationErrors.push("Foto é obrigatória");
      if (!location?.latitude || !location?.longitude) {
        validationErrors.push("Latitude e longitude são obrigatórias");
      }

      if (validationErrors.length > 0) {
        console.log('[POST] Erros de validação:', validationErrors);
        return res.status(400).json({ errors: validationErrors });
      }

      const newLocation = await Location.create({
        title: title.trim(),
        description: description.trim(),
        photo,
        location: {
          latitude: location.latitude,
          longitude: location.longitude
        }
      });

      console.log('[POST] Local salvo com sucesso:', newLocation);
      return res.status(201).json(newLocation);
    } catch (error) {
      console.error('[POST] Erro ao salvar local:', error);
      return res.status(500).json({ error: "Erro ao salvar local" });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      console.log(`[GET:ID] Buscando local com ID: ${id}`);

      if (!id) {
        console.log('[GET:ID] ID não fornecido');
        return res.status(400).json({ error: "ID é obrigatório" });
      }

      const location = await Location.findById(id);
      
      if (!location) {
        console.log(`[GET:ID] Local não encontrado com ID: ${id}`);
        return res.status(404).json({ error: "Local não encontrado" });
      }
      
      console.log('[GET:ID] Local encontrado:', location);
      return res.status(200).json(location);
    } catch (error) {
      console.error('[GET:ID] Erro ao buscar local:', error);
      return res.status(500).json({ error: "Erro ao buscar local" });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      console.log(`[PUT] Atualizando local ID: ${id}`, updateData);

      const updatedLocation = await Location.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
      );

      if (!updatedLocation) {
        console.log(`[PUT] Local não encontrado com ID: ${id}`);
        return res.status(404).json({ error: "Local não encontrado" });
      }

      console.log('[PUT] Local atualizado com sucesso:', updatedLocation);
      return res.status(200).json(updatedLocation);
    } catch (error) {
      console.error('[PUT] Erro ao atualizar local:', error);
      return res.status(500).json({ error: "Erro ao atualizar local" });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      console.log(`[DELETE] Tentando deletar local ID: ${id}`);

      const location = await Location.findByIdAndDelete(id);

      if (!location) {
        console.log(`[DELETE] Local não encontrado com ID: ${id}`);
        return res.status(404).json({ error: "Local não encontrado" });
      }

      console.log('[DELETE] Local deletado com sucesso:', location);
      return res.status(200).json({ 
        message: "Local deletado com sucesso",
        deletedLocation: location 
      });
    } catch (error) {
      console.error('[DELETE] Erro ao deletar local:', error);
      return res.status(500).json({ error: "Erro ao deletar local" });
    }
  }
}

export default new LocationController();