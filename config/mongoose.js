const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codebook');

const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connecting to db"));

db.once('open', function(){
    console.log('Successfully connected to DataBase :: CodeBook');
});

module.exports = db;