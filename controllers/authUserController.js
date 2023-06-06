const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models/index.js');
User = db.User;

const authUserController = {
  async register(req, res) {
    try {
      const {firstName,lastName,email,password,numero,dateDeNaissance } = req.body;

      // Vérification si l'utilisateur existe déjà
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'Cet utilisateur existe déjà' });
      }

      // Hash du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Création de l'utilisateur dans la base de données
      const user = await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        numero,
        dateDeNaissance
      });

      return res.status(201).json({ message: 'Utilisateur créé avec succès' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription' });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Recherche de l'utilisateur dans la base de données
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }

      // Vérification du mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Nom d\'utilisateur ou mot de passe incorrect' });
      }

      // Génération du jeton d'authentification
      const token = jwt.sign({ id: user.id, role: user.role }, 'your-secret-key', { expiresIn: '720h' });
      const role = user.role;
      return res.status(200).json({ token,role });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Une erreur est survenue lors de la connexion' });
    }
  },
};

module.exports = authUserController;
