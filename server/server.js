const express = require('express');
// const bodyParser = require('body-parser');
var socket = require('socket.io');
const app = express();
const port = 5000;
const router = express.Router();
app.use(express.json()); // Middleware pour parser les données JSON
app.use(express.urlencoded({ extended: true }));
// cors origine 
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*'); // Replace '*' with the allowed origin or use a variable to dynamically set it
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// Route Of app private
const userRoutes = require('../routes/userRoutes.js');
const reclamationRoutes = require('../routes/reclamationRoutes.js');
app.use('/users', userRoutes);
app.use('/reclamations', reclamationRoutes);

// public route 
const authRoutes = require('../routes/authRoutes.js');
app.use('/', authRoutes);

const server = app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});

var sio = socket(server)
sio.on('connection',(visitor)=>{
  console.log('we have a new visitor : ',visitor.id);
  visitor.on('message',(encodedData)=>{
    //logic d'insertion dans la base de donnee
    const data = JSON.parse(encodedData);
    // console.log(data.num_available_spots);
    sio.emit('newMessage',data);
  })
});
