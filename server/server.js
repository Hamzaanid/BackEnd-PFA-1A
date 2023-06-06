const express = require('express');
// const bodyParser = require('body-parser');
const app = express();
const port = 5000;
const router = express.Router();
app.use(express.json()); // Middleware pour parser les données JSON
app.use(express.urlencoded({ extended: true }));
// Route Of app private
const userRoutes = require('../routes/userRoutes.js');
const reclamationRoutes = require('../routes/reclamationRoutes.js');
app.use('/users', userRoutes);
app.use('/reclamations', reclamationRoutes);

// public route 
const authRoutes = require('../routes/authRoutes.js');
app.use('/', authRoutes);

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
