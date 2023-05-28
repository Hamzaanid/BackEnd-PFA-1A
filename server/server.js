const express = require('express');
const bodyParser = require('body-parser');
const db = require('../models/index.js');
const app = express();
const port = 3000;
app.use(bodyParser);

let User = db.User;
const jane =  User.create({ firstName: "Jane", lastName: "Doe" });
console.log("Jane's auto-generated ID:", jane.id);
app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});
