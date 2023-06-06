
const db = require('../models/index.js');
User = db.User;
async function createUser(req, res) {

    try {
      const { firstName,lastName,email,password,numero,role,dateDeNaissance } = req.body;
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        numero,
        role,
        dateDeNaissance,
      });
  
      res.status(201).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la création de l\'utilisateur.' });
    }
  }
  
  // Obtenir tous les utilisateurs
  async function getAllUsers(req, res) {
    try {
      const users = await User.findAll();
  
      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des utilisateurs.' });
    }
  }
  
  module.exports = { createUser, getAllUsers };
  