const db = require('../models/index.js');
const { Op } = require('sequelize');
Reclamation = db.Reclamation;
async function createReclamation(req, res) {
    try {
      const { title,detail } = req.body;
      const reclamation = await Reclamation.create({
        title,
        detail,
      });
  
      res.status(201).json({ reclamation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
    }
  }
  
  // Obtenir tous les utilisateurs
  async function getAllReclamations(req, res) {
    
    try {
      const reclamation = await Reclamation.findAll({
        where :{
          isTraited: false
        }
      });
  
      res.status(200).json({ reclamation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
  }

  async function traiterReclamation(req, res) {
    try {
      const { id } = req.params;
      const reclamation = await Reclamation.findByPk(id);
      if (!reclamation) {
        return res.status(404).json({ message: 'Réclamation introuvable.' });
      }
  
      // Modifier la valeur de la propriété isTraited
      reclamation.isTraited = true;
      await reclamation.save();
  
      res.status(200).json({ reclamation });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors du traitement de la réclamation.' });
    }
  }
  async function getReclamationsTraited(req, res) {
    try {
      // Calculer la date d'il y a une semaine
      const uneSemaineAvant = new Date();
      uneSemaineAvant.setDate(uneSemaineAvant.getDate() - 15);
  
      const reclamationsTraitees = await Reclamation.findAll({
        where: {
          isTraited: true,
          updatedAt: {
            [Op.gte]: uneSemaineAvant, // Filtrer les réclamations mises à jour dans la dernière semaine
          },
        },
      });
  
      res.status(200).json({ reclamationsTraitees });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des réclamations traitées.' });
    }
  }
  
  module.exports = { createReclamation, getAllReclamations,traiterReclamation,getReclamationsTraited };
  